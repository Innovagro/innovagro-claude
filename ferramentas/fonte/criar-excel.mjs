// criar-excel.mjs <spec.json> <saida.xlsx>
// Planilha .xlsx de verdade, formatada no padrao Innovagro. Spec:
// { "abas": [ { "nome": "Vendas",
//               "colunas": [ {"titulo":"Cliente","tipo":"texto"}, {"titulo":"Valor","tipo":"moeda"} ],
//               "linhas": [ ["Cliente A", 1234.5] ]      <- ou "csv": "C:\\...\\dados.csv" (com cabecalho)
//               "total": true } ] }
// tipos: texto | numero | moeda | data | porcentagem   (numero aceita "casas": 0..4)
import ExcelJS from "exceljs";
import { PALETA, falhar, lerJson, saidaNova, paraNumero, paraData, lerCsv, lerEntrada } from "./comum.mjs";

const [specArq, saidaArq] = process.argv.slice(2);
const spec = lerJson(specArq);
const saida = saidaNova(saidaArq, [".xlsx"]);

if (!Array.isArray(spec.abas) || spec.abas.length === 0) falhar('A especificacao precisa de "abas": [ ... ] com pelo menos uma aba.');

const FORMATOS = {
  moeda: '"R$" #,##0.00;[Red]-"R$" #,##0.00',
  data: "dd/mm/yyyy",
  porcentagem: "0.0%",
};
const formatoNumero = (casas) => (casas > 0 ? "#,##0." + "0".repeat(casas) : "#,##0");
/** CSV sem "colunas": adivinha o tipo pelos valores (todos os preenchidos precisam concordar). */
function tipoDaColuna(valores) {
  const cheios = valores.filter((v) => v !== undefined && v !== null && String(v).trim() !== "");
  if (cheios.length === 0) return "texto";
  if (cheios.every((v) => paraData(v))) return "data";
  if (cheios.every((v) => paraNumero(v) !== null)) return cheios.some((v) => /R\$/i.test(String(v))) ? "moeda" : "numero";
  return "texto";
}
const letra = (n) => { let s = ""; for (n++; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s; return s; };

const wb = new ExcelJS.Workbook();
wb.creator = "Claudinn";
wb.created = new Date();
const nomesUsados = new Set();

for (const aba of spec.abas) {
  let nome = String(aba.nome || "Planilha").replace(/[\\/?*[\]:]/g, "-").slice(0, 31) || "Planilha";
  for (let i = 2; nomesUsados.has(nome.toLowerCase()); i++) nome = nome.slice(0, 28) + "-" + i;
  nomesUsados.add(nome.toLowerCase());

  let linhas = aba.linhas;
  let colunas = aba.colunas;
  if (aba.csv) {
    const dados = lerCsv(lerEntrada(aba.csv, [".csv", ".txt"]));
    const cab = dados.shift() || [];
    linhas = dados;
    if (!colunas) colunas = cab.map((t, j) => ({ titulo: t, tipo: tipoDaColuna(linhas.map((l) => l[j])) }));
  }
  if (!Array.isArray(colunas) || colunas.length === 0) falhar(`A aba "${nome}" precisa de "colunas".`);
  if (!Array.isArray(linhas)) linhas = [];
  colunas = colunas.map((c) => (typeof c === "string" ? { titulo: c, tipo: "texto" } : c));

  const ws = wb.addWorksheet(nome, { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = colunas.map((c) => ({ header: c.titulo, key: c.titulo }));

  const cab = ws.getRow(1);
  cab.height = 22;
  cab.eachCell((cel) => {
    cel.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cel.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + PALETA.marinho } };
    cel.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  });

  const larg = colunas.map((c) => String(c.titulo).length);
  linhas.forEach((ln, i) => {
    const valores = colunas.map((c, j) => {
      const v = Array.isArray(ln) ? ln[j] : ln[c.titulo];
      if (c.tipo === "numero" || c.tipo === "moeda" || c.tipo === "porcentagem") { const n = paraNumero(v); return n === null ? (v ?? null) : n; }
      if (c.tipo === "data") return paraData(v) ?? (v ?? null);
      return v ?? null;
    });
    const row = ws.addRow(valores);
    valores.forEach((v, j) => { larg[j] = Math.max(larg[j], String(v ?? "").length); });
    if (i % 2 === 1) row.eachCell({ includeEmpty: true }, (cel) => { cel.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + PALETA.zebra } }; });
  });

  colunas.forEach((c, j) => {
    const col = ws.getColumn(j + 1);
    if (c.tipo === "numero") col.numFmt = formatoNumero(Number.isInteger(c.casas) ? c.casas : 2);
    else if (FORMATOS[c.tipo]) col.numFmt = FORMATOS[c.tipo];
    col.width = Math.min(Math.max(larg[j] + 3, 10), 50);
  });

  const n = linhas.length;
  if (n > 0) ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: n + 1, column: colunas.length } };

  if (aba.total && n > 0) {
    const tot = ws.addRow(colunas.map((c, j) => {
      if (j === 0) return "TOTAL";
      if (c.tipo === "numero" || c.tipo === "moeda") {
        const soma = linhas.reduce((acc, ln) => { const v = paraNumero(Array.isArray(ln) ? ln[j] : ln[c.titulo]); return acc + (v ?? 0); }, 0);
        return { formula: `SUM(${letra(j)}2:${letra(j)}${n + 1})`, result: Math.round(soma * 1e6) / 1e6 };
      }
      return null;
    }));
    tot.eachCell({ includeEmpty: true }, (cel) => {
      cel.font = { bold: true, color: { argb: "FF" + PALETA.verde } };
      cel.border = { top: { style: "medium", color: { argb: "FF" + PALETA.verde } } };
    });
  }
}

await wb.xlsx.writeFile(saida);
process.stdout.write(JSON.stringify({ ok: true, arquivo: saida, abas: spec.abas.length }) + "\n");
