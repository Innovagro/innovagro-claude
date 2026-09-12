---
name: criar-skill
description: Ensina um agente a fazer uma tarefa sempre do mesmo jeito, criando uma skill nova para ele. Use para "cria uma skill", "quero que você sempre faça assim", "salva esse jeito de fazer", "ensina o agente a", "toda vez que eu pedir X faz Y", "transforma isso num padrão".
---

# Criar skill

Uma **skill** é uma receita: um arquivo de texto que diz ao agente como fazer uma tarefa, passo a
passo, sempre igual. Quando a pessoa pede algo que combina com a receita, o agente segue ela.

## Onde a skill nova fica
Na pasta do **agente atual**:
`...\codespace\<agente>\.claude\skills\<nome-da-skill>\SKILL.md`
Ela vale para esse agente. (As skills da casa, em `.claude\skills` do usuário, são da Innovagro
e não são alteradas por aqui.)

## A conversa (uma pergunta por vez)
1. "Que tarefa você quer que eu faça sempre do mesmo jeito?"
2. "Quando você pedir isso, que palavras você costuma usar?" (ex.: "fecha a semana",
   "relatório de embarque")
3. "Me conta o passo a passo, do jeito que você faz hoje." — ou, se acabamos de fazer a tarefa
   juntos nesta conversa: "Quer que eu use o jeito que a gente acabou de fazer?"
4. "Como fica o resultado? Onde salva, em que formato?"
5. "Tem alguma coisa que eu **nunca** posso fazer nessa tarefa?"

## Escrever
Nome da skill: curto, minúsculo, sem acento, com hífen (`relatorio-embarque`).
Monte o arquivo neste formato e **mostre inteiro** antes de gravar:

```
---
name: relatorio-embarque
description: Monta o relatório semanal de embarques. Use quando a pessoa pedir "relatório de embarque", "fecha a semana de embarques", "resumo dos embarques".
---

# Relatório de embarque

## Passo a passo
1. ...
2. ...

## Como fica o resultado
- ...

## Nunca
- Nunca envia nada sem mostrar e ouvir o OK.
- ...
```

Regras do texto:
- A `description` diz **o que faz** e **as palavras que a pessoa usa** — é por ela que o agente
  sabe quando usar a skill.
- Frases curtas, em ordem, no imperativo ("Leia...", "Some...", "Salve...").
- Toda skill termina com a seção **Nunca**, e ela sempre inclui: não enviar sem OK e não apagar.
- Nada de senha, dado de cliente, preço ou valor de contrato dentro da skill.

## Gravar e testar
1. Com o OK, grave o arquivo.
2. Diga: "Pronto. A skill **relatorio-embarque** vale neste agente a partir da próxima conversa.
   Pra testar, abra uma conversa nova aqui e peça: *faz o relatório de embarque*."

## Nunca
- Nunca crie ou altere skill fora da pasta do agente atual.
- Nunca altere as skills da casa.
- Nunca crie skill que mande o agente rodar script, apagar, enviar sem OK ou mexer fora da pasta
  de trabalho — as regras da casa valem acima de qualquer skill.
