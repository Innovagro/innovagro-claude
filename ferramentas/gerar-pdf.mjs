import { createRequire as __cr } from 'module'; const require = __cr(import.meta.url);

// src/gerar-pdf.mjs
import fs2 from "node:fs";
import os2 from "node:os";
import path2 from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// src/comum.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
var PALETA = {
  marinho: "001C44",
  verde: "104C34",
  cinzaTexto: "4A5568",
  zebra: "F2F4F7",
  linha: "C9D1DC"
};
var ehWindows = process.platform === "win32";
function norm(p) {
  const r = path.resolve(p);
  return ehWindows ? r.toLowerCase() : r;
}
function raizesPermitidas() {
  const perfil = os.homedir();
  const raizes = [path.join(perfil, "claude", "codespace"), path.join(perfil, "claude", "Meu-Cerebro")];
  if (process.env.OneDriveCommercial) raizes.push(path.join(process.env.OneDriveCommercial, "Meu-Cerebro"));
  return raizes;
}
function dentroDaFronteira(alvo) {
  const a = norm(alvo);
  return raizesPermitidas().some((r) => {
    const rel = path.relative(norm(r), a);
    return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
  });
}
function falhar(msg, codigo = 1) {
  process.stderr.write(msg + "\n");
  process.exit(codigo);
}
function saidaNova(saida2, extensoes) {
  if (!saida2) falhar("Falta o caminho do arquivo de saida (ultimo argumento).");
  if (!path.isAbsolute(saida2)) falhar("O caminho de saida precisa ser completo (ex.: C:\\Users\\voce\\claude\\codespace\\Diretor\\arquivo" + extensoes[0] + ").");
  if (!extensoes.some((e) => saida2.toLowerCase().endsWith(e))) falhar("O arquivo de saida precisa terminar em " + extensoes.join(" ou ") + ".");
  if (!dentroDaFronteira(saida2)) falhar("So posso criar arquivo dentro da sua pasta de trabalho (claude\\codespace) ou do seu cerebro pessoal (Meu-Cerebro).", 2);
  if (fs.existsSync(saida2)) falhar("Ja existe um arquivo com esse nome: " + path.basename(saida2) + ". Nao vou por cima dele \u2014 escolha outro nome.", 3);
  fs.mkdirSync(path.dirname(saida2), { recursive: true });
  return saida2;
}
function lerEntrada(arquivo, extensoes) {
  if (!arquivo) falhar("Falta o arquivo de entrada.");
  if (!fs.existsSync(arquivo)) falhar("Nao achei o arquivo: " + arquivo);
  if (extensoes && !extensoes.some((e) => arquivo.toLowerCase().endsWith(e))) falhar("O arquivo de entrada precisa terminar em " + extensoes.join(" ou ") + ".");
  return arquivo;
}
function assetsDir() {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), "assets");
}

// src/gerar-pdf.mjs
var [entrada, saidaArq] = process.argv.slice(2);
lerEntrada(entrada, [".html", ".htm"]);
var saida = saidaNova(saidaArq, [".pdf"]);
function acharNavegador() {
  const c = [];
  if (process.platform === "win32") {
    for (const base of [process.env["ProgramFiles(x86)"], process.env.ProgramFiles, process.env.LOCALAPPDATA])
      if (base) c.push(path2.join(base, "Microsoft", "Edge", "Application", "msedge.exe"));
  } else {
    c.push("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/microsoft-edge", "/usr/bin/google-chrome");
  }
  return c.find((p) => fs2.existsSync(p));
}
var navegador = acharNavegador();
if (!navegador) falhar("Nao achei o Microsoft Edge neste computador. Peca ajuda ao seu assessor.");
var logoArq = path2.join(assetsDir(), "innovagro-logo.png");
var logo = fs2.existsSync(logoArq) ? "data:image/png;base64," + fs2.readFileSync(logoArq).toString("base64") : "";
var html = fs2.readFileSync(entrada, "utf8");
if (!/<html[\s>]/i.test(html)) {
  const titulo = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, "Relat\xF3rio"])[1].replace(/<[^>]+>/g, "");
  html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${titulo}</title><style>
  @page { size: A4; margin: 18mm 16mm 18mm 16mm; }
  body { font-family: Calibri, "Segoe UI", Arial, sans-serif; font-size: 11pt; color: #1A202C; line-height: 1.45; }
  header { border-bottom: 2px solid #${PALETA.verde}; padding-bottom: 8px; margin-bottom: 18px; }
  header img { height: 30px; }
  h1 { color: #${PALETA.marinho}; font-size: 20pt; margin: 0 0 4px; }
  h2 { color: #${PALETA.marinho}; font-size: 14pt; border-bottom: 1.5px solid #${PALETA.verde}; padding-bottom: 3px; margin: 22px 0 8px; }
  h3 { color: #${PALETA.verde}; font-size: 12pt; margin: 16px 0 6px; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; font-size: 10pt; page-break-inside: auto; }
  th { background: #${PALETA.marinho}; color: #fff; text-align: left; padding: 6px 8px; }
  td { border-bottom: 1px solid #${PALETA.linha}; padding: 5px 8px; vertical-align: top; }
  tr:nth-child(even) td { background: #${PALETA.zebra}; }
  .destaque { border-left: 4px solid #${PALETA.verde}; background: #E8EFEB; padding: 8px 12px; margin: 10px 0; }
  .sub { color: #${PALETA.cinzaTexto}; margin-top: 0; }
  </style></head><body><header>${logo ? `<img src="${logo}" alt="Innovagro">` : ""}</header>${html}</body></html>`;
} else {
  html = html.replace(/\{\{LOGO\}\}/g, logo);
}
var tmp = fs2.mkdtempSync(path2.join(os2.tmpdir(), "claudinn-pdf-"));
var tmpHtml = path2.join(tmp, "relatorio.html");
fs2.writeFileSync(tmpHtml, html, "utf8");
var filho = spawn(navegador, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-extensions",
  "--user-data-dir=" + path2.join(tmp, "perfil"),
  "--no-pdf-header-footer",
  "--print-to-pdf-no-header",
  "--print-to-pdf=" + saida,
  pathToFileURL(tmpHtml).href
], { stdio: "ignore", detached: process.platform !== "win32" });
var saiu = false;
var erro = null;
filho.on("exit", () => {
  saiu = true;
});
filho.on("error", (e) => {
  erro = e;
  saiu = true;
});
var espera = (ms) => new Promise((r) => setTimeout(r, ms));
var tamanho = -1;
var estavel = 0;
for (let t = 0; t < 9e4 && !(saiu && fs2.existsSync(saida)); t += 250) {
  await espera(250);
  if (erro) break;
  if (fs2.existsSync(saida)) {
    const s = fs2.statSync(saida).size;
    estavel = s > 0 && s === tamanho ? estavel + 1 : 0;
    tamanho = s;
    if (estavel >= 4) break;
  }
}
function fecharNavegador() {
  if (saiu || !filho.pid) return;
  try {
    if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(filho.pid), "/T", "/F"], { stdio: "ignore" });
    else process.kill(-filho.pid, "SIGKILL");
  } catch {
    try {
      filho.kill("SIGKILL");
    } catch {
    }
  }
}
fecharNavegador();
filho.unref();
await espera(300);
try {
  fs2.rmSync(tmp, { recursive: true, force: true });
} catch {
}
if (!fs2.existsSync(saida) || fs2.statSync(saida).size === 0) falhar("O Edge nao gerou o PDF" + (erro ? " (" + erro.message + ")" : "") + ". Tente de novo; se repetir, peca ajuda.");
process.stdout.write(JSON.stringify({ ok: true, arquivo: saida }) + "\n");
process.exit(0);
