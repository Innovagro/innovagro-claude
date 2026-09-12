---
name: criar-documento
description: Cria um documento Word (.docx) no padrão Innovagro — logo no cabeçalho, títulos marinho e verde, tabelas, página X de Y. Use para "cria um documento", "faz um Word", "monta um relatório em Word", "gera o docx", "escreve um comunicado", "passa isso pra Word".
---

# Criar documento (Word)

Gera um `.docx` novo com a identidade da Innovagro. Abre no Word de qualquer pessoa.

## Como (a ferramenta da casa)
1. **Escreva o conteúdo** e confirme com a pessoa antes de gerar (título, seções, tabelas).
2. **Monte a especificação** e grave como arquivo novo em
   `...\codespace\<agente>\rascunhos\AAAA-MM-DD-<nome>.json`:
   ```json
   { "titulo": "Comunicado — novo horário de embarque",
     "subtitulo": "Área de Logística · 13/09/2026",
     "rodape": "Uso interno",
     "blocos": [
       {"tipo": "campos",   "itens": [["Para", "Equipe de logística"], ["Vale a partir de", "16/09/2026"]]},
       {"tipo": "secao",    "texto": "O que muda"},
       {"tipo": "paragrafo","texto": "Os embarques passam a ser conferidos **toda terça**."},
       {"tipo": "lista",    "itens": ["Primeiro ponto", "Segundo ponto"]},
       {"tipo": "tabela",   "colunas": ["Dia", "Horário"], "linhas": [["Terça", "8h às 12h"]]},
       {"tipo": "destaque", "texto": "**Atenção:** dúvidas com a coordenação."} ] }
   ```
   Blocos: `campos` (rótulo: valor), `secao`, `subsecao`, `paragrafo`, `lista`, `lista-numerada`,
   `tabela`, `destaque`, `quebra` (nova página). Negrito: `**assim**` dentro do texto.
3. **Rode a ferramenta** (PowerShell, trocando os dois caminhos):
   ```powershell
   & "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\criar-documento.mjs" "C:\...\rascunhos\2026-09-13-comunicado.json" "C:\...\documentos\2026-09-13-comunicado.docx"
   ```
   Saída **sempre nova** e dentro da pasta de trabalho ou do `Meu-Cerebro` — a ferramenta recusa
   o resto. Nome já existe → use `-v2`.
4. **Diga onde ficou** e ofereça: "Quer em PDF também?" (skill `relatorio-pdf`).

## Ler um Word que já existe
```powershell
& "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\ler-documento.mjs" "C:\...\arquivo.docx"
```
Mostra o texto, sem abrir o Word e sem alterar o arquivo.

## Nunca
- Nunca sobrescreva nem apague documento que já existe.
- Nunca coloque senha, dado pessoal sensível ou valor de contrato sem a pessoa pedir.
