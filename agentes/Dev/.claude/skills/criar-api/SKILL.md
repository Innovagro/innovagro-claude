---
name: criar-api
description: Cria um endpoint de API no padrão da casa — borda fina, validação na entrada, um serviço, resposta num envelope consistente. Use para "criar api", "novo endpoint", "rota de", "route.ts", "criar endpoint", "expor um serviço".
---

# Criar API

A rota é a **borda**: o único lugar que toca HTTP. Ela faz quatro coisas e para: autentica, valida o
**formato** da entrada, chama **um** serviço, monta a resposta. Nada mais.

## A regra dura
- **Zero regra de negócio na rota.** Se tem `if` de regra, ele mora no serviço (use-case), não aqui.
- **Zero acesso a banco na rota.** A rota nunca chama o banco/repositório direto — só o serviço.
- **Nunca monte resposta de erro na mão** (nada de `try/catch` para devolver 400/500): um wrapper de
  erro faz isso num lugar só (skill `tratar-erros`).

## Passo a passo (degrau 2/3, Next.js App Router)
1. **Valide o formato na entrada** com um schema (Zod), ao lado da rota (`types.ts`): defina o
   `Request` (entrada) e o `Response` (saída). Formato errado para aqui, antes de qualquer regra.
2. **Chame um serviço** passando os dados já validados e a identidade de quem chamou (por parâmetro,
   nunca "pego do ambiente").
3. **Responda no envelope**: sucesso `{ ok: true, data }`, falha `{ ok: false, error }`. Listagem
   sempre `{ items, total, page, limit, totalPages }`. O front desembrulha de um jeito só.
4. **Autorize**: cheque a permissão necessária de forma declarativa na rota; a checagem que depende do
   dado (é o dono? tem escopo?) vai dentro do serviço.

Exemplo do formato (esqueleto, sem framework específico de banco):
```ts
// entrada validada -> serviço -> envelope
const dados = Schema.parse(await req.json());        // formato
const resultado = await servico.executar(dados, usuario); // regra
return Response.json({ ok: true, data: resultado });  // envelope
```

## Degrau 1 (Python)
Mesma ideia sem HTTP: a "borda" é a função que recebe a entrada do menu/CLI, valida (Pydantic ou uma
checagem simples), chama o serviço e devolve o resultado. A regra fica no serviço, o `sqlite` fica na
camada de dados.

## Nunca
- Nunca ponha regra de negócio ou consulta ao banco na rota.
- Nunca devolva o erro cru (mensagem interna, stack) para o cliente — só `code` + mensagem estável.
- Nunca confie na entrada sem validar o formato na borda.
- Sem segredo em código; sem conta pessoal; PowerShell, não bash.
