---
name: o-que-agendar
description: Ajuda a pessoa a decidir o que vale a pena rodar sozinho e o que não deve — e enquadra tudo na regra "a automação prepara, você envia". Use para "o que dá pra automatizar", "o que vale agendar", "que rotinas fazer", "ideias de automação", "como uso isso".
---

# O que vale agendar

Automação boa é a que **prepara algo repetitivo para você**, todo dia, e deixa pronto para você
decidir. Ela nunca decide nem envia sozinha.

## A regra que enquadra tudo
> **A automação PREPARA; você ENVIA.**
> A tarefa deixa um rascunho/relatório em arquivo na pasta `saida\`. Você abre, confere e, se for o
> caso, envia. Isso vale principalmente quando roda sozinho — nada sai com o seu nome sem você ver.

## O que vale (bons candidatos)
- **Resumo da caixa de entrada, toda manhã às 8h** → deixa em `saida\` o que chegou e o que espera
  resposta. Você lê e responde o que importa. (usa a skill `caixa-de-entrada`)
- **Fechamento do dia / da semana** → junta o que ficou pendente num arquivo, para você revisar.
- **Digest de um assunto** → toda segunda, um resumo do que apareceu sobre um tema em documentos da
  pasta. (usa `consultar-documentos`)
- **Preparar um relatório recorrente** → monta o rascunho (Excel/Word) do relatório que você faz
  sempre, para você revisar e mandar. (usa `criar-excel`/`criar-documento`)

## O que NÃO agendar
- Nada que **envie** e-mail, mensagem no Teams ou convite sozinho — a automação não envia (o envio
  pede o seu OK, e a tarefa roda sem você). Ela só prepara.
- Nada que **apague, mova ou altere** dado — automação é para preparar, não para mexer.
- Nada que dependa de uma decisão sua (aprovar um pagamento, escolher um preço) — isso é seu.
- Nada que precise de senha ou de você digitar algo no meio — roda sozinho, ninguém está lá.

## Como criar
Escolha uma ideia acima, ajuste ao seu dia, e use a skill `agendar-tarefa`. Comece com **uma** —
quando ela virar hábito, agende a próxima.

## Cuidado honesto
A tarefa só roda com o computador **ligado** e na hora marcada; se estava desligado, ela **não**
roda depois (não acumula). Se algo importante depende dela, confira o arquivo em `saida\` de manhã.
