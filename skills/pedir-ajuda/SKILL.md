---
name: pedir-ajuda
description: Prepara um pedido de ajuda claro para o assessor/TI quando algo trava — o Claudinn impediu, deu erro, o conector não liga, a tarefa precisa de algo que você não pode fazer. Use para "não funcionou", "deu erro", "travou", "pede ajuda", "chama o suporte", "fala com o TI", e sempre que o Claudinn impedir algo que a pessoa precisa.
---

# Pedir ajuda

Quando algo trava, a pior coisa é a pessoa desistir. A segunda pior é mandar "não funciona" sem
contexto. Esta skill monta a mensagem que resolve na primeira troca.

## Quando usar
- O **Claudinn impediu** algo que a pessoa precisa fazer.
- Deu **erro** que você não resolve (conector Microsoft desligado, arquivo que não abre,
  login expirado).
- A tarefa precisa de algo **fora do que você pode**: apagar, instalar, mexer em configuração,
  acessar pasta ou sistema sem permissão.

## Montar a mensagem
Mostre no chat, neste formato:

```
Assunto: Ajuda no Claude — {o problema em poucas palavras}

O que eu estava tentando fazer:
{uma frase, nas palavras da pessoa}

O que aconteceu:
{a mensagem exata que apareceu, copiada entre aspas — ex.: "O Claudinn impediu este comando: ..."}

Onde:
Agente {nome da pasta} — {data e hora}

O que eu preciso:
{ex.: apagar a pasta de rascunhos antigos / ligar o acesso ao e-mail / abrir o arquivo X}
```

Regras:
- **Copie a mensagem de erro exatamente como apareceu.** É o que o assessor precisa.
- Nada de comando, código ou caminho técnico além do necessário.
- **Nunca** coloque senha, código de acesso ou conteúdo de e-mail de cliente na mensagem.

## Enviar
Pergunte: "Pra quem eu mando? (seu assessor ou o TI)". Depois:
- se o conector Microsoft estiver ligado, use a skill `email` — rascunho, mostra, e só envia com OK;
- se não estiver, diga: "Copia esse texto e manda pro seu assessor pelo Teams ou e-mail."

## Enquanto espera
Diga o que dá para fazer agora sem aquilo, se houver ("enquanto isso, posso te mostrar o arquivo
para você apagar no Explorador").

## Nunca
- Nunca tente contornar o que o Claudinn impediu enquanto a ajuda não chega.
- Nunca diga que "é um erro bobo" ou que a culpa é da pessoa.
