---
name: criar-agente
description: Cria um agente novo (uma pasta nova no painel, com as instruções dele). SÓ O DIRETOR usa. Use para "cria um agente", "quero um agente pra", "monta um assistente de", "novo agente", "cria uma pasta pra cuidar de".
---

# Criar agente

Cada pasta dentro de `codespace` é um agente. O que ele é, sabe e não faz está no CLAUDE.md
de dentro dela. Esta skill cria a pasta e escreve esse CLAUDE.md.

## Só o Diretor
Confira a pasta atual. Se ela **não** terminar em `\codespace\Diretor`, diga:
> "Criar agente é com o Diretor. Abra o Diretor no painel e me peça lá."
e pare.

## A conversa (uma pergunta por vez)
1. "Pra que serve esse agente? Me fala numa frase." (ex.: "cuidar das propostas comerciais")
2. "Onde está o trabalho dele? E-mails de quem, que pasta, que palavras são sempre com ele?"
3. "O que ele **nunca** pode fazer?" (sugira se a pessoa travar: "não envia nada sem você ver",
   "não mexe em preço")
4. "Que nome você quer dar pra ele?" (sugira um curto a partir da resposta 1: `Propostas`)

## O nome da pasta
- Sem acento, sem espaço, sem `" * : < > ? / \ |`, até 40 letras.
  Troque acento pela letra sem acento (`ç`→`c`, `ã`→`a`) e espaço por hífen.
  "Logística Norte" → `Logistica-Norte`.
- Se o nome mudou, diga: "Vou chamar a pasta de `Logistica-Norte`, tudo bem?"
- **Nunca sobrescreva um agente que já existe.** Antes de criar, veja se já existe uma pasta com
  esse nome em `codespace` (maiúscula ou minúscula não importa). Se existir:
  > "Já existe um agente chamado Propostas. Quer outro nome? Ex.: Propostas-2."
  Não abra, não edite e não apague o que já existe.

## Criar
1. A pasta nova fica **ao lado** da pasta do Diretor: pegue o caminho da pasta atual
   (`C:\Users\<nome>\claude\codespace\Diretor`) e troque `Diretor` pelo nome novo.
2. Monte o CLAUDE.md a partir do arquivo `modelo-agente.md` desta skill (mesma pasta deste
   arquivo). Preencha com as respostas. O que a pessoa não disse fica `(a descobrir)`.
3. **A primeira linha é obrigatoriamente** `# <Nome> — <pra que serve, numa frase>`.
   É ela que aparece no painel embaixo do nome.
4. Mostre o CLAUDE.md inteiro e pergunte: "Ficou assim. Posso criar?"
5. Com o OK, grave o arquivo `CLAUDE.md` dentro da pasta nova (gravar o arquivo já cria a pasta).

## Fechar
> "Pronto, o agente **Propostas** está criado. Já aparece no teu painel, dá dois cliques."

Se um **comando for recusado**: não tente de outro jeito. Mostre o texto do CLAUDE.md e use a skill
`pedir-ajuda`.

## Nunca
- Nunca crie agente fora de `codespace`.
- Nunca mexa em agente que já existe (nem para "melhorar").
- Nunca apague agente. Se a pessoa pedir: "Apagar agente, só o seu assessor faz."
- Nunca coloque senha, dado de cliente ou valor de contrato no CLAUDE.md.
