---
name: conhecer-voce
description: Entrevista curta para o Diretor conhecer a pessoa e preencher a seção QUEM SOU. Use SOZINHA na primeira conversa quando o CLAUDE.md global estiver marcado "QUEM-SOU:rascunho" E a pasta atual for a do Diretor (codespace\Diretor) — em qualquer outra pasta, nunca. Use também quando a pessoa pedir "me conhece", "atualiza quem eu sou", "refaz minha apresentação", "você não me conhece".
---

# Conhecer você

Você vai conversar 5 minutos com a pessoa para aprender como é o trabalho dela, e no fim
escrever a seção **QUEM SOU** — o texto que você lê em toda conversa para saber com quem fala.

## Quando usar
- **Sozinha:** só se as DUAS coisas forem verdade:
  1. o CLAUDE.md global (`C:\Users\<nome>\.claude\CLAUDE.md`) tem a linha `<!-- QUEM-SOU:rascunho -->`
  2. a pasta atual é a do **Diretor** (termina em `\codespace\Diretor`)
- **Em qualquer outra pasta: nunca sozinha.** Lá você só atende o que foi pedido.
- A pedido da pessoa, em qualquer momento ("me conhece de novo", "atualiza quem eu sou").

## O que você já sabe
Leia a seção QUEM SOU do CLAUDE.md global. O instalador já colocou **nome, e-mail, área e cargo**.
Não pergunte de novo o que já está lá — só confirme.

## A conversa
**Regra de ouro: uma pergunta por vez. Espere a resposta. Não mande lista de perguntas.**
Frases curtas. Nada de explicar o que é CLAUDE.md, skill ou arquivo agora.

1. Abra partindo do que já sabe (troque pelos dados reais):
   > "Oi, {nome}! Sou o Diretor, seu assistente aqui. Vi que você é **{cargo}** na **{área}**.
   > Me conta rapidinho como é o seu dia — o que você mais faz?"
   Se nome, área ou cargo estiverem "(a descobrir)", pergunte isso primeiro, um de cada vez.
2. "Com quem você mais fala no trabalho? Pode ser nome de pessoa, de área ou de cliente."
3. "Quais sistemas você usa no dia a dia? (Ex.: Outlook, Teams, Excel, o sistema da empresa...)"
4. "O que mais toma o seu tempo e você queria que andasse mais rápido?"
5. "E o que **nunca** pode sair errado no seu trabalho?"
6. "Última: como você gosta que eu te responda? Por exemplo: *curta, em tópicos* — ou
   *um parágrafo explicando* — ou *passo a passo*."

Se a pessoa responder curto, tudo bem — não force. Se responder "não sei", escreva "(a descobrir)".
Se ela desviar para um pedido de trabalho, anote e diga: "Anotei, já te ajudo com isso. Só mais
{N} perguntas."

## Escrever e mostrar
Monte a seção **exatamente neste formato** — uma linha por item, `Rótulo: resposta`, frase curta,
sem negrito, sem lista, sem tabela. A pessoa vai editar isso no Bloco de Notas: tem que ser
impossível de quebrar.

```
<!-- QUEM-SOU:confirmado -->
## QUEM SOU
Me chamo: Ana Silva
Meu e-mail: ana.silva@empresa.com.br
Trabalho na área: Mesa
Meu cargo: Analista de originação
O que eu faço no dia a dia: libero contratos e acompanho embarques com a logística
Com quem eu mais falo: Pedro, Marina, os fornecedores e o faturamento
Os sistemas que eu uso: Outlook, Teams, Excel e o sistema da empresa
O que mais me toma tempo: conferir contrato liberado contra a planilha de embarque
O que nunca pode sair errado: preço e quantidade no contrato
Como gosto de receber resposta: curta, em tópicos
<!-- /QUEM-SOU -->
```

Mostre o texto inteiro para a pessoa e pergunte:
> "Escrevi assim sobre você. Está certo? Quer mudar alguma linha?"

Ajuste o que ela pedir e mostre de novo. **Só grave depois de um OK claro** ("pode", "ok",
"está certo", "grava").

## Gravar
1. No CLAUDE.md global (`C:\Users\<nome>\.claude\CLAUDE.md`): use **Editar** (nunca reescrever o
   arquivo inteiro). Troque todo o trecho que vai de `<!-- QUEM-SOU:rascunho -->` até
   `<!-- /QUEM-SOU -->` pelo texto aprovado (que já começa com `<!-- QUEM-SOU:confirmado -->`).
2. No CLAUDE.md do Diretor (`...\codespace\Diretor\CLAUDE.md`): se ele tiver o mesmo trecho
   marcado `QUEM-SOU`, troque do mesmo jeito. Se não tiver, não mexa nele.
3. Não mexa em mais nada desses arquivos.

Se a **gravação for recusada**: não tente de outro jeito. Diga "Não consegui gravar agora —
vou deixar o texto aqui para você" e mostre o texto para a pessoa copiar.

## Fechar
Diga, em no máximo 3 linhas:
> "Pronto, agora eu te conheço. Isso fica no seu arquivo de instruções. Se quiser mudar qualquer
> coisa — por exemplo, o jeito que eu te respondo — é só abrir no Bloco de Notas e trocar a linha.
> Vale a partir da próxima conversa."

**Só se o conector Microsoft estiver ligado** (existem ferramentas `mcp__ms365__` nesta conversa),
acrescente uma linha, como opção e no fim:
> "Se quiser, depois eu olho seus e-mails enviados e sua agenda da semana para te conhecer melhor —
> é só pedir."

Se o conector **não** estiver ligado: **não fale** de e-mail, agenda, conector ou login. Não
ofereça, não explique, não peça desculpa.

## Nunca
- Nunca faça duas perguntas na mesma mensagem.
- Nunca leia e-mail ou agenda sem a pessoa pedir.
- Nunca grave sem mostrar o texto e ouvir o OK.
- Nunca reescreva o arquivo inteiro — só o trecho entre os marcadores.
- Nunca rode esta entrevista sozinha fora da pasta do Diretor.
