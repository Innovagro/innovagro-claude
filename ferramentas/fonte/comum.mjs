// Regras que toda ferramenta da casa cumpre sozinha (o guarda do Claudinn e a primeira trava;
// isto e a segunda): so grava dentro da pasta de trabalho ou do cerebro pessoal, e nunca
// sobrescreve arquivo que ja existe. Nenhuma ferramenta apaga nada.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PALETA = {
  marinho: "001C44",
  verde: "104C34",
  cinzaTexto: "4A5568",
  zebra: "F2F4F7",
  linha: "C9D1DC",
};

const ehWindows = process.platform === "win32";

function norm(p) {
  const r = path.resolve(p);
  return ehWindows ? r.toLowerCase() : r;
}

export function raizesPermitidas() {
  const perfil = os.homedir();
  const raizes = [path.join(perfil, "claude", "codespace"), path.join(perfil, "claude", "Meu-Cerebro")];
  if (process.env.OneDriveCommercial) raizes.push(path.join(process.env.OneDriveCommercial, "Meu-Cerebro"));
  return raizes;
}

export function dentroDaFronteira(alvo) {
  const a = norm(alvo);
  return raizesPermitidas().some((r) => {
    const rel = path.relative(norm(r), a);
    return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
  });
}

export function falhar(msg, codigo = 1) {
  process.stderr.write(msg + "\n");
  process.exit(codigo);
}

/** Confere o caminho de saida: absoluto, dentro da fronteira, arquivo novo. Cria a pasta-mae. */
export function saidaNova(saida, extensoes) {
  if (!saida) falhar("Falta o caminho do arquivo de saida (ultimo argumento).");
  if (!path.isAbsolute(saida)) falhar("O caminho de saida precisa ser completo (ex.: C:\\Users\\voce\\claude\\codespace\\Diretor\\arquivo" + extensoes[0] + ").");
  if (!extensoes.some((e) => saida.toLowerCase().endsWith(e))) falhar("O arquivo de saida precisa terminar em " + extensoes.join(" ou ") + ".");
  if (!dentroDaFronteira(saida)) falhar("So posso criar arquivo dentro da sua pasta de trabalho (claude\\codespace) ou do seu cerebro pessoal (Meu-Cerebro).", 2);
  if (fs.existsSync(saida)) falhar("Ja existe um arquivo com esse nome: " + path.basename(saida) + ". Nao vou por cima dele — escolha outro nome.", 3);
  fs.mkdirSync(path.dirname(saida), { recursive: true });
  return saida;
}

/** Como saidaNova, mas se o nome existir acrescenta -2, -3... (usado ao exportar leitura). */
export function saidaSemColisao(saida) {
  if (!dentroDaFronteira(saida)) falhar("So posso criar arquivo dentro da sua pasta de trabalho (claude\\codespace) ou do seu cerebro pessoal (Meu-Cerebro).", 2);
  fs.mkdirSync(path.dirname(saida), { recursive: true });
  if (!fs.existsSync(saida)) return saida;
  const ext = path.extname(saida);
  const base = saida.slice(0, -ext.length);
  for (let i = 2; i < 1000; i++) {
    const c = `${base}-${i}${ext}`;
    if (!fs.existsSync(c)) return c;
  }
  falhar("Nao achei um nome livre para " + path.basename(saida));
}

export function lerEntrada(arquivo, extensoes) {
  if (!arquivo) falhar("Falta o arquivo de entrada.");
  if (!fs.existsSync(arquivo)) falhar("Nao achei o arquivo: " + arquivo);
  if (extensoes && !extensoes.some((e) => arquivo.toLowerCase().endsWith(e))) falhar("O arquivo de entrada precisa terminar em " + extensoes.join(" ou ") + ".");
  return arquivo;
}

export function lerJson(arquivo) {
  lerEntrada(arquivo, [".json"]);
  let txt = fs.readFileSync(arquivo, "utf8");
  if (txt.charCodeAt(0) === 0xfeff) txt = txt.slice(1); // BOM que o PowerShell 5 poe
  try {
    return JSON.parse(txt);
  } catch (e) {
    falhar("O arquivo de especificacao nao e um JSON valido: " + e.message);
  }
}

/** Numero no jeito brasileiro ou internacional: "1.234,56", "1234.56", "R$ 1.234,56", "12%". */
export function paraNumero(v) {
  if (typeof v === "number") return v;
  if (v === null || v === undefined) return null;
  let s = String(v).trim();
  if (s === "") return null;
  let pct = false;
  if (s.endsWith("%")) { pct = true; s = s.slice(0, -1); }
  s = s.replace(/^R\$\s*/i, "").replace(/\s/g, "");
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s) || /^-?\d+,\d+$/.test(s)) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, "");
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return pct ? n / 100 : n;
}

/** "2026-09-13", "13/09/2026" -> Date ao meio-dia UTC (sem pular dia por fuso). */
export function paraData(v) {
  if (v instanceof Date) return v;
  if (v === null || v === undefined || v === "") return null;
  const s = String(v).trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12));
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1], 12));
  return null;
}

/** CSV simples (RFC 4180), separador ; ou , detectado pela primeira linha. */
export function lerCsv(arquivo) {
  let txt = fs.readFileSync(arquivo, "utf8");
  if (txt.charCodeAt(0) === 0xfeff) txt = txt.slice(1);
  const primeira = txt.split(/\r?\n/, 1)[0] || "";
  const sep = (primeira.match(/;/g) || []).length >= (primeira.match(/,/g) || []).length ? ";" : ",";
  const linhas = [];
  let campo = "", linha = [], aspas = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (aspas) {
      if (c === '"') { if (txt[i + 1] === '"') { campo += '"'; i++; } else aspas = false; }
      else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === sep) { linha.push(campo); campo = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && txt[i + 1] === "\n") i++;
      linha.push(campo); campo = "";
      if (linha.length > 1 || linha[0] !== "") linhas.push(linha);
      linha = [];
    } else campo += c;
  }
  if (campo !== "" || linha.length) { linha.push(campo); linhas.push(linha); }
  return linhas;
}

export function assetsDir() {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), "assets");
}
