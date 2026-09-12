---
name: relatorio-pdf
description: Gera um relatório em PDF com o logo e as cores da Innovagro, pronto para mandar. Use para "gera um PDF", "manda em PDF", "faz um relatório em PDF", "exporta pra PDF", "quero o PDF", "me manda em PDF também".
---

# Relatório em PDF

Transforma um relatório em PDF no padrão Innovagro (logo, títulos marinho, filete verde,
tabelas zebradas). Usa o Microsoft Edge que já vem no Windows, sem internet.

## Como (a ferramenta da casa)
1. **Escreva o relatório em HTML simples** — só o miolo, sem `<html>` — e grave como arquivo novo
   em `...\codespace\<agente>\rascunhos\AAAA-MM-DD-<nome>.html`:
   ```html
   <h1>Relatório de embarques — agosto</h1>
   <p class="sub">Área de Logística · gerado em 13/09/2026</p>
   <h2>Resumo</h2>
   <div class="destaque"><b>Total embarcado:</b> 2.080,5 t em 2 clientes.</div>
   <h2>Por cliente</h2>
   <table>
     <tr><th>Cliente</th><th>Volume (t)</th><th>Valor</th></tr>
     <tr><td>Cliente A</td><td>1.250,5</td><td>R$ 98.765,43</td></tr>
   </table>
   <h3>Como cheguei nesses números</h3>
   <p>...</p>
   ```
   Use só: `h1` (título, um só), `p class="sub"` (subtítulo), `h2`, `h3`, `p`, `ul/li`, `table`,
   `div class="destaque"`, `b`. **Não** coloque logo, cor ou CSS — a ferramenta põe o layout da casa.
2. **Rode a ferramenta** (PowerShell, trocando os dois caminhos):
   ```powershell
   & "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\gerar-pdf.mjs" "C:\...\rascunhos\2026-09-13-embarques.html" "C:\...\relatorios\2026-09-13-embarques.pdf"
   ```
   Leva poucos segundos. Saída **sempre nova**, dentro da pasta de trabalho ou do `Meu-Cerebro`.
3. **Diga onde ficou**: "PDF pronto: `relatorios\2026-09-13-embarques.pdf`."
   Se a pessoa quiser mandar por e-mail, use a skill `email` (anexo, rascunho, OK).

## Se der errado
- "Nao achei o Microsoft Edge" → skill `pedir-ajuda`.
- Nome já existe → use `-v2`. Nunca apague o anterior.

## Nunca
- Nunca gere PDF de documento que a pessoa não revisou, se ele for sair da empresa.
- Nunca inclua dado que não estava na fonte (skill `conferir` antes, se tiver número).
