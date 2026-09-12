# Innovagro + Claude — skills da casa

Este repositório é o **conteúdo público** que o Claudinn instala no computador de cada pessoa da
Innovagro: as *skills* (as receitas que ensinam o Claude a fazer cada tarefa do jeito da casa) e as
*ferramentas* que geram Excel, Word e PDF. É de onde vêm as melhorias — quando algo aqui melhora,
todo mundo recebe.

Não tem nada secreto: sem senha, sem dado de cliente, sem configuração interna. Isso mora só no
instalador, nunca aqui.

## O que tem dentro

- **`skills/`** — uma pasta por skill, cada uma com um `SKILL.md` em português. O Claude lê a
  descrição e usa a skill certa quando você pede algo que combina com ela.

  | Skill | Para quê |
  |---|---|
  | `conhecer-voce` | O Diretor te entrevista e aprende quem é você |
  | `caixa-de-entrada` | Ler e resumir o Outlook: "o que chegou hoje?" |
  | `email` | Escrever e responder e-mail — sempre mostra antes de enviar |
  | `teams` | Ler conversas/canais do Teams e enviar mensagem (com OK) |
  | `marcar-reuniao` | Achar horário e criar convite no Teams/Outlook |
  | `ata-de-reuniao` | Transcrição do Teams → ata em Word com o logo da Innovagro |
  | `criar-excel` | Planilha `.xlsx` formatada |
  | `criar-documento` | Documento Word `.docx` no padrão da casa |
  | `relatorio-pdf` | Relatório em PDF com logo e cores da Innovagro |
  | `planilha` | Analisar Excel/CSV: somar, cruzar, gráfico |
  | `consultar-documentos` | Achar e ler documentos citando a fonte |
  | `trabalho-em-lote` | A mesma tarefa em muitos itens, numa tabela |
  | `planejar` | Quebrar um pedido grande em passos |
  | `conferir` | Conferir número e fato antes de entregar |
  | `criar-agente` | (só o Diretor) criar um novo agente/pasta |
  | `criar-skill` | Ensinar o agente a fazer algo sempre igual |
  | `baixar-projeto`, `atualizar-projeto`, `salvar-versao`, `ver-historico`, `voltar-versao`, `enviar-melhoria` | Guardar versões e trabalhar com projetos, em português |
  | `pedir-ajuda` | Montar um pedido claro para o assessor/TI |

- **`ferramentas/`** — programas em Node (`.mjs`) que criam os arquivos Office. O instalador os
  copia para uma pasta protegida do computador; as skills os chamam pelo caminho fixo. O código-fonte
  está em `ferramentas/fonte/` e as licenças das bibliotecas em `ferramentas/LICENCAS-TERCEIROS.txt`.

## Como isto chega no computador

Você **não precisa** clonar nem instalar nada à mão: o **Claudinn** (o instalador) faz tudo — põe o
Claude, o Git, o Python e estas skills no lugar certo, e configura a proteção nativa do Claude Code
(que recusa apagar/destruir).

Este repositório existe para **acompanhar as melhorias** e para quem quiser propor uma
(`enviar-melhoria`). Baixar as novidades: skill `atualizar-projeto`.

## As duas regras que valem acima de tudo

1. **Nada some.** O Claude não apaga arquivo, e-mail nem mensagem. Nenhuma skill contorna isso.
2. **Nada sai com o seu nome sem você ver.** E-mail, convite e mensagem no Teams: o Claude mostra o
   texto e só envia depois do seu OK.
