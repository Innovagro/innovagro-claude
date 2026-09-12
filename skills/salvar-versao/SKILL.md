---
name: salvar-versao
description: Salva uma "foto" de como os arquivos estão agora, com uma frase que a pessoa entende, para poder voltar depois. Não precisa de conta nem de internet. Use para "salva uma versão", "guarda como está", "marca esse ponto", "antes de eu mexer, salva", "commit".
---

# Salvar versão

Tira uma foto da pasta como ela está agora. Depois dá para ver o histórico e voltar. Fica só no
computador: **não precisa de conta, nem de internet, nem envia nada para ninguém.**

## Onde pode
Só dentro da pasta de trabalho (`...\codespace\...`).
Se a pasta atual estiver dentro do `Meu-Cerebro` ou do OneDrive, **não faça**:
> "Aqui não precisa: o OneDrive já guarda as versões antigas sozinho (clique com o botão direito
> no arquivo › Histórico de versões)."

## Passo a passo
1. **Qual pasta?** A do projeto em que a pessoa está trabalhando (normalmente a pasta atual ou
   um projeto em `projetos\`).
2. **É a primeira vez nessa pasta?** Veja se já é uma pasta com versões:
   ```
   git -C "<pasta>" status
   ```
   Se o git disser que não é, prepare a pasta (uma vez só):
   ```
   git init "<pasta>"
   ```
3. **Quem está salvando** (uma vez por pasta — use o nome e o e-mail do QUEM SOU):
   ```
   git -C "<pasta>" config user.name "<nome>"
   git -C "<pasta>" config user.email "<email>"
   ```
4. **O que mudou?** `git -C "<pasta>" status --porcelain`. Se nada mudou: "Não tem nada novo
   para salvar desde a última versão." e pare.
   Se mudou, diga quais arquivos, em uma linha.
5. **A frase da versão:** peça ou sugira uma que a pessoa entenda daqui a um mês:
   > "Que nome dou para essa versão? Sugestão: *antes de mexer no relatório de agosto*."
6. **Salve:**
   ```
   git -C "<pasta>" add -A
   git -C "<pasta>" commit -m "<frase da pessoa>"
   ```
7. **Confirme:** "Versão salva: *antes de mexer no relatório de agosto* (sexta, 14h32)."

## Traduza sempre
Nunca cole a saída do git. Diga o que aconteceu em uma frase.

## Nunca
- Nunca use git no `Meu-Cerebro` ou no OneDrive.
- Nunca envie a versão para o GitHub aqui — isso é a skill `enviar-melhoria`.
- Nunca salve arquivo de senha ou chave (se aparecer `.env`, `.key`, `.pem` na lista, pare e avise).
