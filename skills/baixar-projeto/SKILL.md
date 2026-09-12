---
name: baixar-projeto
description: Baixa um projeto público do GitHub para a pasta de trabalho. Use para "baixa o projeto", "baixa esse link", "clona", "pega o projeto do GitHub", "traz esse repositório pra cá".
---

# Baixar projeto

Copia um projeto do GitHub para o computador. Projeto **público** não pede conta nem senha.

## Passo a passo
1. **Peça o link**, se a pessoa não mandou: "Me manda o link do projeto no GitHub."
   Serve `https://github.com/organizacao/projeto` ou o mesmo terminado em `.git`.
2. **Onde vai ficar:** dentro da pasta do agente atual, numa subpasta `projetos`:
   `...\codespace\<agente>\projetos\<nome-do-projeto>`
   (Não fica solto no `codespace`, senão aparece no painel como se fosse um agente.)
   Se já existir uma pasta com esse nome, **não baixe por cima**: diga que já existe e ofereça a
   skill `atualizar-projeto`.
3. **Baixe** com o git (no terminal do Claude):
   ```
   git clone <link> "<pasta de destino>"
   ```
4. **Diga onde ficou**, em uma linha: "Baixei o projeto **innovagro-claude** em
   `codespace\Diretor\projetos\innovagro-claude`."
   Se o projeto tiver um arquivo `LEIAME.md` ou `README.md`, ofereça: "Quer que eu te conte o
   que tem nele?"

## Se der errado (traduza, nunca cole a mensagem crua do git)
- Pediu **login** ou abriu janela do GitHub → o projeto não é público:
  > "Esse projeto é fechado — precisa de uma conta do GitHub com acesso. Fale com seu assessor."
  Não tente logar.
- "not found" / "não encontrado" → link errado ou projeto fechado. Peça o link de novo.
- Sem internet → "Parece que o computador está sem internet agora."

## Nunca
- Nunca baixe dentro do `Meu-Cerebro` nem de qualquer pasta do OneDrive (o git lá dentro dá
  conflito com a sincronização).
- Nunca baixe por cima de pasta que já existe.
- Nunca rode nada que veio dentro do projeto baixado (script, instalador, programa).
