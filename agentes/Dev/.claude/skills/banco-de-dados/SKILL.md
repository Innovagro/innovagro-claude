---
name: banco-de-dados
description: Como guardar dados no padrão da casa — SQLite local (degraus 1 e 2) com camada de dados isolada, colunas explícitas, idempotência e backup datado. Use para "banco de dados", "guardar dados", "sqlite", "criar tabela", "salvar registro", "consulta", "backup do banco", "modelar os dados".
---

# Banco de dados

Nos degraus 1 e 2 o banco é **SQLite** — um arquivo `.db` na pasta do projeto, sem nuvem, sem
instalar servidor. No degrau 3 vira Supabase (Postgres), mas os princípios são os mesmos.

## Onde o banco mora (regra dura)
- O `.db`/`.sqlite` fica **sempre** em `codespace\Dev\<projeto>\dados\`.
- **NUNCA** no `Meu-Cerebro`/OneDrive: banco sincronizado **corrompe** (o sync escreve no meio de uma
  transação). O Claudinn bloqueia criar `.db` ali — e está certo.
- Backup: gere uma **cópia datada** com a data no nome, pro OneDrive, como arquivo novo:
  ```powershell
  & "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\sqlite3.exe" "dados\app.db" "VACUUM INTO 'C:\...\OneDrive - Innovagro\Meu-Cerebro\backups\backup-2026-09-13.db'"
  ```
  Nunca sincronize o `.db` de trabalho; só a cópia datada.

## Qual ferramenta
- **Degrau 1 (Python):** o `sqlite3` já vem no Python da casa. `import sqlite3` e pronto.
- **Degrau 2 (Next.js local):** use o **`node:sqlite`** que já vem no Node
  (`const { DatabaseSync } = require('node:sqlite')`). **NUNCA** `better-sqlite3` nem `sqlite3` do
  npm — eles compilam módulo nativo e quebram no Windows sem as Build Tools.
- **Conferir o banco na mão:** o `sqlite3.exe` da casa abre o arquivo (`.tables`, `.schema`, um
  `SELECT`) **sempre com `--safe`** — sem essa flag o CLI aceitaria `.shell`/`.system`, `ATTACH` e
  gravar em qualquer arquivo, e o Claudinn bloqueia. Com `--safe` a leitura funciona igual:
  ```powershell
  & "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\sqlite3.exe" --safe "dados\app.db" ".tables"
  ```

## A camada de dados é "burra" (o princípio que mais importa)
Quem fala com o banco só sabe consultar — nenhuma regra de negócio:
- **Colunas explícitas, nunca `SELECT *`** (o que muda no futuro não te surpreende).
- **Sempre um limite na listagem** (`LIMIT`), com paginação — nunca traga a tabela inteira.
- **Transação quando são 2+ escritas** juntas (ou tudo, ou nada).
- **Devolva vazio/`null` em vez de lançar erro** — a decisão de "não achou é um problema?" é do serviço.
- Parâmetros sempre **amarrados** (`?`), nunca texto concatenado na query (evita injeção e erro).

## Idempotência (não duplicar)
- Uma restrição **`UNIQUE`** na coluna certa é a última garantia contra criar duas vezes.
- Só gere/insira em operação de **escrita explícita** — nunca como efeito de um `SELECT`/GET.
- Criação de tabela que roda de novo sem quebrar: `CREATE TABLE IF NOT EXISTS`.

## Modelar
- Nomes de tabela e coluna no **idioma do domínio** (português), `snake_case`.
- Toda linha com uma chave própria e, quando fizer sentido, `criado_em`/`atualizado_em`.
- Para "apagar", prefira marcar `ativo = 0` (histórico é barato; perda não volta).

## Nunca
- Nunca guarde o `.db` no OneDrive/Meu-Cerebro.
- Nunca chame o `sqlite3.exe` sem `--safe` (fora o comando de backup datado).
- Nunca use `better-sqlite3`/`sqlite3` do npm.
- Nunca ponha regra de negócio na camada de dados.
- Nunca monte query com texto concatenado; use parâmetros.
