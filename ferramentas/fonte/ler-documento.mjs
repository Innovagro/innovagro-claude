// ler-documento.mjs <entrada.docx>
// Texto de um documento Word, sem abrir o Word e sem alterar o arquivo. Sai no stdout.
import mammoth from "mammoth";
import { falhar, lerEntrada } from "./comum.mjs";

const [entrada] = process.argv.slice(2);
if (entrada && entrada.toLowerCase().endsWith(".doc")) falhar("Esse e o formato antigo do Word (.doc). Peca para abrir no Word e Salvar como .docx, ou como PDF.");
lerEntrada(entrada, [".docx"]);
try {
  const { value } = await mammoth.extractRawText({ path: entrada });
  process.stdout.write(value.replace(/\n{3,}/g, "\n\n").trim() + "\n");
} catch (e) {
  falhar("Nao consegui ler o documento (pode estar protegido por senha ou corrompido): " + e.message);
}
