---
name: planejamento-semanal
description: PRIORIZA a semana (ou o dia) a partir de uma lista de tarefas — decide o que fazer primeiro, o que delegar, adiar ou cortar, por impacto x esforço, e monta um plano com 3 prioridades e blocos de agenda. (Diferente de `planejar`, que DECOMPÕE um único pedido em passos.) Use para "organiza minha semana", "prioriza essas tarefas", "tenho muita coisa", "o que faço primeiro", "planejamento do dia".
---

# Planejamento semanal

Planejar é escolher o que **não** fazer. Plano bom tem poucas prioridades e espaço pro imprevisto.

> Quando usar esta e não a `planejar`: aqui você tem **muitas tarefas soltas** e precisa **priorizar**
> a semana. A `planejar` é pra quando há **um pedido só** e você precisa **quebrá-lo em passos**.

## 1. Coletar (uma mensagem, ou um arquivo que a pessoa indicar)
- Todas as tarefas e pendências, do jeito que vierem (pode ser bagunça).
- Compromissos fixos da semana (reuniões, viagens, entregas com data).
- A meta mais importante do mês/trimestre.
- Quantas horas por dia dá pra trabalho focado.
- Se houver um `plano-semana-<data>.md` anterior na pasta, leia e traga o que ficou pendente.

## 2. Classificar
Para cada tarefa, estime rápido: **impacto** (alto/médio/baixo), **esforço** (horas),
**prazo real**, **só você faz?** Depois separe:
| Grupo | Critério | Destino |
|---|---|---|
| Prioridades | impacto alto | agenda, primeiro horário do dia |
| Rápidas | < 15 min | um bloco único de "limpeza" |
| Delegar | outra pessoa faz 80% tão bem | mensagem de delegação pronta |
| Adiar | impacto baixo sem prazo | lista "depois" com data de revisão |
| Cortar | impacto baixo, ninguém sente falta | diga que dá pra cortar |

## 3. Entregar
Grave em `...\codespace\<agente>\rascunhos\AAAA-MM-DD-plano-semana.md`:
```markdown
# Semana de <data>
## As 3 prioridades (se só isso acontecer, a semana valeu)
1. ...
## Agenda sugerida
| Dia | Manhã (foco) | Tarde | Fixos |
## Bloco de rápidas
- [ ] ...
## Delegar (com mensagem pronta)
- <pessoa>: "<mensagem curta>"
## Adiar / cortar
- ...
## Riscos da semana
- ...
```
Mensagem de delegação que vá pra alguém: só sai por e-mail com OK (skill `email`).

## Regras
- No máximo **3 prioridades**. Se a pessoa insistir em 7, mostre a conta de horas que não fecha.
- Planeje só **60 a 70%** das horas disponíveis — o resto é imprevisto.
- Tarefa vaga vira próxima ação concreta ("Projeto X" → "Mandar e-mail pro Y pedindo Z").

## Nunca
- Nunca prometa que tudo cabe se não couber — mostre o corte.
- Nunca mande a mensagem de delegação sozinho — sempre com o OK da pessoa.
