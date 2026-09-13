---
name: preparar-reuniao
description: Prepara o CONTEÚDO de uma reunião importante — objetivo, pauta, roteiro de perguntas, objeções prováveis com resposta e o próximo passo a pedir. (Para achar horário e mandar o convite é a skill marcar-reuniao; para a ata depois é ata-de-reuniao.) Use para "prepara a reunião", "tenho uma call com", "o que eu pergunto", "roteiro de discovery", "pauta da reunião", "reunião amanhã com o cliente".
---

# Preparar reunião

Reunião preparada termina com uma decisão ou um próximo passo marcado. A improvisada termina com
"vamos falando". Esta skill monta o **conteúdo**; para agendar/convidar é a skill `marcar-reuniao`.

## 1. Contexto (uma mensagem, só o que faltar)
- Com **quem** (pessoa, cargo, empresa) e **quanto tempo**.
- **Tipo**: primeira conversa/diagnóstico, negociação, apresentação de proposta, alinhamento interno, cobrança.
- **Resultado desejado**: o que precisa ser verdade quando a reunião acabar?
- Material que já existe (e-mails, propostas, atas): leia se a pessoa indicar os arquivos.

## 2. Pesquisar (se for empresa externa e a web estiver disponível)
- Site oficial, notícias recentes, porte, setor, mudanças (expansão, troca de diretoria).
- Só informação **profissional pública** da pessoa — nada de invadir privacidade.
- Cite as fontes com link. Sem web disponível, trabalhe com o que a pessoa deu e avise (skill `pedir-ajuda` se for proxy/TI).

## 3. Roteiro
Grave em `...\codespace\<agente>\rascunhos\AAAA-MM-DD-reuniao-<empresa>.md`:
```markdown
# Reunião com <pessoa/empresa> · <data> · <duração>
## Objetivo — sair com: <resultado concreto>
## O que já sabemos
- ... (fonte)
## Pauta (com tempo)
1. Abertura e objetivo (3 min)
2. ...
3. Próximo passo (5 min)
## Perguntas (abertas; ★ nas 3 essenciais; máx. 10)
- Situação atual: como funciona hoje? quem faz? quais ferramentas?
- Problema: o que mais atrapalha? quanto custa (tempo/dinheiro/clientes)? desde quando?
- Tentativas: o que já tentaram? por que não funcionou?
- Resultado: como seria o sucesso em 6 meses? como vão medir?
- Decisão: quem mais decide? qual o processo? tem orçamento e prazo?
## Objeções prováveis e resposta
| Objeção | Resposta curta | Prova/exemplo |
## O próximo passo a pedir
"<frase exata pra propor o próximo passo, com data>"
## Não esquecer
- ...
```

## Regras
- Perguntas **abertas** ("como", "o que", "por que"), uma de cada vez — nada de sim/não no diagnóstico.
- Na reunião, o outro fala 70% do tempo. O roteiro é pra ouvir melhor, não pra falar mais.
- Ofereça: "Depois da reunião, me manda a transcrição que eu faço a ata" (skill `ata-de-reuniao`).

## Nunca
- Nunca invente fato sobre a empresa/pessoa — só o que a fonte disser (com link).
- Nunca use informação privada; só o que é público e profissional.
