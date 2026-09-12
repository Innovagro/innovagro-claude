---
name: depurar
description: Achar a causa de um erro (não só o sintoma) num programa ou ferramenta, em quatro fases. Para quem desenvolve na Innovagro. Use para "deu erro", "não funciona", "quebrou", "bug", "está falhando", "por que isso acontece", "debug".
---

# Debug com método

Quatro fases para achar a **causa raiz**, não remendar o sintoma. Serve para código (Next.js,
Python) e para as ferramentas da casa. No Windows, o terminal é o **PowerShell** — nada de bash.

```
1. REPRODUZIR   → consegue fazer falhar de novo, sempre?
2. ISOLAR       → onde exatamente falha?
3. ENTENDER     → por que falha? (a causa)
4. CORRIGIR     → conserta e prova que consertou.
```

## 1. Reproduzir
Antes de qualquer coisa, faça o erro acontecer de novo, de propósito.
- Quais os passos mínimos para reproduzir?
- Qual a **mensagem de erro exata**? (copie inteira, não resuma)
- O que era **esperado** × o que **aconteceu**?
- Se não reproduz sempre, anote o que muda entre funcionar e falhar.
Se você não consegue reproduzir, você não vai saber se consertou. Pare aqui até conseguir.

## 2. Isolar
Estreite até o menor pedaço que ainda falha.
- Divida ao meio: o erro está antes ou depois deste ponto? Repita.
- Tire coisas até o erro sumir — a última coisa que você tirou está perto da causa.
- Leia a **primeira** linha do erro (o topo da pilha), não a última.
- Confirme suposições com evidência: imprima o valor, não adivinhe ("achei que era X" → mostre X).

## 3. Entender
Só agora pergunte **por quê**.
- Qual era o valor real quando falhou? (não o que você esperava)
- Isso já funcionou antes? O que mudou desde então? (uma versão nova, uma configuração, um dado)
- A causa é uma só, mesmo que apareça em vários lugares. Procure a origem, não os ecos.
- Escreva a causa em uma frase: "Falha porque ___." Se você não consegue, ainda não entendeu.

## 4. Corrigir e provar
- Conserte a **causa**, não o sintoma. Remendo que esconde o erro volta pior depois.
- Rode de novo os passos da fase 1 e mostre que agora passa.
- Guarde a versão que funciona (skill `salvar-versao`) antes de seguir.
- Se o conserto tocou várias coisas, confira que não quebrou o que já funcionava (skill `conferir`).

## Cuidados
- **Uma mudança por vez.** Trocar três coisas juntas e o erro sumir = você não sabe qual resolveu.
- Não conserte no escuro. Se está chutando, volte para a fase 2.
- Erro em produção (site no ar): reproduza numa cópia/preview antes de mexer no que está no ar.
- Se travar de vez, peça ajuda com o problema já isolado (skill `pedir-ajuda`): passos, erro exato,
  o que já tentou.

## Nunca
- Nunca "conserte" apagando o dado ou o log que mostra o erro.
- Nunca desligue uma proteção (nem o bloqueio nativo) para o erro parecer resolvido.
- Nunca use bash; aqui é PowerShell.
