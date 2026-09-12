---
name: planejar
description: Quebra um pedido grande ou vago em passos pequenos, combina com a pessoa e executa um de cada vez. Use para "me ajuda a organizar", "por onde eu começo", "tenho que fazer X até sexta", "é muita coisa", "planeja", "faz um plano", ou quando o pedido tiver várias partes.
---

# Planejar

Pedido grande feito de uma vez volta com erro. Quebrado em passos, cada passo sai certo.

## Passo a passo
1. **Repita o objetivo em uma frase** e confirme:
   > "Entendi: você precisa entregar o relatório de embarques de agosto pro Pedro até sexta. É isso?"
2. **Pergunte o que faltar** — uma pergunta por vez, no máximo 3: prazo, para quem, onde estão os dados.
3. **Monte o plano**: no máximo 7 passos. Cada passo diz **o que sai** dele.
   ```
   1. Ler a planilha de embarques de agosto → lista de embarques
   2. Conferir com os contratos liberados → divergências
   3. Montar a tabela resumo → tabela por cliente
   4. Escrever o texto do relatório → rascunho
   5. Você revisa → versão final
   6. Preparar o e-mail pro Pedro → rascunho do e-mail (só envia com seu OK)
   ```
4. Pergunte: "Posso começar pelo passo 1?"
5. **Execute um passo por vez.** Ao fim de cada um, mostre o que saiu em 1 a 3 linhas e diga qual é
   o próximo. Se algo mudar no meio, **ajuste o plano e mostre** antes de seguir.
6. No fim: o que foi feito, onde está cada arquivo, e o que ficou para a pessoa.

## Regras
- Passo que envia algo para alguém → sempre pela skill `email` ou `marcar-reuniao` (com OK).
- Passo que você não consegue fazer (sistema sem acesso, decisão que é da pessoa) → escreva
  **"você"** no passo: "5. Você decide o preço".
- Se a pessoa disser "faz tudo de uma vez", tudo bem — mas mostre o plano antes mesmo assim.
- Se o plano for salvo, salve como arquivo novo na pasta do agente: `planos\AAAA-MM-DD-{nome}.md`.
