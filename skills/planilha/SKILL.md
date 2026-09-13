---
name: planilha
description: Lê e analisa planilhas Excel (.xlsx) e CSV — somar, comparar, cruzar, agrupar, conferir, achar diferença, fazer gráfico. Use para "analisa essa planilha", "soma", "total", "compara as duas planilhas", "confere os valores", "quantos", "agrupa por", "faz um gráfico", "abre o Excel".
---

# Planilha

**A planilha original nunca é alterada.** Você só lê. Todo resultado vira arquivo novo.

## 1. Abrir (ferramenta da casa — não precisa de Excel instalado)
```powershell
& "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\ler-excel.mjs" "C:\...\vendas.xlsx" "C:\...\codespace\<agente>\planilhas\lido"
```
Ela exporta cada aba para um CSV (UTF-8, separador `;`) na pasta indicada e devolve um resumo:
abas, linhas, colunas, cabeçalho — e as **armadilhas** que fazem o total não bater:
- `linhas_ocultas` / `filtro_ativo`: o total que a pessoa vê no Excel pode ser só das linhas visíveis.
- `celulas_numero_como_texto`: número guardado como texto (ex.: "1.234,56") não entra na soma do Excel.
- `formulas_sem_resultado_salvo`: fórmula que o Excel ainda não calculou.
CSV: leia direto. Arquivo no OneDrive: use o caminho da pasta sincronizada (`OneDrive - Innovagro\...`).

## 2. Antes de analisar, mostre o que leu
> "Abri **vendas.xlsx**: 3 abas — *Janeiro* (412 linhas), *Fevereiro* (398), *Resumo* (12).
> Atenção: *Janeiro* tem filtro ativo e 37 linhas ocultas. Somo todas ou só as visíveis?"
Confira também: linha de TOTAL no fim da aba, datas misturadas, cliente escrito de dois jeitos,
unidade diferente (kg × t).

## 3. Analisar
- **Conta simples** (somar, contar, média de uma coluna): faça direto e mostre como fez.
- **Análise de verdade** (cruzar abas, agrupar, comparar planilhas, gráfico): escreva um programa
  em **Python** (pandas, openpyxl e matplotlib já vêm instalados) e rode com o `python` da casa.
  - Leia os CSV exportados no passo 1 (ou o `.xlsx` direto com pandas).
  - Grave resultados **só como arquivos novos** em `...\codespace\<agente>\planilhas\`.
  - O programa nunca apaga, move ou renomeia arquivo, nunca abre outro programa e nunca grava
    fora da pasta de trabalho. Se um comando for recusado, não tente de outro jeito: explique e
    siga sem aquilo.
- Todo número que vai para decisão passa pela skill `conferir`.

## 4. Entregar
- Tabela pequena: no chat, resposta curta primeiro, detalhe depois.
- Planilha arrumada: skill `criar-excel` (cabeçalho, filtro, R$, total).
- Gráfico: `.png` novo na pasta do agente (matplotlib), e diga onde ficou.
- Sempre termine com **Como cheguei nesses números** (2 a 5 linhas: aba, linhas, filtros, conta).
- Se a pessoa pediu **análise** (não só uma conta), acrescente **3 a 5 leituras acionáveis** — o que
  o dado sugere fazer, cada uma amarrada a um número da planilha (ex.: "Produto X caiu 20% em fev
  vs jan — vale checar por quê"). Nunca aponte causa que o dado não mostra; separe fato de hipótese.

## Nunca
- Nunca salve por cima da planilha original nem de arquivo que já existe.
- Nunca apague os CSV exportados.
- Nunca mexa em preço, contrato ou limite de crédito: analise e mostre, sem propor valor.
