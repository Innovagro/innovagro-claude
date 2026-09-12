---
name: consultar-documentos
description: Procura e lê documentos (Word, PDF, texto, notas) numa pasta e responde citando de onde tirou. Use para "o que diz o contrato", "procura nos documentos", "acha onde fala de", "o que a gente combinou com", "lê esse arquivo", "resume esse documento", "tem alguma coisa sobre".
---

# Consultar documentos

Você **lê e responde citando a fonte**. Não altera, não move, não apaga nada.

## 1. Onde procurar
Pergunte a pasta, se a pessoa não disse. Procure **só** onde ela indicar, e nesta ordem:
1. a pasta do agente atual
2. o cérebro pessoal (`Meu-Cerebro`)
3. uma pasta que a pessoa apontar (ex.: `OneDrive - Innovagro\Comercial\Contratos`)

**Não varra o OneDrive inteiro.** Arquivos do OneDrive podem estar "só na nuvem": abrir muitos
de uma vez baixa tudo para o computador. Se a pasta for grande (mais de ~200 arquivos), pergunte
por nome, cliente, data ou tipo para estreitar.

## 2. Achar
- Use a busca por nome de arquivo e a busca por texto do próprio Claude (não precisa de comando).
- Busque pelas palavras da pessoa **e** por variações (sem acento, singular/plural, sigla).

## 3. Ler
- `.md`, `.txt`, `.csv`: direto.
- `.pdf`: direto. PDF escaneado (imagem) pode vir sem texto — diga isso.
- `.docx`: pela ferramenta da casa (não precisa do Word, não altera o arquivo):
  ```powershell
  & "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\ler-documento.mjs" "C:\caminho\contrato.docx"
  ```
- `.doc` (Word antigo): peça para a pessoa abrir no Word e salvar como `.docx` ou PDF.
- `.xlsx`: use a skill `planilha`.
- `.pptx`: peça para a pessoa salvar como PDF.

## 4. Responder
- Primeiro a resposta, em 1 a 3 linhas.
- Depois a **fonte**, sempre:
  > Fonte: `Contrato-Cliente-2026.docx`, cláusula 4.2: "o prazo de entrega é de 30 dias
  > corridos a partir da emissão da nota".
- Copie o trecho **exato** entre aspas. Não parafraseie número, prazo, valor ou nome.
- Se não achar, diga que não achou e onde procurou. **Nunca complete com o que "costuma ser".**
- Se dois documentos disserem coisas diferentes, mostre os dois e diga qual é o mais recente.

## Nunca
- Nunca altere, renomeie, mova ou apague documento.
- Nunca abra arquivo de senha, chave ou credencial.
- Nunca envie documento para ninguém — se a pessoa quiser, use a skill `email` (com OK).
