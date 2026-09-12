---
name: ver-historico
description: Mostra as versões salvas de uma pasta ou arquivo, em português, com dia e hora. Use para "mostra o histórico", "quais versões eu tenho", "o que mudou", "quando eu salvei", "log".
---

# Ver histórico

## Passo a passo
1. **Qual pasta ou arquivo?** Normalmente a pasta atual ou um projeto em `projetos\`.
2. **Leia as versões** (as 15 últimas):
   ```
   git -C "<pasta>" log -n 15 --date=iso --pretty=format:"%h|%ad|%an|%s"
   ```
   Só de um arquivo: acrescente `-- "<arquivo>"` no fim.
3. **Mostre em português**, uma linha por versão, da mais nova para a mais antiga:
   ```
   1. hoje, 14h32 — antes de mexer no relatório de agosto
   2. terça 16/09, 10h05 — relatório de agosto pronto
   3. segunda 15/09, 17h40 — primeira versão
   ```
   - Troque a data técnica por "hoje", "ontem", dia da semana + dd/mm, e hora em "14h32".
   - Mostre o nome de quem salvou só se houver mais de uma pessoa no histórico.
   - **Não mostre** o código da versão (`a1b2c3d`) — guarde para você, caso a pessoa queira voltar.
4. Ofereça, em uma linha: "Quer ver o que mudou em alguma delas, ou voltar para uma? É só dizer o número."
   - "O que mudou": `git -C "<pasta>" show --stat <código>` e explique quais arquivos mudaram
     e, se for texto, o que mudou em 2 ou 3 linhas.
   - "Voltar": skill `voltar-versao`.

Se a pasta não tiver versões: "Essa pasta ainda não tem versões salvas. Quer salvar a primeira
agora?" (skill `salvar-versao`).

## Nunca
- Nunca cole a saída crua do git.
- Nunca mude nada aqui — esta skill só olha.
