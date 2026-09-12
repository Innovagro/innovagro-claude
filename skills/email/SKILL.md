---
name: email
description: Escrever, responder e encaminhar e-mail no Outlook, do jeito que a pessoa escreve. Use para "escreve um e-mail", "responde esse e-mail", "responde o fulano", "encaminha pra", "manda um e-mail pra", "prepara uma resposta", "cobra por e-mail". SEMPRE mostra o rascunho completo e só envia com o OK explícito.
---

# E-mail

> **Nada sai com o seu nome sem você ver.**

Esta skill tem duas partes:
- **As regras** (abaixo) — fixas, valem sempre, ninguém muda.
- **Como eu escrevo** (no fim) — começa **vazia** e é preenchida com você, olhando os seus e-mails
  enviados. É isso que faz o rascunho sair com a sua cara.

## As regras (fixas)
1. **Entenda o pedido.** Para quem, sobre o quê, o que precisa acontecer depois. Faltou algo
   essencial → pergunte, **uma coisa por vez**.
2. **Resposta ou encaminhamento?** Ache o e-mail original primeiro (`list-mail-messages`, depois
   `get-mail-message`). Mais de um parecido → mostre 2 ou 3 (de quem, assunto, data) e pergunte qual.
3. **Escreva o rascunho no chat**, sempre assim:
   ```
   Para: nome <email>
   Cc: (se tiver)
   Assunto: ...

   (texto)
   ```
   Siga a seção **Como eu escrevo**. Se ela estiver vazia, escreva curto, educado e direto.
   Nunca invente número, data, prazo ou compromisso — deixe `[confirmar: prazo]`.
4. **Pergunte:** "Posso enviar assim, ou quer mudar algo?" Mudou → mostre o texto inteiro de novo.
5. **Só envie com OK explícito:** "pode enviar", "envia", "manda", "ok, pode mandar".
   Resposta vaga ("tá bom", "legal") → "Então posso enviar?"
6. **Enviar:** crie o rascunho no Outlook (`create-reply-draft`, `create-reply-all-draft`,
   `create-forward-draft` ou `create-draft-email`) e envie com `send-draft-message`.
   Vai aparecer uma confirmação na tela — é a segunda trava, de propósito: "É só aprovar."
7. **Confirme:** "Enviado para {destinatário} às 14h32."

Quer só o rascunho? "Deixei na pasta **Rascunhos** do seu Outlook — é só revisar e enviar."

**Cuidados:** destinatário de fora da empresa → avise antes do OK. Anexo → só arquivo que a
pessoa indicou. Assunto sensível (preço, contrato, crédito, pagamento, jurídico) → "revise com
calma antes de enviar". Vários e-mails → mostre todos; o OK vale só para os mostrados.

**Nunca:** enviar sem mostrar e ouvir o OK · apagar, mover ou arquivar e-mail ("isso você faz no
Outlook") · criar regra, encaminhamento automático ou resposta automática · escrever em nome de
outra pessoa ou de caixa compartilhada sem pedido explícito.

Sem o conector Microsoft ligado: escreva o e-mail no chat para a pessoa copiar e colar no Outlook.

---

## Como eu escrevo
<!-- Preenchido na sala, com a pessoa, olhando os e-mails enviados dela. Uma linha por item. -->
Como eu cumprimento: 
Como eu me despeço: 
Minha assinatura: 
Tamanho dos meus e-mails: 
Tom com gente de dentro: 
Tom com gente de fora: 
Palavras e jeitos que eu uso: 
O que eu nunca escrevo: 
