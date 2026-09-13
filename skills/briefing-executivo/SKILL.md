---
name: briefing-executivo
description: Lê um documento longo (ou vários) e resume numa página só o que a pessoa precisa para decidir — o essencial, números-chave, prazos, riscos e as decisões. Use para "resume esse documento", "briefing", "resumo executivo", "o que eu preciso saber desse relatório", "lê esse PDF pra mim", "me prepara pra ler isso".
---

# Briefing executivo

Quem lê um briefing tem 3 minutos e uma decisão para tomar. Escreva para essa pessoa: o essencial
primeiro, uma página só.

## 1. Confirme o alvo (só se não for óbvio)
- **Para quem** é o briefing (a própria pessoa, o diretor, o conselho, um cliente)?
- **Para quê** — decidir algo, preparar uma reunião, ou entender um tema?

## 2. Ler o material
- PDF: leia direto. Documento grande: leia por partes e anote antes de escrever.
- Word: use a skill `consultar-documentos` (ela abre com a ferramenta da casa, sem precisar do Office).
- Vários arquivos: liste o que vai ler, leia todos, e aponte contradições entre eles.
- Anote a **página ou seção** de cada ponto importante — vai citar depois.
- Não achou o arquivo ou não abre? Skill `pedir-ajuda`.

## 3. Escrever (uma página)
Grave como arquivo novo em `...\codespace\<agente>\rascunhos\AAAA-MM-DD-briefing-<tema>.md`:
```markdown
# Briefing: <título do documento>
Para: <leitor> · Fonte: <arquivo(s)> · <data>

## Em uma frase
<a mensagem principal>

## O essencial (no máximo 5 pontos)
1. ... (p. X)

## Números-chave
| Item | Valor | Onde |

## Prazos e obrigações
- <data> — <o quê> (p. X)

## Riscos / pontos de atenção
- ...

## Decisões ou ações para você
- [ ] ...

## O que o documento NÃO diz (lacunas)
- ...
```
Mostre no chat e diga onde salvou. Se tiver número, passe a skill `conferir` antes de entregar.
Ofereça: "Quer que eu vire isso num PDF pra mandar (skill `relatorio-pdf`) ou responda perguntas do documento?"

## Regras
- Todo ponto com referência de página/seção. Nada que não esteja no documento.
- Opinião sua entra marcada como **Análise:** — separada do que o documento diz.
- Troque o jargão por português claro; termo técnico essencial, explique em meia frase.

## Nunca
- Nunca invente número, prazo ou conclusão que não esteja na fonte.
- Nunca entregue como "o documento diz" algo que é dedução sua.
