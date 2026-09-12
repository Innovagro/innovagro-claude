---
name: arquitetura
description: A skill-mestra do desenvolvimento — decide o degrau (ferramenta pessoal / app local / produção), as camadas do código e para qual outra skill ir. Use para "por onde começo", "como estruturo isso", "que arquitetura", "novo projeto", "novo app", "quero construir", "isso vira app?".
---

# Arquitetura — por onde começar

Comece **sempre** por aqui num trabalho novo. Esta skill decide o **degrau**, monta o esqueleto em
camadas e roteia para a skill de cada parte.

## 1. Qual degrau? (escolha o menor que resolve)
Pergunte o que a pessoa precisa e enquadre:
- **Degrau 1 — ferramenta pessoal.** Só ela, no computador dela, sem tela bonita. → Python (pacotes
  via `uv`) + saída em Excel/Word. É o mais rápido. (skill `banco-de-dados`.)
- **Degrau 2 — app fullstack local (a receita padrão da casa).** Precisa de **tela**, várias telas,
  abre no navegador — mas ainda é só na máquina dela. → **Next.js (App Router, TypeScript) + PGlite**
  (Postgres de verdade no arquivo, `dados\pg`). Uma tela + API no mesmo projeto, um `npm run dev`
  (`npm run build` para conferir). Simples, **sem drizzle** nem outra camada pesada. (skills
  `criar-tela`, `criar-api`, `banco-de-dados`.)
- **Degrau 3 — produção.** Precisa ser **compartilhado**, ter **login**, abrir no **celular**. →
  Next.js + Supabase + Vercel. **Isso é do time: chame a IT (skill `pedir-ajuda`).** Não vire sozinho
  do 2 para o 3.
Diga em uma frase em que degrau estão e o que levaria ao próximo:
> "Isso resolve como ferramenta pessoal (degrau 1). Se um dia outra pessoa precisar usar, aí vira app
> e a gente sobe o degrau."

## 2. As camadas (valem nos três degraus)
Todo código flui numa direção só, cada camada conhecendo só a de baixo:
```
entrada (rota / tela / menu)   → autentica, valida o formato, chama UM serviço, monta a resposta
   ↓
serviço (a regra de negócio)   → os ifs da regra; nada de web; identidade vem por parâmetro
   ↓
dados (o banco)                → só consulta: colunas explícitas, limite, transação; zero regra
```
- Degrau 1: `menu/função → serviço → módulo de dados` (funções sobre os dados: Excel/CSV/JSON).
- Degrau 2/3: `rota → use-case → repositório`.
Nunca misture: regra na borda, ou consulta ao banco no meio da tela, é o que apodrece o projeto.

## 3. Esqueleto inicial (na `codespace`, nunca no OneDrive)
```
codespace\Dev\<projeto>\
├── (degrau 1)  app.py  ·  saida.xlsx  ·  README.md
└── (degrau 2)  src\app\...  ·  src\lib\...  ·  dados\pg\ (PGlite)  ·  .env.local (fora do git)
```

## 4. Roteie
- Endpoint / API → `criar-api`
- Tela, componente, rota do Next → `criar-tela`
- Banco, tabela, consulta, backup → `banco-de-dados`
- Erro, log, validação → `tratar-erros`
- Provar que funciona → `testar`
- Deu erro → `depurar`
- Rodar local ou publicar → `rodar-e-publicar`

## Regras
- Windows/PowerShell, contas da Innovagro, segredo só em `.env.local`. (Estão em `casa\REGRAS.md`.)
- **Python é só com `uv`** (o Python da casa não tem `pip`): baixe o `uv.exe` para
  `%LOCALAPPDATA%\Programs\uv` e use `uv venv` + `uv pip install`.
- Confirme o degrau com a pessoa **antes** de começar a codar. Mostrar o esqueleto e o plano primeiro.
