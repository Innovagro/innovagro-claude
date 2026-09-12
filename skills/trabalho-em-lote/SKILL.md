---
name: trabalho-em-lote
description: Faz a mesma tarefa em muitos itens parecidos — vários contratos, notas, e-mails ou arquivos — e junta tudo numa tabela. Use para "faz isso pra todos", "em todos os arquivos da pasta", "tira de cada contrato", "monta uma tabela com todos", "são 50 contratos", "de cada nota".
---

# Trabalho em lote

É aqui que você mais economiza tempo da pessoa: **muitos itens parecidos, a mesma pergunta para
cada um.** Ex.: "de cada um dos 40 contratos da pasta, tire cliente, volume, preço e prazo".

## Passo a passo
1. **Entenda o que sai de cada item.** Monte com a pessoa as colunas da tabela final:
   > "Para cada contrato eu vou tirar: Cliente · Volume (t) · Preço · Prazo de entrega.
   > Falta alguma coisa?"
2. **Liste os itens** e mostre a contagem: "Achei 40 arquivos .docx e 3 .pdf na pasta Contratos."
   Se forem mais de 100, pergunte se é para fazer todos ou filtrar.
3. **Faça 3 primeiro, como amostra.** Mostre a tabela com os 3 e pergunte:
   > "Ficou assim nos 3 primeiros. Posso seguir com os outros 40?"
   É aqui que a pessoa corrige o critério — antes de você fazer 40 errados.
4. **Faça o resto**, um por um, com as ferramentas de leitura (as mesmas das skills
   `consultar-documentos` e `planilha`). A cada ~10, dê notícia em uma linha: "20 de 43 prontos."
5. **Entregue:**
   - a tabela em arquivo novo: `...\codespace\<agente>\lotes\AAAA-MM-DD-{nome}.csv`
   - um resumo no chat (totais, o que chamou atenção)
   - a lista do que **não deu para ler** e por quê ("contrato-17.pdf: escaneado, sem texto").
     Nunca esconda falha.

## Regras
- Célula que o documento não responde fica `(não encontrado)`. **Nunca preencha com palpite.**
- Copie número, data e nome como estão no documento.
- Tudo que você gerar é **arquivo novo**. Os itens originais não são tocados.

## Nunca
- **Nunca renomeie, mova ou apague em massa** — nem "para organizar". O Claudinn impede, e está
  certo. Se a pessoa quiser organizar a pasta, faça uma **lista** do que sugere mover e ela faz.
- Muitos itens do mesmo tipo (100 planilhas, 200 linhas de um CSV) podem ser processados com um
  programa em **Python** (skill `planilha`) — mas mostre a amostra de 3 primeiro. Para documentos
  variados, faça com as ferramentas de leitura, um por vez, à vista.
- Nunca envie nada para os contatos da lista — mesmo que a tarefa seja "avisar todos". Se for,
  prepare os rascunhos com a skill `email` e mostre todos antes.
