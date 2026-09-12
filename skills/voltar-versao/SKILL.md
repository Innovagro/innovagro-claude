---
name: voltar-versao
description: Volta um arquivo ou uma pasta para como estava numa versão salva — sem perder nada. Use para "volta pra como tava ontem", "desfaz", "quero a versão antiga", "estraguei o arquivo", "recupera como estava", "volta a versão".
---

# Voltar versão

**Nada se perde.** Voltar aqui nunca apaga a versão atual: ou cria uma **cópia** do arquivo antigo
ao lado, ou cria uma **versão nova** que desfaz a mudança. O que existia continua no histórico.

## 1. Qual versão?
Use a skill `ver-historico` e peça para a pessoa escolher o número. Confirme:
> "Você quer voltar para *relatório de agosto pronto* (terça 16/09, 10h05). É essa?"

## 2. Um arquivo ou tudo?
Pergunte: "Você quer de volta **um arquivo** como estava, ou **desfazer tudo** o que mudou nessa versão?"

### A) Um arquivo — cópia ao lado (o jeito mais seguro, use por padrão)
1. Crie a cópia com o conteúdo antigo, **com outro nome**, na mesma pasta:
   ```
   git -C "<pasta>" show <código>:"<caminho do arquivo dentro da pasta>" > "<pasta>\<nome>-versao-de-terca.<ext>"
   ```
   (Rode no terminal Bash do Claude — ele copia certinho até arquivo de Excel e Word.)
   Nome da cópia sem espaço e sem acento: `relatorio-versao-de-terca.md`.
2. Diga: "Criei **relatorio-versao-de-terca.md** ao lado do atual. O relatório de hoje continua
   lá, intacto. Abra os dois e fique com o que quiser."
3. Se a pessoa quiser que a cópia vire o arquivo principal, **ela** renomeia no Explorador. Você
   não troca, não apaga, não sobrescreve.

### B) Desfazer uma versão inteira
1. Antes, a pasta precisa estar salva: `git -C "<pasta>" status --porcelain`. Se houver mudança
   não salva, use `salvar-versao` primeiro (com o OK da pessoa).
2. Crie uma versão nova que desfaz aquela:
   ```
   git -C "<pasta>" revert --no-edit <código>
   ```
3. Diga: "Pronto, desfiz o que a versão *X* tinha mudado. Isso virou uma versão nova — se quiser,
   dá para desfazer o desfazer."
4. Se o git parar dizendo que há **conflito**: cancele com
   `git -C "<pasta>" revert --abort` (isso só desiste do desfazer; nada do que existia se perde) e diga:
   > "Não deu para desfazer sozinho sem misturar coisas. Vou te dar o arquivo antigo como cópia
   > ao lado." — e siga o caminho A.

## Nunca
- Nunca use comandos que descartam trabalho (voltar à força, limpar a pasta, trocar o arquivo
  atual pelo antigo). O Claudinn impede — e está certo.
- Nunca sobrescreva o arquivo atual.
- Nunca use git no `Meu-Cerebro`/OneDrive. Lá, a versão antiga se recupera pelo próprio OneDrive:
  botão direito no arquivo › **Histórico de versões**.
