---
name: teams
description: Lê conversas e canais do Microsoft Teams e prepara mensagens para enviar — sempre com o OK da pessoa. Use para "o que falaram no Teams", "resume o canal", "o que o fulano me mandou no Teams", "manda no Teams pro", "responde no chat", "avisa o grupo", "posta no canal".
---

# Teams

> **Nada sai com o seu nome sem você ver.** Vale para mensagem no Teams igual a e-mail.

Precisa do conector Microsoft com o Teams ligado (ferramentas como `mcp__ms365__list-chats`).
Se elas não existirem nesta conversa, diga: "O acesso ao Teams ainda não está ligado para você —
fale com seu assessor." e pare. Não ofereça alternativa técnica.

## Ler
- **Conversas (chats):** `list-chats` para achar a conversa (por nome da pessoa ou do grupo) →
  `list-chat-messages` para ler as mensagens.
- **Canais de um time:** `list-joined-teams` → `list-team-channels` → `list-channel-messages`;
  respostas de um tópico: `list-channel-message-replies`.
- Achou mais de uma conversa parecida → mostre 2 ou 3 e pergunte qual.

**Resumo de conversa ou canal:**
```
{Nome da conversa/canal} — desde {quando}
- Pedido para você: {quem} pediu {o quê} ({dia/hora})
- Decidido: {o quê}
- Em aberto: {o quê}
```
Uma linha por item. Mensagem sem importância não entra ("e mais 20 mensagens de conversa geral").
Nunca invente quem disse o quê — se não der para saber, escreva "(não ficou claro quem)".

## Enviar
1. Entenda: para quem (pessoa, grupo ou canal) e o quê. Pergunte o que faltar, uma coisa por vez.
2. Mostre a mensagem completa:
   ```
   Para: {conversa ou canal}
   Mensagem: {texto}
   ```
   Curta, no tom de chat — sem "Prezado", sem assinatura.
3. "Posso enviar?" — **só com OK explícito** ("pode", "envia", "manda").
4. Envie:
   - conversa existente: `send-chat-message` (ou `reply-to-chat-message` para responder uma mensagem)
   - canal: `send-channel-message` (ou `reply-to-channel-message` num tópico)
   Vai aparecer uma confirmação na tela — é a segunda trava: "É só aprovar."
5. Confirme: "Enviado no chat com {nome} às 14h32."

Para quem ainda não tem conversa com a pessoa, **não crie grupo novo sozinho**: pergunte antes
("Vocês ainda não têm conversa no Teams. Quer que eu comece uma?").

## Nunca
- Nunca envie sem mostrar e ouvir o OK.
- Nunca apague, edite ou fixe mensagem; nunca saia de grupo; nunca adicione ou remova pessoas.
- Nunca mande em nome de outra pessoa, nem mensagem para todos de um canal grande sem avisar
  "isso vai para as {N} pessoas do canal".
- Nunca copie para fora (e-mail externo, arquivo) o que foi dito numa conversa sem a pessoa pedir.
