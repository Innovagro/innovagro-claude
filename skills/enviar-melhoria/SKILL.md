---
name: enviar-melhoria
description: Envia uma melhoria feita num projeto de volta para o GitHub, para o responsável revisar. Precisa de conta no GitHub com acesso. Use para "envia a melhoria", "manda pro GitHub", "sobe o que eu fiz", "push", "abre um pedido de mudança".
---

# Enviar melhoria

Diferente de salvar versão, **isto sai do computador**: vai para o GitHub, onde outras pessoas
veem. Precisa de uma conta do GitHub com acesso ao projeto.

## 1. Tudo salvo?
`git -C "<pasta>" status --porcelain`. Se houver mudança não salva, use `salvar-versao` primeiro
(com o OK da pessoa).

## 2. Tem login?
Teste **sem abrir janela de login e sem mostrar senha** (no terminal Bash do Claude):
```
GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never git -C "<pasta>" push --dry-run origin HEAD
```
- Se falhar por **autenticação / permissão / login**: **pare** e diga só isto:
  > "Para enviar para o GitHub você precisa de uma conta com acesso a esse projeto. Fale com
  > seu assessor — ele te convida e te mostra como entrar."
  Não tente logar, não abra navegador, não peça senha.
- Se passar, siga.

## 3. Mostrar o que vai sair
Liste as versões que vão (skill `ver-historico`, só as que ainda não estão no GitHub) e pergunte:
> "Vou enviar estas 2 versões para o GitHub, num pedido de mudança para o responsável revisar.
> Posso?"
**Só com OK explícito.**

## 4. Enviar sem mexer no principal
1. Crie um caminho separado para a melhoria (nunca envie direto no principal):
   ```
   git -C "<pasta>" switch -c melhoria-AAAA-MM-DD-<assunto-curto>
   ```
2. Envie esse caminho:
   ```
   GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never git -C "<pasta>" push -u origin melhoria-AAAA-MM-DD-<assunto-curto>
   ```
3. O GitHub responde com um link de "pull request". Entregue para a pessoa:
   > "Enviado. Abra este link e clique em **Create pull request** — aí o responsável revisa:
   > {link}"

## Nunca
- Nunca envie para o caminho principal (`main`).
- Nunca force o envio.
- Nunca tente fazer login pela pessoa, nem peça senha ou código.
- Nunca envie arquivo de senha, chave, `.env` ou dado de cliente. Se aparecer na lista, pare e avise.
