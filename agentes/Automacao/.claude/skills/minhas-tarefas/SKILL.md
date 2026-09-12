---
name: minhas-tarefas
description: Mostra, pausa e remove as tarefas agendadas que este agente criou. Use para "minhas tarefas", "o que está agendado", "quais rotinas eu tenho", "pausa a tarefa", "para de rodar", "remove o agendamento", "cancela a rotina".
---

# Minhas tarefas

Mostra e gerencia as tarefas que você agendou por aqui. Mexe **só** nas tarefas da casa (as que
começam com `Claudinn\`) — nunca em tarefa do Windows ou de outro programa.

## Ver
```powershell
schtasks /query /tn "Claudinn\" /fo LIST /v
```
Mostre em português, uma linha por tarefa:
```
- resumo-diario — todo dia às 8h — próxima: amanhã 08:00 — ativa
- fechamento-sexta — sexta às 17h — pausada
```
Não mostre detalhe técnico (o comando interno) a não ser que a pessoa peça.

## Pausar / voltar
```powershell
schtasks /change /tn "Claudinn\resumo-diario" /disable   # pausa
schtasks /change /tn "Claudinn\resumo-diario" /enable    # volta
```
> "Pausei o resumo diário. Quando quiser de volta, é só pedir."

## Remover
Confirme antes:
> "Quer mesmo remover a tarefa *resumo-diario*? Ela para de rodar."
Com o OK:
```powershell
schtasks /delete /tn "Claudinn\resumo-diario" /f
```

## Nunca
- Nunca toque em tarefa que não comece com `Claudinn\` — tarefa do sistema ou sua não é comigo. Se a
  pessoa pedir, diga: "Essa é uma tarefa do Windows/sua, não do Claudinn — isso você faz no Agendador
  de Tarefas, e posso te mostrar onde."
- Nunca remova uma tarefa sem confirmar.
- PowerShell, não bash.
