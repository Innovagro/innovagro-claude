---
name: caixa-de-entrada
description: Lê a caixa de entrada do Outlook — resume o que chegou, acha e-mail, mostra o que precisa de resposta. Só leitura. Use para "o que chegou de importante hoje?", "resume meus e-mails", "o que eu preciso responder", "acha o e-mail do fulano", "tem e-mail sobre", "bom dia, o que tem pra mim", "minha agenda de hoje".
---

# Caixa de entrada

**Só leitura.** Nada é enviado, respondido, marcado, movido ou apagado aqui.

Precisa do conector Microsoft (ferramentas `mcp__ms365__`). Se ele não estiver ligado nesta
conversa, diga em uma frase que isso depende da conta Microsoft conectada, e pare.

## O que a pessoa quer?
- **"O que chegou / o que tem pra mim / resume"** → Resumo (abaixo).
- **"Acha o e-mail de... / sobre..."** → Achar (abaixo).
- **"Minha agenda"** → só a parte 2 do resumo.

## Resumo
1. E-mails recebidos desde ontem às 17h (ou o período que a pessoa disser): `list-mail-messages`.
   Traga remetente, assunto, data e o começo do texto; abra o e-mail inteiro (`get-mail-message`)
   só quando o começo não bastar.
2. Agenda de hoje: `get-calendar-view` (de 0h a 23h59 de hoje, horário de Brasília).
3. Use o QUEM SOU (com quem a pessoa mais fala, o que nunca pode sair errado) para decidir o que importa.
4. Monte **nesta ordem**:
```
Hoje, {dia da semana} {dd/mm}

1. Precisa de resposta sua
- {Remetente} — {assunto}: {o que ele quer, em uma frase}. Desde {quando}.

2. Suas reuniões
- {hh:mm}–{hh:mm} {título} — com {quem}. {O que preparar, se der para saber.}

3. Pode esperar
- {Remetente} — {assunto}: {uma frase}.

4. Só para saber
- (no máximo 5 linhas; o resto só a contagem: "e mais 12 avisos")
```
- "Precisa de resposta sua" = alguém perguntou ou pediu algo **a esta pessoa** (cópia não conta).
- Nunca invente prazo. Uma linha por item.
- Siga a linha "Como gosto de receber resposta" do QUEM SOU.
5. Termine com: "Quer que eu prepare a resposta de algum? É só dizer o número." (→ skill `email`)

## Achar
1. Busque com `list-mail-messages` usando as palavras da pessoa (nome, assunto, cliente, período).
   Tente variações: sem acento, só o sobrenome, a sigla.
2. Mostre no máximo 5 resultados, do mais novo para o mais antigo:
   `1. {dd/mm} — {Remetente} — {assunto}`
3. "Qual deles?" → abra com `get-mail-message` e resuma em 3 linhas, ou mostre o trecho pedido.
4. Não achou → diga onde e como procurou, e ofereça outra palavra.

## Guardar (só se a pessoa pedir)
Arquivo novo: `...\codespace\<agente atual>\resumos\AAAA-MM-DD-resumo.md`.

## Nunca
- Nunca responda, marque como lido, mova, arquive ou apague e-mail.
- Nunca aceite ou recuse convite a partir daqui.
- Nunca leia caixa compartilhada ou de outra pessoa.
