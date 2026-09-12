# Pacote vault — pra quem monta o instalador e o CLAUDE.md global

## O que tem nesta pasta
| Arquivo | Pra quem | O que fazer |
|---|---|---|
| `Meu-Cerebro\` | instalador | copiar a pasta inteira pro destino abaixo |
| `areas\<slug>\Meu-Cerebro\` | instalador | copiar **por cima** do Meu-Cerebro base (só acrescenta arquivos) |
| `secao-captura-CLAUDE.md` | CLAUDE.md global | colar na seção CAPTURA, trocando `{{MEU_CEREBRO}}` pelo caminho real |
| `..\..\interno\vault\areas\<slug>\semente-O-QUE-EU-SEI.md` | CLAUDE.md global | vira a seção O QUE EU SEI (fica no pacote interno, nunca no repo) |
| `LEIA-ANTES.md` | todos | não copiar |

## Onde criar o Meu-Cerebro
1. Se existir `%OneDriveCommercial%` → `%OneDriveCommercial%\Meu-Cerebro` (OneDrive **da empresa**).
   **Nunca** `%OneDrive%`: pode apontar pra conta pessoal.
2. Se não existir → `%USERPROFILE%\claude\Meu-Cerebro`, e a tela diz:
   **"OneDrive da empresa não encontrado — a mente ficou só neste computador."**
3. O caminho escolhido é o que entra no lugar de `{{MEU_CEREBRO}}`.

## Montagem da mente particular
1. Copiar `Meu-Cerebro\` (base — igual pra todos).
2. Copiar `areas\<slug>\Meu-Cerebro\` por cima. Isso adiciona `00-Sistema\_AREA.md` e as
   subpastas de `03-Trabalho\` da área. Nada da base é substituído.

| Área na tela (lista fechada) | slug |
|---|---|
| Mesa | `mesa` |
| Logística | `logistica` |
| Comercial | `comercial` |
| Administrativo | `administrativo` |
| Facilities | `facilities` |
| IT | `it` |

Gravar no perfil o **slug**, não o rótulo (o rótulo tem acento).
O **cargo** (texto livre) não muda a árvore — entra no QUEM SOU do CLAUDE.md e é de onde a
conversa conhecer-voce parte. No Administrativo, é o cargo que diz qual parte da área é da pessoa.

## Regras de cópia
- **Reinstalar não pode apagar nada.** Se a pasta já existe, copie só os arquivos que faltam.
  Nunca sobrescreva `01-Diario\`, `02-Pessoas\`, `03-Trabalho\`, `04-Combinados\` nem
  `05-Comigo\como-trabalhar-comigo.md`. Só `00-Sistema\_REGRAS.md` e `00-Sistema\_AREA.md`
  podem ser substituídos em reinstalação.
- É só uma pasta de `.md`. Nenhum programa, plugin ou configuração de editor vai junto.
- Nomes de arquivo e pasta já são ASCII, sem acento e sem caracteres que o OneDrive recusa.

## Memória nativa do Claude Code — desligar (medido no Claude Code 2.1.269)
No `settings.json` global (`%USERPROFILE%\.claude\settings.json`):
```json
{ "autoMemoryEnabled": false }
```
- Chave oficial do schema: *"When false, Claude will not read from or write to the auto-memory directory."* Padrão: ligada.
- Alternativa com prioridade maior: variável `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` (no bloco `"env"`
  do settings.json ou no ambiente). A variável vence o settings.
- Também aceita em managed/policy settings.
- Existe `autoMemoryDirectory`. **Não usar:** a memória nativa grava a qualquer hora e no formato
  dela, o que quebra a regra de só acrescentar no diário.
- Medido no binário 2.1.269 do macOS. **Fixe a versão do instalador** ou confirme a chave na versão do Windows.
