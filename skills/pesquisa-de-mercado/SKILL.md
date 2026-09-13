---
name: pesquisa-de-mercado
description: Pesquisa na internet mercado, concorrentes, preços e tendências e entrega um relatório com as fontes (link) e a data de cada informação. Use para "pesquisa o mercado de", "quem são os concorrentes", "quanto os concorrentes cobram", "tendências do setor", "benchmark", "tamanho de mercado".
---

# Pesquisa de mercado com fontes

Regra de ouro: **toda afirmação tem link.** Sem fonte, não entra — ou entra marcada como hipótese.

## 1. Escopo (confirme numa mensagem, se não estiver claro)
- **A pergunta**: o que a pessoa quer decidir (entrar num mercado, precificar, escolher fornecedor)?
- **Recorte**: país/região (padrão Brasil), segmento, porte de cliente.
- **Profundidade**: rápida (5 a 8 fontes, ~1 página) ou completa (15+ fontes).

## 2. Pesquisar
- Use a busca na web e leia as páginas. Faça várias buscas, com termos diferentes, em português e inglês.
- Fontes por ordem de confiança: **dados oficiais** (IBGE, Banco Central, agências, relatórios de empresas
  abertas) > associações do setor e consultorias > imprensa especializada > site dos próprios
  concorrentes (bom pra preço/oferta, parcial no resto) > blogs.
- Anote a **data** de cada dado. Dado com mais de 2 anos: avise que pode estar velho.
- Preço: prefira a página oficial de preços. Se for "sob consulta", diga isso.

## 3. Relatório
Grave em `...\codespace\<agente>\rascunhos\AAAA-MM-DD-pesquisa-<tema>.md`:
```markdown
# Pesquisa: <tema>
Data da pesquisa: <data> · Recorte: <região/segmento>

## Resposta em 5 linhas
...
## Mercado
- Tamanho / crescimento: ... [fonte](link) (ano do dado)
## Concorrentes
| Empresa | Oferta | Preço | Público | Diferencial | Fonte |
## Tendências e sinais
- ... [fonte](link)
## Oportunidades e riscos
- ...
## O que não encontrei / baixa confiança
- ...
## Fontes
1. <título> — <link> — acessado em <data>
```

## Regras
- Separe **fato (com fonte)** de **análise sua**.
- Números que conflitam entre fontes: mostre os dois e diga qual parece mais confiável e por quê.
- Termine com 3 perguntas que valeria aprofundar.

## Se der errado
- **A busca não funciona** (nada volta, erro de conexão): quase sempre é **sem internet ou o proxy
  da empresa barrando** — é erro de rede, **fale com o TI** (skill `pedir-ajuda`). Enquanto isso,
  ofereça trabalhar só com o material que a pessoa fornecer, deixando claro que ficou sem a web.

## Nunca
- Nunca invente empresa, número ou link. Link que você não abriu **não entra**.
- Nunca entregue um dado sem a data e a fonte dele.
