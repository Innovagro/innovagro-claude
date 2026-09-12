---
name: marcar-reuniao
description: Acha horário livre e prepara o convite de reunião no Outlook/Teams. Use para "marca uma reunião", "agenda com fulano", "acha um horário", "quando o fulano está livre", "remarca a reunião", "cria um convite". Sempre mostra o convite e só envia com OK.
---

# Marcar reunião

Um convite **sai com o nome da pessoa** para outras pessoas. Então vale a mesma regra do e-mail:
> **Nada sai com o seu nome sem você ver.**

Precisa do conector Microsoft (ferramentas `mcp__ms365__`). Sem ele: escreva o convite (título,
dia, hora, convidados, texto) no chat para a pessoa criar no Outlook.

## Passo a passo
1. Entenda: com quem, sobre o quê, quanto tempo, até quando, presencial ou Teams.
   Pergunte o que faltar — uma coisa por vez.
2. Ache horários:
   - `find-meeting-times` com os convidados e a duração (é o melhor: cruza a agenda de todos), ou
   - `get-schedule` para ver livre/ocupado dos convidados, ou
   - `get-calendar-view` para ver só a agenda da própria pessoa.
3. Ofereça **no máximo 3 opções**:
   > "Achei estes horários em que todos estão livres:
   > 1. terça 16/09, 10h–10h30
   > 2. terça 16/09, 15h–15h30
   > 3. quarta 17/09, 9h–9h30
   > Qual prefere?"
4. Mostre o convite completo:
   ```
   Título: ...
   Quando: terça 16/09, 10h–10h30
   Onde: Teams (link automático) | sala X
   Convidados: Fulano <email>, Beltrano <email>
   Texto: (curto — pauta em 2 ou 3 linhas)
   ```
5. **Só crie com OK explícito** ("pode marcar", "manda o convite", "ok").
   Use `create-calendar-event`. O Claude vai pedir uma confirmação na tela antes — diga:
   "Vai aparecer uma confirmação — é só aprovar."
6. Confirme: "Convite enviado para Fulano e Beltrano, terça 10h."

## Remarcar
Você **não altera** um convite que já existe (editar pode tirar gente sem querer). Para remarcar:
1. Crie um convite **novo** no horário novo, do jeito acima (mostrar → OK → `create-calendar-event`).
2. Diga: "Criei o convite no novo horário. O convite antigo continua na sua agenda — quando quiser,
   você mesmo cancela ele no Outlook (é mais seguro do que eu mexer no que já foi enviado)."

## Nunca
- **Nunca cancele reunião.** Cancelar avisa e apaga para todos. Se a pessoa pedir:
  > "Cancelar você faz direto no Outlook ou no Teams — posso te dizer qual é a reunião."
- Nunca aceite ou recuse convite no lugar da pessoa sem ela pedir.
- Nunca mexa na agenda de outra pessoa nem compartilhe a agenda.
