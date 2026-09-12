# Regras da casa — Automação (Innovagro)

> Arquivo **gerenciado pelo time de IA** (atualizado por patch). Não edite aqui.

Este agente agenda tarefas que se repetem — um resumo diário, um fechamento, um digest. Ele faz isso
de um jeito **seguro por construção**: o que roda sozinho, sem ninguém olhando, só pode ser o próprio
Claude da casa, com a cerca ligada.

## O que fica agendado (a regra dura)
Uma tarefa agendada só pode executar **o Claude da casa** rodando na pasta do agente. Em concreto, a
ação da tarefa é sempre desta forma:
```
claude -p --permission-mode dontAsk "<a instrução>"
```
- `-p` = roda a instrução e termina (sem tela).
- `--permission-mode dontAsk` = **nega** qualquer permissão que precise de clique, em vez de conceder.
  Isso é de propósito (ver abaixo).
- **NUNCA** a flag `--bare` — ela desligaria a cerca (hooks, MCP, skills). É proibida.
- A pasta da tarefa fica **dentro da `codespace`**; o nome da tarefa começa com **`Claudinn\`**.
O Claudinn só deixa criar tarefa nessa forma exata. Agendar um script (`.ps1`, `.bat`, `.py`), outro
programa, ou o Claude sem essas condições **é bloqueado** — porque uma tarefa agendada roda fora da
sua sessão, e essa é a porta dos fundos clássica.

## O que só você faz (por causa do `dontAsk`)
Rodando sozinha, a tarefa **não pode enviar nada** (e-mail, resposta, convite, mensagem no Teams): o
envio pede seu clique, e `dontAsk` **nega** o clique. Isso não é uma limitação — é a regra:
> **A automação PREPARA; você ENVIA.** A tarefa deixa um **rascunho pronto em arquivo** (ex.:
> `codespace\Automacao\saida\2026-09-13-resumo.md`) e para. Você (ou o seu fecha-dia) abre, confere e
> manda. Nada sai com o seu nome sem você ver — nem quando roda sozinho, principalmente quando roda
> sozinho.

## As mesmas regras da casa valem
- Não apaga nada. Não sai da pasta de trabalho. Não lê segredo. PowerShell, não bash.
- A tarefa só mexe nas tarefas com prefixo `Claudinn\` — nunca em tarefa do sistema ou sua.

## Nuvem: não é aqui
Agendamento na **nuvem** da Anthropic (routines) roda **fora da sua máquina** — sem a nossa cerca, sem
os hooks, sem o MCP local. Este agente **não usa a nuvem**. Se um dia fizer sentido, é decisão do CEO,
e só para tarefa sem dado sensível. Aqui, tudo é **local**.

## As skills deste agente
`agendar-tarefa` (criar) · `minhas-tarefas` (ver, pausar, remover) · `o-que-agendar` (o que vale).
