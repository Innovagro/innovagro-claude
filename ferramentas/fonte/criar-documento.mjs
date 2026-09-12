// criar-documento.mjs <spec.json> <saida.docx>
// Documento Word no padrao Innovagro: logo no cabecalho, paleta marinho/verde, pagina X de Y.
// Spec:
// { "titulo": "Ata — Reuniao semanal", "subtitulo": "13/09/2026",
//   "blocos": [
//     {"tipo":"campos", "itens":[["Data","13/09/2026"],["Presentes","..."]]},
//     {"tipo":"secao", "texto":"Decisoes tomadas"},        {"tipo":"subsecao", "texto":"..."},
//     {"tipo":"paragrafo", "texto":"Texto com **negrito**."},
//     {"tipo":"lista", "itens":["...","..."]},            {"tipo":"lista-numerada", "itens":["..."]},
//     {"tipo":"tabela", "colunas":["O que","Responsavel","Prazo"], "linhas":[["...","...","..."]]},
//     {"tipo":"destaque", "texto":"..."},                   {"tipo":"quebra"} ],
//   "rodape": "texto do rodape (opcional)" }
import fs from "node:fs";
import path from "node:path";
import {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType,
  AlignmentType, Header, Footer, PageNumber, BorderStyle, ShadingType, LevelFormat, PageBreak, TableLayoutType,
} from "docx";
import { PALETA, falhar, lerJson, saidaNova, assetsDir } from "./comum.mjs";

const [specArq, saidaArq] = process.argv.slice(2);
const spec = lerJson(specArq);
const saida = saidaNova(saidaArq, [".docx"]);
if (!Array.isArray(spec.blocos)) falhar('A especificacao precisa de "blocos": [ ... ].');

const FONTE = "Calibri";
// A4 (11906 twips) menos as margens esquerda/direita (1100 + 1100): largura util da pagina.
const LARGURA = 11906 - 2200;
const txt = (v) => (v === null || v === undefined ? "" : String(v));

/** "texto com **negrito**" -> runs */
function runs(texto, base = {}) {
  const partes = txt(texto).split(/(\*\*[^*]+\*\*)/g).filter((p) => p !== "");
  return partes.map((p) => p.startsWith("**") && p.endsWith("**")
    ? new TextRun({ text: p.slice(2, -2), bold: true, font: FONTE, ...base })
    : new TextRun({ text: p, font: FONTE, ...base }));
}

const semBorda = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const bordaFina = { style: BorderStyle.SINGLE, size: 4, color: PALETA.linha };

function tabela(colunas, linhas) {
  const n = colunas.length;
  const larg = Array.from({ length: n }, (_, j) => (j < n - 1 ? Math.floor(LARGURA / n) : LARGURA - Math.floor(LARGURA / n) * (n - 1)));
  const cab = new TableRow({
    tableHeader: true,
    children: colunas.map((c, j) => new TableCell({
      width: { size: larg[j], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: "auto", fill: PALETA.marinho },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ children: runs(c, { bold: true, color: "FFFFFF", size: 20 }) })],
    })),
  });
  const corpo = linhas.map((ln, i) => new TableRow({
    children: Array.from({ length: n }, (_, j) => new TableCell({
      width: { size: larg[j], type: WidthType.DXA },
      shading: i % 2 === 1 ? { type: ShadingType.CLEAR, color: "auto", fill: PALETA.zebra } : undefined,
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ children: runs(Array.isArray(ln) ? ln[j] : "", { size: 20 }) })],
    })),
  }));
  return new Table({
    width: { size: LARGURA, type: WidthType.DXA },
    columnWidths: larg,
    layout: TableLayoutType.FIXED,
    borders: { top: bordaFina, bottom: bordaFina, left: bordaFina, right: bordaFina, insideHorizontal: bordaFina, insideVertical: bordaFina },
    rows: [cab, ...corpo],
  });
}

function campos(itens) {
  const larg = [Math.round(LARGURA * 0.24), LARGURA - Math.round(LARGURA * 0.24)];
  return new Table({
    width: { size: LARGURA, type: WidthType.DXA },
    columnWidths: larg,
    layout: TableLayoutType.FIXED,
    borders: { top: semBorda, bottom: semBorda, left: semBorda, right: semBorda, insideHorizontal: semBorda, insideVertical: semBorda },
    rows: itens.map(([rotulo, valor]) => new TableRow({
      children: [
        new TableCell({ width: { size: larg[0], type: WidthType.DXA }, margins: { top: 40, bottom: 40 }, children: [new Paragraph({ children: runs(rotulo, { bold: true, color: PALETA.marinho }) })] }),
        new TableCell({ width: { size: larg[1], type: WidthType.DXA }, margins: { top: 40, bottom: 40 }, children: [new Paragraph({ children: runs(valor) })] }),
      ],
    })),
  });
}

const filhos = [];
if (spec.titulo) filhos.push(new Paragraph({ spacing: { after: 60 }, children: runs(spec.titulo, { bold: true, size: 40, color: PALETA.marinho }) }));
if (spec.subtitulo) filhos.push(new Paragraph({ spacing: { after: 240 }, children: runs(spec.subtitulo, { size: 22, color: PALETA.cinzaTexto }) }));

for (const b of spec.blocos) {
  switch (b.tipo) {
    case "secao":
      filhos.push(new Paragraph({
        spacing: { before: 320, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: PALETA.verde, space: 2 } },
        children: runs(b.texto, { bold: true, size: 28, color: PALETA.marinho }),
      }));
      break;
    case "subsecao":
      filhos.push(new Paragraph({ spacing: { before: 200, after: 80 }, children: runs(b.texto, { bold: true, size: 24, color: PALETA.verde }) }));
      break;
    case "paragrafo":
      filhos.push(new Paragraph({ spacing: { after: 120 }, children: runs(b.texto) }));
      break;
    case "lista":
      for (const it of b.itens || []) filhos.push(new Paragraph({ bullet: { level: 0 }, spacing: { after: 60 }, children: runs(it) }));
      break;
    case "lista-numerada":
      for (const it of b.itens || []) filhos.push(new Paragraph({ numbering: { reference: "numeros", level: 0 }, spacing: { after: 60 }, children: runs(it) }));
      break;
    case "tabela":
      if (!Array.isArray(b.colunas) || b.colunas.length === 0) falhar('Bloco "tabela" precisa de "colunas".');
      filhos.push(tabela(b.colunas, b.linhas || []));
      filhos.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
      break;
    case "campos":
      filhos.push(campos(b.itens || []));
      filhos.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
      break;
    case "destaque":
      filhos.push(new Paragraph({
        spacing: { before: 120, after: 120 },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: "E8EFEB" },
        border: { left: { style: BorderStyle.SINGLE, size: 24, color: PALETA.verde, space: 8 } },
        children: runs(b.texto),
      }));
      break;
    case "quebra":
      filhos.push(new Paragraph({ children: [new PageBreak()] }));
      break;
    default:
      falhar(`Tipo de bloco desconhecido: "${b.tipo}". Use: campos, secao, subsecao, paragrafo, lista, lista-numerada, tabela, destaque, quebra.`);
  }
}

const logoArq = path.join(assetsDir(), "innovagro-logo.png");
const cabecalho = fs.existsSync(logoArq)
  ? [
      new Paragraph({ spacing: { after: 60 }, children: [new ImageRun({ type: "png", data: fs.readFileSync(logoArq), transformation: { width: 160, height: 32 } })] }),
      new Paragraph({ spacing: { after: 0 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: PALETA.verde, space: 1 } }, children: [] }),
    ]
  : [];

const doc = new Document({
  creator: "Claudinn",
  title: txt(spec.titulo),
  styles: { default: { document: { run: { font: FONTE, size: 22, color: "1A202C" } } } },
  numbering: { config: [{ reference: "numeros", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1900, bottom: 1100, left: 1100, right: 1100, header: 600 } } },
    headers: { default: new Header({ children: cabecalho }) },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: (spec.rodape ? txt(spec.rodape) + "   ·   " : ""), font: FONTE, size: 16, color: PALETA.cinzaTexto }),
            new TextRun({ children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES], font: FONTE, size: 16, color: PALETA.cinzaTexto }),
          ],
        })],
      }),
    },
    children: filhos,
  }],
});

fs.writeFileSync(saida, await Packer.toBuffer(doc));
process.stdout.write(JSON.stringify({ ok: true, arquivo: saida, blocos: spec.blocos.length }) + "\n");
