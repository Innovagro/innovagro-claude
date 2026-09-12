---
tipo: regras
updated: 2026-09-12
description: "Como os agentes escrevem neste cérebro. Lido pelo agente no fecha-dia; a pessoa não precisa ler."
---
# _REGRAS — como os agentes escrevem neste cérebro

Este cérebro é **da pessoa**. Os agentes escrevem nele por ela. Estas regras valem pra
qualquer agente, em qualquer sessão. O vocabulário da área da pessoa (em que subpasta de
`03-Trabalho/` vai cada assunto) está em `00-Sistema/_AREA.md` — leia junto.
É uma pasta de arquivos de texto (`.md`) — não precisa de nenhum programa além das suas
ferramentas de arquivo. Não dependa de terminal, script ou aplicativo.

## 1. Duas camadas — e a regra que não se quebra
| Camada | Onde | Como se escreve |
|---|---|---|
| **Diário** (o registro) | `01-Diario/` | **Só se acrescenta, no fim.** Nunca apagar, nunca reescrever |
| **Páginas** (o que a pessoa sabe hoje) | `02-Pessoas/` `03-Trabalho/` `05-Comigo/` | **Reescritas**, só no fecha-dia |
| **Combinados** | `04-Combinados/` | Um arquivo por combinado. **Nunca editados** |

**Durante o dia, o agente escreve em um único lugar: o diário de hoje.** Páginas só mudam no
fecha-dia. Motivo: duas sessões abertas ou o OneDrive sincronizando no meio de uma reescrita
geram cópia em conflito. Acrescentar no fim de um arquivo só não gera.

## 2. Durante o dia — quando anotar
Anote no diário de hoje (`01-Diario/AAAA-MM-DD.md`; se não existir, crie) quando a pessoa:
1. **corrige você** ou diz como prefere as coisas → `[comigo]`
2. **conta um fato** sobre alguém, um cliente, um processo, um sistema → `[fato]`
3. **decide ou promete** algo, ou alguém promete algo a ela → `[combinado]`
4. diz **"anota isso"** ou **"lembra disso"** → o tipo que couber

Formato — uma linha por anotação, acrescentada no fim do arquivo:
```
- 14:32 [fato] O fornecedor X trocou o responsável pelo nosso atendimento. (conversa)
- 15:10 [combinado] Prometi ao meu gestor o relatório até sexta. (e-mail)
- 16:05 [comigo] Não quer resposta em tabela; prefere 3 linhas corridas. (correção)
```
Antes de acrescentar, **leia o arquivo de novo** (outra sessão pode ter escrito). Nunca
reescreva o que já está lá.

**Não anote:** texto inteiro de e-mail ou documento (anote o fato, cite a fonte) · senha,
token, dado bancário · saúde, salário, vida pessoal de terceiros · opinião sobre colega ·
qualquer coisa que a pessoa disser "não anota".

## 3. No fecha-dia — compilar
Quando a pessoa pedir o fecha-dia (padrão 17h):
1. **Acrescente no fim do diário de hoje** as três listas do fecha-dia (definidas no CLAUDE.md
   dela). O fecha-dia mora no diário — é o registro do dia.
2. **Compile** cada anotação do dia:
   - `[fato]` → página da pessoa em `02-Pessoas/` ou do assunto na subpasta certa de
     `03-Trabalho/` (ver `_AREA.md`); procedimento vai em `03-Trabalho/como-se-faz/`
   - `[comigo]` → `05-Comigo/como-trabalhar-comigo.md`
   - `[combinado]` → arquivo novo em `04-Combinados/`
3. Compilar = **reescrever o trecho que mudou**, não empilhar parágrafo. A página diz como as
   coisas são **hoje**; o histórico já está no diário.
4. Atualize `updated:` de toda página que tocou.

## 4. Criar página nova × atualizar
**Atualize** (é o padrão): a pessoa ou o assunto já tem página.
**Crie** só quando: é alguém ou um assunto novo que vai voltar a aparecer · é um combinado
(sempre arquivo novo).
Na dúvida, **não crie** — a anotação já está segura no diário.
**Nunca crie pasta nova.** As pastas que existem são todas — as de `03-Trabalho/` vêm da área.

## 5. Nome de arquivo
Minúsculo, sem acento, palavras separadas por hífen, até 60 caracteres. **Proibido:**
`# % & { } < > * ? / \ : | " ;` — o OneDrive recusa ou estraga. O nome bonito vai no título.
- Pessoa: `nome-sobrenome.md` · Assunto: `aprovar-pagamento.md` · Combinado: `2026-09-12-relatorio-gestor.md`

## 6. Cabeçalho de toda página
```
---
tipo: pessoa | trabalho | combinado | comigo
updated: 2026-09-12
description: "Uma linha que diz se esta página responde a pergunta."
---
```
Pra citar outra página, escreva o caminho dela entre crases: `02-Pessoas/nome-sobrenome.md`.
Nada de `[[link]]` ou formato que dependa de programa — a página tem que ser lida no Bloco de Notas.
**Quem escreve a referência é o agente**, nunca a pessoa.

## 7. Validade
| Pasta | Vence em | Se venceu |
|---|---|---|
| `02-Pessoas/` `03-Trabalho/` | 90 dias sem `updated` | no fecha-dia, pergunte à pessoa se ainda vale |
| `05-Comigo/` | não vence | só muda quando ela corrige de novo |
| `04-Combinados/` | nunca editado | se mudou: arquivo novo com `substitui: 04-Combinados/arquivo-antigo.md`; no antigo, `status: substituido` |
| `01-Diario/` | nunca editado | é o registro |

## 8. Nunca
- Escrever fora de `Meu-Cerebro\`.
- Mexer em arquivo que a própria pessoa escreveu à mão sem perguntar.
- Guardar "como trabalhar comigo" em outro lugar que não `05-Comigo/`. Este cérebro é a
  **única memória** dos agentes sobre a pessoa.
