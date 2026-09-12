---
name: criar-tela
description: Arquitetura de projetos Next.js (App Router) no padrão da casa — organização de pastas, route groups (list)/(write)/[uuid], onde cada componente mora. Para quem desenvolve na Innovagro (IT). Use para "estrutura next", "organizar o next", "onde ponho esse componente", "arquitetura do projeto", "route group", "novo projeto next".
---

# Arquitetura Next.js — padrão Innovagro

Esta skill é para quem **desenvolve** (área de IT), não para o uso do dia a dia. Ela define como um
projeto Next.js App Router é organizado na casa, para todo projeto ficar igual e qualquer pessoa se
achar nele.

## Contexto da casa (o viés)
- **Windows.** O terminal é o **PowerShell** — nunca bash. Comandos de exemplo aqui são PowerShell.
- **Next.js App Router** nos degraus 2 (local, com SQLite) e 3 (produção, com Supabase). Esta skill é
  a arquitetura das telas/pastas — vale nos dois. Banco: skill `banco-de-dados`. Publicar: `rodar-e-publicar`.
- **Contas são sempre da Innovagro** (Vercel, Supabase, GitHub da organização) — nunca conta pessoal.
- **Segredo mora só em `.env.local`**, que **nunca** vai para o git (já está no `.gitignore`). Chave
  de Supabase, connection string e afins: só ali. Nunca em código, nunca em `.env` versionado.
- **Deploy é pelo Vercel ligado ao repositório**: um push na branch abre o preview, o merge publica.
  Não se instala CLI de deploy na máquina nem se roda deploy à mão.
- O projeto vive na pasta de trabalho (`claude\codespace\<projeto>`), nunca no OneDrive.

## 1. Convenções do App Router
```
Arquivo         O que é
page.tsx        rota pública (a página)
layout.tsx      layout compartilhado (persiste entre navegações)
loading.tsx     UI de carregamento (Suspense automático)
error.tsx       captura de erro do segmento
route.ts        endpoint de API (GET/POST/PUT/DELETE)

Pasta           Significado
(pasta)         route group — agrupa sem mudar a URL
[pasta]         segmento dinâmico — /clientes/[id]
_pasta          pasta privada — fora do roteamento (componentes locais)
```

## 2. Estrutura raiz
```
src/
├── app/
│   ├── layout.tsx  page.tsx  loading.tsx  error.tsx  not-found.tsx
│   ├── (pages)/
│   │   ├── (authenticated)/        # requer login (layout com nav)
│   │   │   ├── home/page.tsx
│   │   │   └── <recurso>/          # uma feature CRUD completa (ver seção 3)
│   │   ├── login/  register/       # páginas públicas
│   │   ├── api/webhooks/route.ts
│   │   └── ui/                     # UI e utilidades da app (components, hooks, contexts)
│   ├── components/ui/              # primitivos compartilhados (shadcn/ui)
│   ├── lib/utils.ts               # helpers puros
│   └── types/index.ts
```

## 3. O padrão principal: (list) / (write) / [uuid]
Cada feature CRUD é organizada por **intenção**, com route groups que não afetam a URL:
```
<recurso>/
├── (list)/        LISTAR   — página da lista, filtros, cards/tabela
│   ├── page.tsx  loading.tsx
│   ├── _components/   (UI só da listagem)
│   ├── _hooks/  _context/  _state/
├── (write)/       ESCREVER — criar e editar
│   ├── criar/page.tsx   editar/[id]/page.tsx
│   └── _components/  _hooks/  _helpers/
├── [uuid]/        LER      — detalhe de um registro
│   ├── page.tsx
│   └── _components/
└── home/          DASHBOARD (opcional) — KPIs da feature
```
Regra de ouro: **componente usado num lugar só fica em `_components/` ao lado de quem usa**
(colocation). Só sobe para `app/ui/components/` ou `components/ui/` quando é usado por duas features.

## 4. Nomes
- Pastas e arquivos: **kebab-case** (`despesa-card.tsx`, `use-listar.ts`).
- Componente: PascalCase no código, kebab no arquivo. Hook: `use-...`. Context: `...-context.tsx`.
- Sem acento e sem espaço em nome de arquivo/pasta (regra da casa).

## 5. Começar um projeto (PowerShell, dentro do codespace)
```powershell
cd $env:USERPROFILE\claude\codespace\Dev
npx create-next-app@latest <projeto> --ts --app --eslint
cd <projeto>
```
No degrau 2 o banco é um `.db` local em `dados\` (skill `banco-de-dados`). Segredo, se houver, só em
`.env.local` (nunca no git). Rodar e publicar: skill `rodar-e-publicar`. Guarde versões com
`salvar-versao`.

## Nunca
- Nunca ponha segredo (chave, senha, connection string) em código ou em arquivo versionado — só `.env.local`.
- Nunca use conta pessoal de Vercel/Supabase/GitHub — sempre a da Innovagro.
- Nunca rode deploy pela máquina; o Vercel publica pelo git.
- Nunca use comando de bash; aqui é PowerShell.
- Nunca crie o projeto fora do `codespace`.
