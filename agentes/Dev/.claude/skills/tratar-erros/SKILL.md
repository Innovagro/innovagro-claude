---
name: tratar-erros
description: Como lidar com erro e log no padrão da casa — erro estruturado, tradução num ponto só, sem vazar dado interno, log sem PII e sem console solto. Use para "tratar erro", "lançar erro", "log", "logger", "validação", "try catch", "mensagem de erro", "console.log".
---

# Tratar erros e log

Erro bem tratado é o que separa um app que a pessoa confia de um que assusta. Duas regras guiam tudo:
**erro é dado estruturado** e **nada interno vaza para quem está do outro lado.**

## Erro estruturado (nunca `throw "texto"`)
Todo erro carrega:
- um **`code`** estável em MAIÚSCULAS com prefixo de domínio (ex.: `PEDIDO_NAO_ENCONTRADO`) — o texto
  da mensagem não muda (o id vai no `context`, não interpolado na mensagem), para o log agrupar;
- um **status** (404, 409, 422...), uma **severidade**, e um **`context`** serializável **sem PII**
  (nada de CPF, telefone, e-mail, conteúdo de mensagem — id interno pode).
- Nomeie a classe pela **condição** (`NaoEncontrado`, `Conflito`), não pela ação — assim ela se reusa.

No degrau 1 (Python) é a mesma ideia: uma pequena classe base de erro com `code`, `status`, `context`.
No degrau 2/3 é uma `BaseError` com subclasses.

## Traduza num lugar só
- Um **wrapper na borda** (middleware/handler de erro) captura tudo que escapou, **loga uma vez** e
  serializa para o cliente. Você **não** fica escrevendo `try/catch` em cada rota para montar resposta.
- Para o cliente vai só `{ ok: false, error: { code, message } }`. **`cause`, stack e `context`
  ficam no log — nunca na resposta.**

## Log
- **Um logger estruturado. `console.log`/`print` solto é proibido** em código de servidor.
- Cada log: mensagem estável + `code` + `context` (sem PII). Filtrado por um nível (`LOG_LEVEL`).
- **Ou o erro se reporta, ou você loga — nunca os dois** para o mesmo erro (não logue e re-lance).

## Validação (é outra coisa, e vem antes)
- O **formato** da entrada é validado na borda, com schema (Zod/Pydantic), antes de qualquer regra.
- A **regra de negócio** é checada dentro do serviço, com `if`, e falha com um erro estruturado.
- Erro de formato e erro de regra são coisas diferentes, em camadas diferentes.

## Nunca
- Nunca `throw new Error("string")` cru.
- Nunca devolva stack, `cause` ou `context` para o cliente.
- Nunca ponha dado pessoal na mensagem, no `code` ou no log.
- Nunca deixe `console.log` no código que vai rodar.
