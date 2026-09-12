---
name: ata-de-reuniao
description: Transforma a transcrição de uma reunião do Teams (ou anotações) em ata no Word com o logo e as cores da Innovagro — decisões, responsáveis e prazos. Use para "faz a ata", "ata da reunião", "resume a reunião", "o que ficou decidido", "ata da semanal", "tenho a transcrição", "pega a transcrição do Teams".
---

# Ata de reunião

Saída principal: **Word (.docx)** com logo e paleta da Innovagro, que abre no Office de qualquer
pessoa. PDF só se pedirem ("me manda em PDF também").

## 1. Pegar a transcrição
Pergunte de onde vem, se a pessoa não disse:
- **Direto do Teams** (se o conector com Teams estiver ligado):
  `list-online-meetings` ou a agenda (`get-calendar-view`) para achar a reunião →
  `list-meeting-transcripts` → `get-meeting-transcript-content`.
  Se a reunião não tiver transcrição, diga: "Essa reunião não foi transcrita no Teams. Se tiver
  anotações ou o arquivo, me passa."
- **Arquivo** que a pessoa indicar (`.vtt`, `.txt`, `.pdf`: leia direto; `.docx`: ferramenta
  `ler-documento`, abaixo). Não varra o OneDrive procurando — pergunte o caminho.
- **Texto colado** ou **anotações** no chat.

Ler um `.docx`:
```powershell
& "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\ler-documento.mjs" "C:\...\transcricao.docx"
```

## 2. Entender (as regras que fazem a ata prestar)
- **Decisão** é só o que foi decidido de fato ("ficou decidido", "vamos fazer", "fechado").
  Ideia solta ou opinião vai em **Pontos sem conclusão**.
- **Encaminhamento** = o quê + responsável + prazo. **Nunca invente** responsável ou prazo:
  escreva `(não definido)` — é exatamente o que a pessoa precisa enxergar.
- Trecho confuso → `(confirmar)`. Número, data e nome: copie como foram ditos.
- Sem juízo sobre as pessoas ("fulano resistiu"). Só fatos.

## 3. Mostrar antes de gerar
Mostre a ata no chat, curta, e pergunte: "Quer mudar algo antes de eu gerar o Word?"

## 4. Gerar o Word
Grave a especificação como arquivo novo em `...\codespace\<agente>\rascunhos\AAAA-MM-DD-ata-<reuniao>.json`:
```json
{ "titulo": "Ata — Reunião semanal da área",
  "subtitulo": "Sexta-feira, 12/09/2026 · 9h às 10h · Teams",
  "rodape": "Ata gerada com o Claude — revise antes de enviar",
  "blocos": [
    {"tipo": "campos", "itens": [["Presentes", "..."], ["Ausentes", "..."], ["Fonte", "Transcrição do Teams"]]},
    {"tipo": "secao", "texto": "Decisões tomadas"},
    {"tipo": "lista", "itens": ["..."]},
    {"tipo": "secao", "texto": "Encaminhamentos"},
    {"tipo": "tabela", "colunas": ["O quê", "Responsável", "Prazo"], "linhas": [["...", "...", "(não definido)"]]},
    {"tipo": "secao", "texto": "Pontos sem conclusão"},
    {"tipo": "lista", "itens": ["..."]} ] }
```
Seção sem conteúdo? Escreva uma linha `"(nenhum)"` em vez de apagar a seção — a ata tem sempre as 3.

Rode:
```powershell
& "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\criar-documento.mjs" "C:\...\rascunhos\2026-09-12-ata-semanal.json" "C:\...\atas\2026-09-12-ata-semanal.docx"
```
Diga onde ficou: "Ata pronta: `atas\2026-09-12-ata-semanal.docx` — abre no Word."

## 5. Depois (ofereça, não faça sozinho)
- "Quer em PDF também?" → skill `relatorio-pdf` (mesmo conteúdo em HTML simples).
- "Quer que eu prepare um e-mail com a ata para os presentes?" → skill `email` (rascunho + OK).

## Nunca
- Nunca envie a ata sem a skill `email` e o OK.
- Nunca altere, mova ou apague a transcrição original.
- Nunca sobrescreva uma ata que já existe — nova versão ganha `-v2` no nome.
