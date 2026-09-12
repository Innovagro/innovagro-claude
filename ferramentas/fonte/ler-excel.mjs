// ler-excel.mjs <entrada.xlsx> <pasta-de-saida>
// Le a planilha SEM alterar o original: exporta cada aba para CSV (UTF-8, separador ;) na pasta de
// saida e imprime um resumo em JSON — com as armadilhas que fazem o total nao bater
// (linhas ocultas/filtradas, numero guardado como texto, formula sem resultado).
import fs from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";
import { falhar, lerEntrada, saidaSemColisao, dentroDaFronteira, paraNumero } from "./comum.mjs";

const [entrada, pastaSaida] = process.argv.slice(2);
lerEntrada(entrada, [".xlsx", ".xlsm"]);
if (!pastaSaida || !path.isAbsolute(pastaSaida)) falhar("Falta a pasta de saida (caminho completo) — e onde os CSV de cada aba vao ficar.");
if (!dentroDaFronteira(path.join(pastaSaida, "x.csv"))) falhar("A pasta de saida precisa estar dentro da sua pasta de trabalho (claude\\codespace) ou do Meu-Cerebro.", 2);

const wb = new ExcelJS.Workbook();
try {
  await wb.xlsx.readFile(entrada);
} catch (e) {
  falhar("Nao consegui abrir a planilha (pode estar protegida por senha ou corrompida): " + e.message);
}

const fmtData = (d) => `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`;
function valor(cel) {
  let v = cel.value;
  if (v && typeof v === "object") {
    if (v instanceof Date) return { txt: fmtData(v), bruto: v };
    if ("formula" in v || "sharedFormula" in v || "result" in v) {          // formula
      const r = v.result;
      if (r === undefined || r === null) return { txt: "=" + (v.formula || v.sharedFormula || ""), bruto: null };
      v = typeof r === "object" && r.error ? "#ERRO" : r;
    }
    else if (v.richText) v = v.richText.map((r) => r.text).join("");
    else if ("text" in v) v = v.text;                                          // hyperlink
    else if (v.error) v = v.error;
    if (v instanceof Date) return { txt: fmtData(v), bruto: v };
  }
  if (typeof v === "number") return { txt: String(v).replace(".", ","), bruto: v };
  return { txt: v === null || v === undefined ? "" : String(v), bruto: v };
}
const csvCampo = (s) => (/[;"\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s);

const base = path.basename(entrada).replace(/\.[^.]+$/, "");
const resumo = { arquivo: entrada, abas: [] };

wb.eachSheet((ws) => {
  const linhasCsv = [];
  let ocultas = 0, textoNumerico = 0, formulasSemValor = 0, maxCol = 0;
  ws.eachRow({ includeEmpty: false }, (row) => {
    if (row.hidden) ocultas++;
    const cels = [];
    row.eachCell({ includeEmpty: true }, (cel, col) => {
      const { txt, bruto } = valor(cel);
      if (typeof bruto === "string" && bruto.trim() !== "" && paraNumero(bruto) !== null && /\d/.test(bruto)) textoNumerico++;
      if (cel.value && typeof cel.value === "object" && "formula" in cel.value && (cel.value.result === undefined || cel.value.result === null)) formulasSemValor++;
      cels[col - 1] = txt;
      maxCol = Math.max(maxCol, col);
    });
    linhasCsv.push(cels);
  });
  const nomeSeguro = ws.name.replace(/[\\/:*?"<>|\s]+/g, "-");
  const csv = saidaSemColisao(path.join(pastaSaida, `${base}-${nomeSeguro}.csv`));
  const texto = linhasCsv.map((l) => Array.from({ length: maxCol }, (_, i) => csvCampo(l[i] ?? "")).join(";")).join("\r\n");
  fs.writeFileSync(csv, "\uFEFF" + texto, "utf8");
  resumo.abas.push({
    nome: ws.name,
    oculta: ws.state !== "visible",
    linhas: linhasCsv.length,
    colunas: maxCol,
    cabecalho: (linhasCsv[0] || []).slice(0, maxCol),
    filtro_ativo: Boolean(ws.autoFilter),
    linhas_ocultas: ocultas,
    celulas_numero_como_texto: textoNumerico,
    formulas_sem_resultado_salvo: formulasSemValor,
    csv,
  });
});

process.stdout.write(JSON.stringify(resumo, null, 1) + "\n");
