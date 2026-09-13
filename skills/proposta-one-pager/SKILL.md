---
name: proposta-one-pager
description: Monta uma proposta comercial de uma página, em PDF no padrão da casa, a partir de poucas informações (cliente, problema, solução, entregáveis, prazo, preço). Use para "faz uma proposta", "proposta comercial", "one-pager", "orçamento pro cliente", "manda uma proposta", "monta a proposta desse cliente".
---

# Proposta one-pager

Proposta boa cabe em **uma página** e faz o cliente pensar "é exatamente o meu problema". Benefício
primeiro, detalhe técnico depois (ou nunca).

## 1. Uma pergunta só (pré-preenchida)
Mande **uma mensagem** com o que já souber preenchido e peça pra completar:
```
Vou montar a proposta. Confirma/completa:
- Quem vende (você): ...
- Cliente: ...
- Título: ...
- Situação hoje (a dor, 2 linhas): ...
- O que está sendo contratado AGORA: ...
- Entregáveis (3 a 5): ...
- Prazo / cronograma: ...
- Investimento e condições: ...
- O que NÃO está incluído: ...
- O que precisamos do cliente: ...
- Validade (padrão 15 dias): ...
```
Se a pessoa já tem material (e-mail do cliente, notas de reunião), leia antes e preencha mais.

## 2. Escrever o miolo em HTML simples
Grave em `...\codespace\<agente>\rascunhos\AAAA-MM-DD-proposta-<cliente>.html`, nesta ordem, só com as
tags que a ferramenta da casa aceita (`h1`, `p class="sub"`, `h2`, `p`, `ul/li`, `table`, `div class="destaque"`, `b`):
```html
<h1>Proposta — <título></h1>
<p class="sub"><cliente> · <data> · válida até <data></p>
<h2>O contexto</h2>
<p>A dor do cliente, nas palavras dele. 2 a 3 frases.</p>
<h2>O que vamos fazer</h2>
<div class="destaque"><b>Em <prazo>, vocês terão <resultado>.</b></div>
<h2>Entregáveis</h2>
<ul><li><b>Nome curto</b> — 1 linha do que é.</li></ul>
<h2>Como trabalhamos</h2>
<table><tr><th>Etapa</th><th>Quando</th></tr><tr><td>...</td><td>Semana 1</td></tr></table>
<h2>Investimento</h2>
<p>Valor e condições — só da etapa contratada agora.</p>
<h2>Fora do escopo · O que precisamos de vocês</h2>
<ul><li>...</li></ul>
<h2>Próximo passo</h2>
<p><b>Responder este e-mail com o aceite até DD/MM.</b></p>
```
Campo sem informação: escreva `[COMPLETAR]` — não invente. **Não** ponha logo nem CSS (a ferramenta põe o layout da casa).

## 3. Gerar o PDF (padrão Innovagro)
```powershell
& "$env:LOCALAPPDATA\Programs\Claudinn\node\node.exe" "$env:LOCALAPPDATA\Programs\Claudinn\ferramentas\gerar-pdf.mjs" "C:\...\rascunhos\2026-09-13-proposta-cliente.html" "C:\...\propostas\2026-09-13-proposta-cliente.pdf"
```
Diga onde ficou. Para mandar, use a skill `email` (anexo, rascunho, só envia com OK).

## Regras
- Números exatos; **nunca** invente preço, prazo ou case. Sem informação = `[COMPLETAR]`.
- Tom confiante, sem superlativo vazio ("solução inovadora de ponta").
- Se passar de uma página impressa, corte texto — não reduza a fonte.

## Nunca
- Nunca mande a proposta sem a pessoa revisar o preço e o escopo (skill `conferir` nos números).
- Nunca sobrescreva uma proposta anterior — arquivo novo com `-v2`.
