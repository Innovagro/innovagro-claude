---
name: atualizar-projeto
description: Traz as novidades de um projeto que já foi baixado do GitHub. Use para "atualiza o projeto", "baixa as novidades", "puxa a versão nova", "tem coisa nova no projeto?", "pull".
---

# Atualizar projeto

Traz o que mudou no GitHub para a cópia que está no computador — **sem atropelar** nada que a
pessoa mexeu.

## Passo a passo
1. **Qual projeto?** Se a pasta atual não é um projeto baixado, pergunte qual (procure em
   `...\codespace\<agente>\projetos\`).
2. **A pessoa mexeu em algo?** Veja o estado:
   ```
   git -C "<pasta do projeto>" status --porcelain
   ```
   - Se aparecer qualquer arquivo → **pare** e avise:
     > "Você mexeu em 3 arquivos aqui (relatorio.md, ...). Se eu atualizar agora, pode misturar
     > com o que você fez. Quer que eu **salve uma versão** antes? (skill `salvar-versao`)"
     Só siga depois que estiver tudo salvo.
3. **Atualize, só se não houver risco:**
   ```
   git -C "<pasta do projeto>" pull --ff-only
   ```
   `--ff-only` quer dizer: só atualiza se der para encaixar sem misturar nada. Se não der, o git
   recusa sozinho e nada se perde.
4. **Conte o que veio**, em português: "Atualizei. Vieram 4 novidades — a última é *melhora a
   skill de ata*." (Use a skill `ver-historico` se a pessoa quiser detalhes.)
   Se já estava em dia: "Já estava tudo atualizado."

## Se o git recusar (traduza, nunca cole a mensagem crua)
- Recusou porque tem versão local que o GitHub não tem → **pare**:
  > "Você tem versões salvas aqui que não estão no GitHub, e o GitHub tem novidades. Juntar as
  > duas coisas é com o seu assessor — não vou mexer para não perder nada."
  Use a skill `pedir-ajuda`.
- Pediu login → o projeto ficou fechado. "Fale com seu assessor."

## Nunca
- Nunca force a atualização, nunca descarte mudança local, nunca "resolva conflito" sozinho.
- Nunca use git dentro do `Meu-Cerebro` ou do OneDrive.
