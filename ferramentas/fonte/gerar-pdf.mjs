// gerar-pdf.mjs <entrada.html> <saida.pdf>
// Imprime HTML em PDF com o Microsoft Edge que ja vem no Windows (modo invisivel, sem internet).
// - HTML completo (<html>...): so troca {{LOGO}} pelo logo embutido.
// - Trecho de HTML (sem <html>): embrulha no layout Innovagro (logo, cores, tabelas, rodape).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { PALETA, falhar, lerEntrada, saidaNova, assetsDir } from "./comum.mjs";

const [entrada, saidaArq] = process.argv.slice(2);
lerEntrada(entrada, [".html", ".htm"]);
const saida = saidaNova(saidaArq, [".pdf"]);

function acharNavegador() {
  const c = [];
  if (process.platform === "win32") {
    for (const base of [process.env["ProgramFiles(x86)"], process.env.ProgramFiles, process.env.LOCALAPPDATA])
      if (base) c.push(path.join(base, "Microsoft", "Edge", "Application", "msedge.exe"));
  } else {
    c.push("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/microsoft-edge", "/usr/bin/google-chrome");
  }
  return c.find((p) => fs.existsSync(p));
}
const navegador = acharNavegador();
if (!navegador) falhar("Nao achei o Microsoft Edge neste computador. Peca ajuda ao seu assessor.");

const logoArq = path.join(assetsDir(), "innovagro-logo.png");
const logo = fs.existsSync(logoArq) ? "data:image/png;base64," + fs.readFileSync(logoArq).toString("base64") : "";

let html = fs.readFileSync(entrada, "utf8");
if (!/<html[\s>]/i.test(html)) {
  const titulo = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, "Relatório"])[1].replace(/<[^>]+>/g, "");
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

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "claudinn-pdf-"));
const tmpHtml = path.join(tmp, "relatorio.html");
fs.writeFileSync(tmpHtml, html, "utf8");
// O Edge (e o Chrome) as vezes termina o PDF e continua vivo em segundo plano. Nao esperamos ele
// sair: quando o PDF para de crescer, fechamos o navegador que NOS abrimos (perfil temporario proprio).
const filho = spawn(navegador, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--disable-extensions",
  "--user-data-dir=" + path.join(tmp, "perfil"), "--no-pdf-header-footer", "--print-to-pdf-no-header",
  "--print-to-pdf=" + saida, pathToFileURL(tmpHtml).href,
], { stdio: "ignore", detached: process.platform !== "win32" });
let saiu = false, erro = null;
filho.on("exit", () => { saiu = true; });
filho.on("error", (e) => { erro = e; saiu = true; });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let tamanho = -1, estavel = 0;
for (let t = 0; t < 90000 && !(saiu && fs.existsSync(saida)); t += 250) {
  await espera(250);
  if (erro) break;
  if (fs.existsSync(saida)) {
    const s = fs.statSync(saida).size;
    estavel = s > 0 && s === tamanho ? estavel + 1 : 0;
    tamanho = s;
    if (estavel >= 4) break; // 1 segundo sem crescer = pronto
  }
}
// Fecha a ARVORE do navegador que esta ferramenta abriu (so ela: pelo PID do filho).
function fecharNavegador() {
  if (saiu || !filho.pid) return;
  try {
    if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(filho.pid), "/T", "/F"], { stdio: "ignore" });
    else process.kill(-filho.pid, "SIGKILL");
  } catch { try { filho.kill("SIGKILL"); } catch { /* ja saiu */ } }
}
fecharNavegador();
filho.unref();
await espera(300);
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch { /* pasta temporaria da propria ferramenta */ }

if (!fs.existsSync(saida) || fs.statSync(saida).size === 0) falhar("O Edge nao gerou o PDF" + (erro ? " (" + erro.message + ")" : "") + ". Tente de novo; se repetir, peca ajuda.");
process.stdout.write(JSON.stringify({ ok: true, arquivo: saida }) + "\n");
process.exit(0);
