---
name: testar
description: O que "pronto" significa na casa — o app real rodou o fluxo real, com build/lint/tipos verdes. Escreve teste do que importa. Use para "testar", "está pronto?", "escrever teste", "prova que funciona", "validar a feature", "terminei".
---

# Testar — o que "pronto" significa

Na casa, **"pronto" não é "o código compilou".** Pronto é:
1. o **app real rodou o fluxo real** e você **viu** funcionar (um print da tela ou da saída do
   terminal no caminho de verdade — não um mock devolvendo verde);
2. **build, lint e checagem de tipos** verdes;
3. nenhum erro no console/no log durante o fluxo.

Mock não é prova. Um teste que só confirma que o mock respondeu não prova que o app funciona.

## O que testar (o que importa, não tudo)
- **A regra de negócio** (o serviço/use-case): dá o resultado certo? recusa o inválido? Este é o teste
  que mais paga — a regra é onde mora o valor e o risco.
- **Os limites**: entrada vazia, número no lugar do texto, o registro que não existe, a permissão que
  falta. Erro esperado tem que virar erro estruturado, não uma exceção crua.
- **Idempotência**: rodar a mesma escrita duas vezes não duplica.
Não gaste teste em getter trivial nem em componente sem lógica.

## Como
- **Degrau 1 (Python):** rode o programa de ponta a ponta com um caso real e confira a saída/o banco.
  Se a lógica ficou grande, um teste com `pytest` no serviço.
- **Degrau 2/3 (Next):** rode `npm run build`, `npm run lint` e a checagem de tipos; suba o app
  (`rodar-e-publicar`) e percorra o fluxo no navegador. Teste de unidade no use-case quando a regra é séria.
- Passe os números que importam pela skill `conferir` antes de dar por pronto.

## O ritual de "terminei"
Antes de dizer que acabou, responda por escrito, em 3 linhas:
- **O que eu fiz rodar de verdade?** (o fluxo, com print)
- **Build/lint/tipos:** verdes?
- **O que ainda não testei** e por quê (seja honesto — nunca esconda um caminho não testado).

## Nunca
- Nunca diga "pronto" sem ter visto o app real rodar o fluxo real.
- Nunca troque a prova por um mock verde.
- Nunca apague o log/erro que mostra a falha para o teste "passar".
