---
name: agendar-tarefa
description: Cria uma tarefa recorrente que roda sozinha na máquina (ex.: todo dia às 8h) usando o Agendador de Tarefas do Windows. Use para "agenda", "todo dia às", "toda semana", "roda sozinho", "automatiza isso", "agendar tarefa", "rotina diária".
---

# Agendar tarefa

Cria uma tarefa que se repete sozinha **na máquina da pessoa** (Agendador de Tarefas do Windows),
rodando o Claude da casa na pasta deste agente. Segue a regra da casa: só o Claude da casa pode ser
agendado, e o que roda sozinho **não envia nada** — prepara e para.

## 1. Entenda a tarefa
- O que ela faz? (ex.: "resumir minha caixa de entrada")
- Com que frequência e a que hora? (todo dia 8h; toda segunda; etc.)
- Onde deixa o resultado? Sempre um **arquivo** na pasta do agente
  (`codespace\Automacao\saida\`), para você conferir e, se for o caso, enviar depois.
Confirme em uma frase antes de criar.

## 2. Escreva a instrução
A instrução é o que o Claude vai fazer sozinho. Ela **termina gravando um rascunho em arquivo** —
nunca enviando. Exemplo:
> "Resuma os e-mails que chegaram desde ontem 17h e salve em
> `codespace\Automacao\saida\AAAA-MM-DD-resumo.md`. Não envie nada."

## 3. Crie a tarefa (a forma EXATA que o Claudinn aceita)
No PowerShell, o nome **começa com `Claudinn\`** e a ação é o Claude da casa com `-p` e
`--permission-mode dontAsk`:
```powershell
schtasks /create /tn "Claudinn\resumo-diario" `
  /tr "claude -p --permission-mode dontAsk \"resuma minha caixa e salve em codespace\Automacao\saida\resumo-de-hoje.md; nao envie nada\"" `
  /sc daily /st 08:00
```
- **`-p`** (roda e termina) e **`--permission-mode dontAsk`** são obrigatórios.
- **Nunca** `--bare` (desliga a proteção: hooks, MCP, skills).
- Crie tarefa **só** nessa forma. Não agende um script, outro programa, ou o Claude sem essas
  condições — uma tarefa agendada roda fora da sua sessão.

## 4. Confirme
> "Pronto: todo dia às 8h eu preparo o resumo e deixo em `saida\`. Você abre, confere e, se quiser
> enviar, é com você — eu não mando nada sozinho."
Ofereça ver as tarefas ativas (skill `minhas-tarefas`).

## Nunca
- Nunca agende nada que não seja o Claude da casa (nada de `.ps1`, `.bat`, `.py`, outro `.exe`).
- Nunca use `--bare`.
- Nunca faça a tarefa **enviar** e-mail/Teams sozinha — ela prepara o rascunho; o envio é seu.
- Nunca crie tarefa fora da `codespace` nem com nome sem o prefixo `Claudinn\`.
