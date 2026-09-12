---
name: rodar-e-publicar
description: Rodar o app na máquina (degraus 1 e 2) e, no degrau 3, publicar pela Vercel. Use para "rodar o app", "abrir no navegador", "npm run dev", "build", "publicar", "deploy", "colocar no ar", "subir pra produção".
---

# Rodar e publicar

O jeito de ver o app funcionando muda com o degrau. Nos degraus 1 e 2 tudo roda **na máquina da
pessoa**, sem nuvem. O degrau 3 (nuvem) é do time.

## Degrau 1 — ferramenta pessoal (Python)
```powershell
& "<caminho do python da casa (está no CLAUDE.md, {{PYTHON}})>" "app.py"
```
Roda no terminal. A saída para a pessoa é Excel/Word (skills `criar-excel`/`criar-documento`) ou o
próprio menu de texto.

## Degrau 2 — app local (Next.js na máquina)
1. **Durante o desenvolvimento**, com recarregamento automático:
   ```powershell
   cd $env:USERPROFILE\claude\codespace\Dev\<projeto>
   npm run dev
   ```
   Abra `http://localhost:3000` no navegador.
2. **Versão "de verdade" local** (mais rápida, para usar no dia a dia):
   ```powershell
   npm run build
   npm run start
   ```
   Continua só na máquina dela — o banco é o `.db` em `dados\`. Ninguém de fora acessa.
3. Faça um **atalho** na área de trabalho que abre o navegador no endereço local, para a pessoa não
   precisar do terminal toda vez. (Ofereça; não crie nada fora da pasta sem avisar.)

Diga com clareza: **isto roda só no computador dela.** Se outra pessoa precisar usar, ou tiver que
abrir no celular, é o degrau 3.

## Degrau 3 — produção (Vercel + Supabase) — É DO TIME
Não faça sozinho. Deixe documentado e chame a IT (skill `pedir-ajuda`). O caminho, para referência:
- Repositório no GitHub **da Innovagro**, ligado à **Vercel da Innovagro** (Import Project).
- Deploy é automático pelo git: **push abre um preview, merge publica**. Não se roda deploy à mão nem
  se instala CLI de deploy.
- Banco vira **Supabase** (as chaves só em `.env.local` e nas variáveis do projeto na Vercel — nunca
  no git).
- Frase para a pessoa: *"Para virar um sistema que outras pessoas usam, a gente sobe para a Vercel com
  o time — te ajudo a organizar o que já está pronto para essa conversa."*

## Nunca
- Nunca exponha o app local para fora da máquina na marra (nada de abrir porta/tunnel) — isso é o
  degrau 3, com o time.
- Nunca coloque chave/segredo no git; só em `.env.local`.
- Nunca use conta pessoal de Vercel/Supabase/GitHub.
- Nunca rode deploy pela máquina; no degrau 3 quem publica é a Vercel pelo git.
