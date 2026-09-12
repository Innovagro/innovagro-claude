---
name: criar-excel
description: Cria uma planilha Excel (.xlsx) de verdade, já formatada — cabeçalho, filtro, R$, datas e total. Use para "cria uma planilha", "monta um Excel", "passa isso pra Excel", "gera a planilha", "exporta pra Excel", "quero em xlsx".
---

# Criar Excel

Gera um `.xlsx` novo, no padrão Innovagro: cabeçalho marinho, filtro ligado, primeira linha
congelada, `R$` e datas no formato brasileiro, linha de TOTAL opcional. Abre com dois cliques.

## Como (a ferramenta da casa)
1. **Monte a especificação** e grave como arquivo novo em
   `...\codespace\<agente>\rascunhos\AAAA-MM-DD-<nome>.json`:
   ```json
   { "abas": [ {
       "nome": "Embarques",
       "colunas": [
         {"titulo": "Cliente",    "tipo": "texto"},
         {"titulo": "Volume (t)", "tipo": "numero", "casas": 1},
         {"titulo": "Valor",      "tipo": "moeda"},
         {"titulo": "Data",       "tipo": "data"},
         {"titulo": "Margem",     "tipo": "porcentagem"} ],
       "linhas": [ ["Cliente A", 1250.5, 98765.43, "13/09/2026", 0.125] ],
       "total": true } ] }
   ```
   - Tipos: `texto`, `numero` (com `casas` de 0 a 4), `moeda`, `data`, `porcentagem`.
   - Números podem vir no jeito brasileiro (`"1.250,50"`, `"R$ 98.765,43"`, `"12,5%"`) — a ferramenta entende.
   - Datas: `"13/09/2026"` ou `"2026-09-13"`.
   - Muitos dados? Em vez de `linhas`, use `"csv": "C:\\...\\dados.csv"` (primeira linha = títulos;
     se não passar `colunas`, o tipo de cada coluna é detectado sozinho).
   - Várias abas: mais itens em `abas`.
2. **Rode a ferramenta** (PowerShell, exatamente assim, trocando os dois caminhos):
   ```powershell
   & "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\criar-excel.mjs" "C:\...\rascunhos\2026-09-13-embarques.json" "C:\...\planilhas\2026-09-13-embarques.xlsx"
   ```
   - O arquivo de saída é **sempre o último** e **sempre novo**: a ferramenta recusa sobrescrever e
     recusa gravar fora da pasta de trabalho ou do `Meu-Cerebro`. Se o nome já existir, use outro
     (`-v2`), nunca apague o anterior.
3. **Diga onde ficou**: "Criei **2026-09-13-embarques.xlsx** em `planilhas\` do agente. Tem 1 aba,
   42 linhas e o total no fim."

## Quando for análise, não planilha formatada
Se o pedido for **analisar** dados (cruzar, agrupar, gráfico), use a skill `planilha` — ela pode
usar Python. Esta skill é para **entregar** a planilha arrumada.

## Nunca
- Nunca sobrescreva nem apague planilha que já existe.
- Nunca grave o `.xlsx` fora da pasta de trabalho ou do `Meu-Cerebro`.
- Nunca invente valor para preencher célula vazia — deixe vazia.
