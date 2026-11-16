# EducAI — Progresso e continuidade

> **Leia isto primeiro ao retomar o trabalho.** Este documento registra o estado exato do projeto,
> o que foi feito, como reproduzir, o que falta e em que ordem, com critérios de aceite.
>
> Última atualização: **16/11/2026**, sessão 3 da Fase 0 (spike completo `p1`–`p14`, plano v2.1,
> fixtures, protótipo e lexer/parser da S1 prontos; CI verde).
> Autor: Renato (com Claude). Branch de trabalho: `feat/fase0-setup`.

---

## Sumário

1. [Resumo executivo](#1-resumo-executivo)
2. [Mudança de equipe e impacto no plano](#2-mudança-de-equipe-e-impacto-no-plano)
3. [Estado do repositório](#3-estado-do-repositório)
4. [Ambiente de desenvolvimento](#4-ambiente-de-desenvolvimento)
5. [O que foi feito, por tarefa](#5-o-que-foi-feito-por-tarefa)
6. [O que falta, em ordem](#6-o-que-falta-em-ordem)
7. [Achados técnicos](#7-achados-técnicos)
8. [Decisões](#8-decisões)
9. [Riscos e pontos de atenção](#9-riscos-e-pontos-de-atenção)
10. [Checklist da próxima sessão](#10-checklist-da-próxima-sessão)

---

## 1. Resumo executivo

| Item | Estado |
|---|---|
| Fase atual | **Fase 0 — Validação** (16/11 – 06/12/2026), gate **G0** em 06/12 |
| Plano | **v2.1** (`sprint.md` §0): Renato + Claude, gates com as mesmas datas, ~230 h do Renato de ~290 h. Base v2 no **PR #1, aguardando merge do Renato** |
| Código | Monorepo TypeScript verde localmente **e no CI do GitHub** — PR #2. **72 testes** (47 no compilador, 25 no web) |
| Spike de equivalência | **Concluído**: 14 programas (`p1`–`p14`) + 5 fixtures × 5 linguagens, nenhuma divergência inesperada; todas as pegadinhas da spec confirmadas (`spike/README.md`) |
| Fixtures (0.2) | **Concluídas**: 5 programas didáticos com mapa nó → ranges nas 5 linguagens, gerador e verificação no CI (`fixtures/README.md`) |
| Protótipo (0.1) | **Construído** em `apps/web` (highlight cruzado, explicações, passo a passo, atividade de transferência). Falta a revisão do catálogo pelo Renato |
| Compilador (S1) | **Adiantado**: lexer, parser com recuperação de erros e mapa PT-BR. O parser reproduz exatamente os mapas marcados à mão nas 5 fixtures |
| Achados principais | Java arredondava diferente → `BigDecimal` + `HALF_EVEN` (D1). Acentos quebram Java/C/C++/PHP → `caractere` só ASCII no v1 (decisão 012). Vírgula na entrada é lida como `7.00` em silêncio em C/C++/PHP → o interpretador rejeita |
| Equipe | Só Renato (com Claude) — decisão 006; plano refeito (decisão 014) |
| Bloqueio para o G0 | Tarefas 0.3 e 0.4 (alunos e professores) dependem só do Renato e ainda não começaram |

Tarefas da Fase 0:

| # | Tarefa | Estado |
|---|---|---|
| 0.1 | Protótipo com 5 abas | 🟡 construído e testado; falta **revisão do catálogo pelo Renato** e publicar (D3) |
| 0.2 | Fixtures dos 5 programas | ✅ concluído (a AST tipada agora sai do parser) |
| 0.3 | Think-aloud com 6–10 alunos | ❌ não iniciado (roteiro em `docs/fase0-roteiros.md`) |
| 0.4 | Entrevistas com 3–5 professores + turma do piloto | ❌ não iniciado (roteiro em `docs/fase0-roteiros.md`) |
| 0.5 | Spike de equivalência | ✅ concluído (`p1`–`p14`) |
| 0.6 | Fechar `docs/semantica.md` v1 | ✅ todas as regras testadas no spike; falta só D2 (índice de vetor, com professores) |
| 0.7 | Monorepo, lint, testes, CI | ✅ CI verde no GitHub (PR #2); falta só proteger a `main` |
| D5 | Replanejar `sprint.md` sem o Vitório | ✅ `sprint.md` §0 (v2.1) |
| S1 | Lexer + parser (adiantado) | 🟡 lexer, parser, mapa PT-BR e catálogo de erros feitos; faltam comentários como nós e a página de debug da AST |

---

## 2. Mudança de equipe e impacto no plano

**Decisão 006 (16/11/2026):** o Vitório não faz mais parte da divisão de tarefas. Todo o trabalho
fica com o Renato, com o Claude escrevendo código e documentação sob a direção dele.

**Decisão 014 (16/11/2026) — D5 fechada, plano v2.1** (detalhes em `sprint.md` §0):

- **Datas dos gates mantidas:** G0 06/12, G1 07/02, G2 21/03, G3 04/04, G4 02/05; piloto em
  maio/2027.
- **Orçamento contado em horas do Renato** (decidir, revisar, testar, pesquisar, curar o catálogo,
  piloto). O código é escrito pelo Claude e deixou de ser o gargalo.
- Soma prevista: **~230 h de ~290 h** disponíveis (80% de 14 h/semana × ~26 semanas).
- **Premissa a confirmar pelo Renato: 14 h/semana.** Se for menos, aplicar a ordem de corte do
  `sprint.md` §13 começando pela IA (S9).
- Se sobrar folga, nesta ordem: qualidade (testes, revisão) → IA opcional → antecipar as 8
  linguagens da v1.1 para antes do piloto.
- O que continua sendo **só do Renato**, sem atalho: decisões, revisão do código, pesquisa com
  alunos e professores, curadoria do catálogo, piloto e ensaio.

Pendência relacionada: o convite de colaborador do GitHub para `garageunicorn` foi enviado em
16/11. Decidir se continua (acesso de escrita) ou se deve ser cancelado:
`gh api -X DELETE repos/renato0503/EducAI/invitations/<id>` (o id aparece em
`gh api repos/renato0503/EducAI/invitations`).

---

## 3. Estado do repositório

Remoto: `https://github.com/renato0503/EducAI` (**público**, licença MIT; ver decisão D3).

### Branches

| Branch | Base | Conteúdo | Estado |
|---|---|---|---|
| `main` | — | Documentação v1 (3 commits) | Desatualizada |
| `docs/plano-v2` | `main` | Plano v2: `context.md`, `sprint.md`, `README.md`, `docs/semantica.md` | **PR #1** aberto; merge pendente (o Claude não tem permissão para fazer merge na `main`) |
| `feat/fase0-setup` | `docs/plano-v2` | Monorepo + spike + docs de continuidade | **PR #2** aberto, CI verde; fazer merge depois do #1 |

Ordem de merge: **#1 primeiro, depois #2** (use "Create a merge commit" no #1 para o diff do #2
ficar só com o trabalho da Fase 0).

- PR #1: https://github.com/renato0503/EducAI/pull/1
- PR #2: https://github.com/renato0503/EducAI/pull/2

### Mapa de arquivos

```
ProjetoEducAI/
├── README.md, context.md, sprint.md, dor.md        documentação do produto (plano v2; sprint.md §0 = v2.1)
├── prompt-avaliacao.md                             prompt da avaliação crítica (fora do git, de propósito)
├── docs/
│   ├── PROGRESSO.md        ← este documento
│   ├── decisoes.md         decisões tomadas (001–014) e pendentes (D2–D4, D6, D7, D9, D10)
│   ├── semantica.md        contrato de semântica PT-BR → 5 linguagens (todas as regras testadas no spike)
│   ├── erros.md            catálogo de erros do lexer e do parser (L001–L002, S001–S014)
│   └── fase0-roteiros.md   roteiros das tarefas 0.3 (alunos) e 0.4 (professores)
├── package.json            raiz (scripts: build, test, typecheck, lint, format, dev, spike, fixtures)
├── pnpm-workspace.yaml     workspaces packages/* e apps/*; allowBuilds esbuild
├── tsconfig.base.json      TS estrito (noUncheckedIndexedAccess, exactOptionalPropertyTypes…)
├── eslint.config.js, .prettierrc.json, .prettierignore, .editorconfig, .gitattributes (LF), .nvmrc (24)
├── .github/
│   ├── workflows/ci.yml          jobs "qualidade" (lint, typecheck, test, fixtures --verificar, build) e "equivalencia" (Docker)
│   └── pull_request_template.md
├── packages/compiler/      @educai/compiler
│   ├── scripts/gerar-fixtures.ts   fixtures/<p>/* com marcadores → fixture.json + indice.json + spike/programas/fx-*
│   └── src/
│       ├── ast.ts                  AST/IR (context.md §6.3), com `estrutura` de programa e função
│       ├── lexer.ts                tokens, comentários, erros L001–L002
│       ├── parser.ts               descida recursiva, recuperação por comando, erros S001–S014
│       ├── mapa-ptbr.ts            AST → mapa id → ranges e id → tipo (formato das fixtures)
│       ├── linguagens.ts           MVP (5) e v1.1 (3) + nomes de exibição
│       ├── fixtures/marcadores.ts  ⟦id⟧…⟦/⟧ → código limpo + mapa
│       └── *.test.ts               47 testes
├── fixtures/               5 programas didáticos (programa.por + 5 linguagens com marcadores, notas.json, fixture.json)
├── catalogo/               tipos.json (20 cartões), sinteticos.json (11), README.md (formato e checklist de revisão)
├── apps/web/               @educai/web — protótipo (Vite 6 + React 18)
│   └── src/  App.tsx, dados.ts, segmentos.ts, tipos.ts, estilos.css,
│             componentes/ (PainelCodigo, PainelExplicacao, TextoRico, Transferencia), 25 testes
└── spike/                  tarefa 0.5 (ver spike/README.md)
    ├── Dockerfile, run.mjs, README.md, resultado-docker.md
    └── programas/p1-texto … p14-entrada-virgula, fx-* (gerados das fixtures)
```

### Versões fixadas

| Pacote | Versão | Observação |
|---|---|---|
| pnpm | 11.15.1 (`packageManager`) | |
| Node | 24 (`.nvmrc`), mínimo 22 | |
| TypeScript | 5.7.2 | 7.x disponível; não atualizar sem motivo |
| ESLint / typescript-eslint | 9.17.0 / 8.18.1 | |
| Vitest | 2.1.8 | 5.x disponível |
| Vite / React | 6.0.5 / 18.3.1 | |
| Prettier | 3.4.2 | |

As versões foram escolhidas por serem estáveis e conhecidas, não as mais novas. Atualizar em bloco
depois do G0, se fizer sentido.

---

## 4. Ambiente de desenvolvimento

Máquina do Renato (Windows 11):

| Ferramenta | Situação |
|---|---|
| Node 24.14, pnpm 11.15.1 | ✅ |
| Python 3.12, OpenJDK 21, PHP | ✅ instalados (PHP mostra um aviso inofensivo sobre a extensão `curl` ausente) |
| gcc / g++ | ❌ não instalados → C e C++ só rodam no Docker ou no CI |
| Docker Desktop | ✅ instalado em `%LOCALAPPDATA%\Programs\DockerDesktop\`; **não inicia sozinho** |

Para abrir o Docker (PowerShell):

```powershell
Start-Process "$env:LOCALAPPDATA\Programs\DockerDesktop\Docker Desktop.exe"
docker info --format '{{.ServerVersion}}'   # repetir até responder
```

### Comandos

```bash
pnpm install                 # instala tudo
pnpm lint                    # ESLint
pnpm typecheck               # tsc em todos os pacotes
pnpm test                    # Vitest em todos os pacotes
pnpm build                   # build do web (e checagem de tipos do compiler)
pnpm dev                     # servidor de desenvolvimento do web (http://localhost:5173)

pnpm spike                                         # spike com os runtimes locais
docker build -t educai-runtimes spike              # imagem com os 5 runtimes
docker run --rm educai-runtimes                    # spike completo, modo estrito
```

### Armadilhas já encontradas

1. **pnpm 11 bloqueia scripts de build** de dependências. A chave antiga `onlyBuiltDependencies`
   não funciona; usar `allowBuilds:` no `pnpm-workspace.yaml` (ou `pnpm approve-builds <pkg>`).
2. **Fim de linha:** o `.gitattributes` força LF. Os arquivos de entrada e saída do spike
   **precisam** de LF; com CRLF, `input()` do Python manteria o `\r` no texto.
3. **Heredocs no Git Bash:** alguns comandos longos com heredoc e aspas falham com
   `unexpected EOF`. Para arquivos com muito conteúdo, usar a ferramenta de escrita de arquivos
   ou um script Python com strings `r'''...'''`.
4. **Screenshots sem navegador interativo:** subir `npx vite preview --port 4173` em
   `apps/web` e usar
   `"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --window-size=1366,900 --screenshot=arquivo.png "http://localhost:4173/?..."`.
5. **Gerar arquivos esperados no Windows:** usar `printf` no Git Bash ou Python com
   `newline='\n'`. Não usar `echo` do PowerShell (grava UTF-16/BOM e CRLF).

---

## 5. O que foi feito, por tarefa

### 0.7 — Monorepo, lint, testes, CI (✅, falta proteger a `main`)

Feito:
- Monorepo pnpm com `packages/compiler` e `apps/web`, TypeScript estrito compartilhado.
- ESLint 9 (flat config), Prettier, EditorConfig, `.gitattributes` com LF.
- `packages/compiler/src/ast.ts`: esquema completo da AST do context.md §6.3, já com:
  `Span`, `NodeId` (caminho estrutural), `SyntheticId` (`syn:...`), todos os nós de expressão e
  comando, `Erro` (para recuperação por comando), `Funcao`, `Programa`, `Range`, `MapaTokens`
  (nó → **lista** de ranges) e `CodigoGerado`.
- `apps/web`: casca Vite + React que importa `@educai/compiler`.
- CI em `.github/workflows/ci.yml`:
  - `qualidade`: `pnpm install --frozen-lockfile`, lint, typecheck, test, build.
  - `equivalencia`: constrói `spike/Dockerfile` e roda o spike em modo estrito, publicando o
    relatório em Markdown no resumo da execução.
- Template de PR.

Verificado localmente e no CI: `pnpm lint`, `pnpm typecheck`, `pnpm test` (hoje 72 testes),
`pnpm fixtures --verificar` e `pnpm build` passam.

Falta:
- [x] CI rodou no GitHub (PR #2): `qualidade` 27 s, `equivalencia` 1 min 16 s, ambos verdes.
  O GitGuardian (app instalado no repositório) também passou.
- [ ] Proteção da `main` (exigir PR + CI verde) em Settings → Branches.
- [ ] Fixar a imagem base do Docker por digest (TODO no `spike/Dockerfile`).

### 0.5 — Spike de equivalência (✅)

14 programas escritos à mão em PT-BR e nas 5 linguagens, seguindo `docs/semantica.md`, mais as 5
fixtures (`fx-*`). Executor `spike/run.mjs` com modos local, estrito, Markdown, `--so` e
`--linguagens`; `meta.json` aceita `divergenciasEsperadas` e `"modo": "documentar"` (só registra o
comportamento de cada linguagem, para as pegadinhas). Resultado completo em
`spike/resultado-docker.md` e resumo em `spike/README.md`.

**Resultado:** todas as saídas iguais ao esperado, fora as divergências previstas; todas as
divergências previstas se confirmaram; compilação sem avisos com `-Werror` em C, C++ e Java.
Detalhes em §7.

### 0.6 — `docs/semantica.md` v1 (✅, falta D2)

Atualizado com o spike: arredondamento (D1), `caractere` só ASCII, divisão por zero, vírgula na
entrada, variável do `para` depois do laço, globais, recursão, `strcpy`/`strcat` em C, regras do
`leia`, e a nota do §9 sobre maiúsculas e acentos em palavras-chave (D9).

### 0.1, 0.2 (🟡 / ✅)

Ver §6.3 e §6.4.

### 0.3, 0.4 (❌)

Não iniciadas. Dependem só do Renato. Ver §6.1 e §6.5.

### S1 — Lexer e parser (🟡, adiantado)

Ver §6.8.

---

## 6. O que falta, em ordem

A ordem considera dependências e o prazo do G0 (06/12). **As tarefas 0.3 e 0.4 são as mais
urgentes**: dependem de agenda de outras pessoas e só o Renato pode fazê-las.

### 6.1 — Agendar alunos e professores (0.3 e 0.4) — HOJE/AMANHÃ

Sem isso não há G0. Roteiros prontos em `docs/fase0-roteiros.md`.

- [ ] Listar 3–5 professores de lógica/algoritmos e mandar convite (texto pronto no roteiro).
- [ ] Combinar com um deles o acesso a 6–10 alunos de Algoritmos I para sessões de 30 min entre
      **25/11 e 04/12** (o protótipo precisa estar pronto até 24/11).
- [ ] Na entrevista, **fechar turma e data do piloto (maio/2027)** por escrito.
- Aceite: ≥ 3 entrevistas marcadas e ≥ 6 sessões com alunos marcadas até 22/11.

### 6.2 — Completar o spike (0.5/0.6) — ✅ FEITO em 16/11

Resultados em `spike/README.md` e incorporados ao `docs/semantica.md` (decisões 011–013). Os
nomes finais ficaram `p7`–`p14` (a divisão por zero virou dois programas: inteira e real). O
executor ganhou o modo `documentar` para as pegadinhas, em vez do `falhaEsperada` proposto
abaixo.

Plano original, mantido como referência:

1. ✅ **Feito em 16/11 — D1 fechada (decisão 011).** Registro original: Criar `spike/programas/p6-arredondamento/`:
   - Valores: `0.125`, `0.375`, `2.675`, `1.005`, `1234.5678`, `-2.675`, `0.0`, `-0.001`
     (com 2 casas; `-0.001` testa o `-0.00`), e `2.5`/`3.5` com `x:0:0`.
   - Java com `new BigDecimal(x).setScale(n, RoundingMode.HALF_EVEN).toPlainString()`.
   - Atenção: `-0.001` com 2 casas dá `-0.00` em C/Python; `BigDecimal` pode dar `0.00`. Se
     divergir, registrar como nova pegadinha ou ajustar a regra.
   - Aceite: as 5 linguagens iguais em todos os valores → fechar D1 com a opção A em
     `docs/decisoes.md` e atualizar a tabela do `docs/semantica.md` §4.
2. Novos programas (um por regra da spec ainda não testada):

| Programa | Testa | Expectativa |
|---|---|---|
| `p7-logico-e-se` | `e`/`ou`/`nao`, curto-circuito, `logico` impresso, `se` aninhado | Iguais |
| `p8-globais` | procedimento que lê e altera global (`global` em Python e PHP, `static` em Java) | Iguais |
| `p9-para-apos-laco` | ler a variável do `para` depois do laço | Divergência: Python termina em `b`, as outras em `b+1` → pegadinha |
| `p10-texto-acentos` | `caractere` com "José", `compr()` | Provável divergência: `strlen` em C e PHP conta bytes UTF-8 → decidir: proibir acentos em texto no v1 ou usar funções multibyte |
| `p11-divisao-por-zero` | inteira e real | Divergência: confirma a pegadinha |
| `p12-recursao-profunda` | recursão de profundidade 1000 | Python estoura (limite padrão 1000) → confirma limite de 500 |
| `p13-entrada-virgula` | `leia` de real com "7,5" | Divergência: Python lança erro, C lê 7, PHP lê 7 → confirma rejeição no interpretador |

   Para casos que **devem** divergir, a saída esperada termina antes do ponto de divergência e o
   `meta.json` lista o prefixo. Se o programa quebrar (status ≠ 0) em alguma linguagem, isso
   aparece como "❌ execução" — o executor ainda não tem o conceito de "falha esperada";
   adicionar um campo `falhaEsperada: ["python"]` ao `meta.json` e tratar em `run.mjs`.
3. Rodar `docker run --rm educai-runtimes node run.mjs --estrito --markdown > spike/resultado-docker.md`.
4. Atualizar `docs/semantica.md`, `spike/README.md` e `docs/decisoes.md`.

### 6.3 — Fixtures dos 5 programas didáticos (0.2) — ✅ FEITO em 16/11

Resultado: ver `fixtures/README.md`. Diferenças em relação ao plano abaixo:
- Os ids e os tipos dos nós vêm dos marcadores do PT-BR (`⟦id|tipo⟧`); não há `ast.json`
  completo. A AST tipada sai do parser na Sprint 1, usando os `programa.por` como corpus.
- O gerador é `packages/compiler/scripts/gerar-fixtures.ts` (`pnpm fixtures`), e a biblioteca
  de marcadores tem 6 testes. O CI roda `pnpm fixtures --verificar`.
- As versões limpas vão para `spike/programas/fx-*`, então o job de equivalência do CI também
  testa as fixtures nas 5 linguagens.
- Cartões de explicação ficaram para o protótipo (§6.4).

Plano original, mantido como referência:

São os programas que os alunos vão ver no protótipo, **diferentes** dos do spike (estes são
"difíceis"; aqueles são didáticos).

Programas sugeridos (validar com professor se der tempo):
1. `media-notas` — lê 4 notas, calcula média, aprovado/reprovado (variáveis, `leia`, `se`).
2. `tabuada` — lê um número e imprime a tabuada com `para`.
3. `contagem-regressiva` — `enquanto` decrementando.
4. `maior-do-vetor` — lê 5 valores num vetor e acha o maior (vetor + `para` + `se`).
5. `fatorial-funcao` — função com retorno (até 10!, sem overflow).

Formato proposto: `fixtures/<programa>/`
- `programa.por`
- `ast.json` — tipo `Programa` de `packages/compiler/src/ast.ts`
- `python.json`, `java.json`, `c.json`, `cpp.json`, `php.json` — tipo `CodigoGerado`
- `cartoes.json` — explicações escritas à mão para os nós deste programa (formato do catálogo,
  `sprint.md` 2.2)

**Não calcular ranges à mão.** Escrever o código de cada linguagem com marcadores inline e gerar o
JSON com um script:

```
⟦main/1⟧while (⟦main/1/cond⟧i < 10⟦/⟧) {⟦/⟧
```

Script `scripts/marcadores-para-fixture.mjs` (a criar): lê o arquivo com marcadores, remove os
marcadores, calcula `[linha, col, linhaFim, colFim]` de cada abertura/fechamento (com aninhamento),
acumula vários ranges por id e grava o `CodigoGerado`. Esse mesmo raciocínio vira o emissor da
Sprint 5, então vale fazer com testes (Vitest) em `packages/compiler`.

Nós sintéticos a cobrir (mínimo): `syn:c.include_stdio`, `syn:c.main`, `syn:c.return0`,
`syn:c.buffer_linha`, `syn:cpp.include_iostream`, `syn:cpp.main`, `syn:java.import_scanner`,
`syn:java.class_main`, `syn:java.main`, `syn:java.scanner`, `syn:java.locale`,
`syn:php.open_tag`, `syn:python.conversao_input`.

Aceite:
- [ ] Teste que valida cada `ast.json` contra os tipos (importar como JSON e checar com `tsc`, ou
      escrever um validador simples).
- [ ] Teste de **cobertura do mapa**: todo caractere não-branco de cada código pertence a algum
      range.
- [ ] Os 5 programas rodam no spike (copiar para `spike/programas/` ou apontar o executor para
      `fixtures/`) com saída idêntica.

### 6.4 — Protótipo (0.1) — 🟡 CONSTRUÍDO em 16/11

**Como rodar:** `pnpm dev` → http://localhost:5173. Build estático: `pnpm build` (sai em
`apps/web/dist/`, 223 kB de JS, sem servidor).

**O que tem:**
- Seletor dos 5 programas das fixtures.
- PT-BR à esquerda; à direita, **Todas as linguagens** (grade com 5 painéis) ou **Foco** (até 2).
- **Highlight cruzado multi-range:** clique/hover em qualquer trecho de qualquer painel acende o
  mesmo elemento em todos. Painéis onde o elemento não existe mostram "sem equivalente aqui" ou
  "só existe em X".
- **Painel de explicação:** cartão do catálogo (`catalogo/`), "Dentro de" (sobe para o comando
  pai), uma linha por linguagem com o trecho real e o "como", notas específicas do programa
  e, com **Aprofundar**, o texto extra e as pegadinhas.
- **Construir passo a passo:** revela o programa comando a comando (→ no teclado); a estrutura
  (`main`, `#include`, `return 0`) aparece desde o início; o comando novo pisca em todos os
  painéis, é selecionado e entra no **fio de elementos**.
- **Atividade** (`#atividade`): tarefa de transferência do think-aloud em Java ou C, sem a
  ferramenta; o aluno escreve a saída e clica na linha equivalente; o facilitador vê um resumo
  (com contagem de cliques por painel na sessão) e o gabarito.
- **Estado pela URL**, para o facilitador abrir a tela no ponto certo:
  `?programa=tabuada&sel=main/2&modo=foco&foco=python,java&aprofundar=1&passos=3`.
- Tema claro/escuro automático; ligaduras de fonte desligadas (o aluno vê `<-` e `>=`).

**Testes:** 25 no `apps/web` — segmentação, modo construção, ancestrais e **cobertura do
catálogo** (todo elemento de toda fixture tem cartão; toda linguagem tem "como" ou explicação de
ausência; o painel renderiza para todos os nós).

**Verificação visual:** screenshots com o Edge headless em 1366×900 (§4, armadilha 4): grade,
foco, construção, nó sintético, função e atividade conferidos.

**Pendências:**
- [ ] **Renato: revisar o conteúdo de `catalogo/tipos.json`, `catalogo/sinteticos.json` e
      `fixtures/*/notas.json`** com o checklist de `catalogo/README.md`. É o texto que os alunos vão
      ler.
- [ ] Decidir onde publicar para as sessões (D3): GitHub Pages (repo público, CI já existe),
      Vercel ou Cloudflare Pages — ou rodar local no notebook do facilitador (`pnpm build` +
      `npx vite preview`), que dispensa publicar.
- [ ] Ensaiar o roteiro do think-aloud (`docs/fase0-roteiros.md`) com 1 pessoa antes de 25/11.
- [ ] Em 1366 px no modo "Todas as linguagens", linhas longas do Java ficam com rolagem
      horizontal. Aceitável no protótipo; observar nas sessões se atrapalha.

Plano original, mantido como referência:

Recomendação: construir **dentro de `apps/web`**, consumindo as fixtures, em vez de um HTML
descartável. Assim ele vira a base da Sprint 1 (o plano previa isso para S1.5–1.7).

Requisitos (sprint.md 0.1):
- Layout: PT-BR à esquerda; à direita, **modo grade** (5 painéis) e **modo foco** (1–2 escolhidos).
  Começar com `<pre>` estilizado; Monaco só se sobrar tempo (o objetivo é testar a ideia).
- **Highlight cruzado multi-range:** hover/clique em qualquer trecho de qualquer painel → acende
  todos os ranges do mesmo nó em todos os painéis. Elementos sem equivalente (ex.: declaração em
  Python) mostram uma etiqueta "não existe em Python".
- **Painel de explicação:** cartão do nó selecionado (básico / aprofundar), com a parte por
  linguagem.
- **Modo construção simulado:** botão "construir passo a passo" que revela o programa comando a
  comando; cada comando novo acende nos 5 painéis por ~2 s e adiciona um cartão no "fio de
  elementos".
- **Tela da tarefa de transferência** (para o think-aloud): trecho em Java ou C que o aluno não
  viu, com campo "qual a saída?".
- Seletor dos 5 programas.
- Publicar para os alunos acessarem (ex.: Vercel/Cloudflare Pages ou `pnpm build` + artefato).
  Ver D3 sobre o repositório ser público.

Aceite: o fluxo completo do roteiro de think-aloud funciona sem explicação verbal; nenhum erro no
console; funciona em notebook de 1366 px.

Prazo: **até 24/11**, para as sessões começarem em 25/11.

### 6.5 — Pesquisa (0.3 e 0.4) — sessões de 25/11 a 04/12

Seguir `docs/fase0-roteiros.md`. Registrar cada sessão logo depois (modelo no roteiro).
Consolidar em `docs/validacao-f0.md`.

### 6.6 — Replanejar `sprint.md` (D5) — ✅ FEITO em 16/11 (sprint.md §0, decisão 014)

Ver §2. Fazer antes do G0, para o plano pós-G0 já refletir a equipe real.

### 6.7 — Gate G0 (06/12)

Critérios do `sprint.md` §4:
- [ ] ≥ 60% dos alunos preveem a saída do trecho inédito **e** não ficam atrás do baseline ChatGPT
      (ou vantagem qualitativa clara).
- [ ] ≥ 1 professor com turma e datas do piloto confirmadas por escrito.
- [x] Programas do spike com saída idêntica nos 5 runtimes seguindo regras escritas
      (falta fechar D1 e os casos do §6.2).
- [ ] Decisões D1, D2, D3 fechadas.

Registrar o resultado e a decisão (seguir, ajustar ou parar) em `docs/decisoes.md`.

### 6.8 — Sprint 1 — 🟡 ADIANTADA: lexer e parser feitos em 16/11

Adiantado porque o parser é necessário qualquer que seja o resultado do G0. **A revisão do Renato
pode esperar até depois de 06/12** para não tirar horas da pesquisa.

Feito:
- `packages/compiler/src/lexer.ts`: palavras-chave sem diferença de maiúsculas e acentos
  (`então` = `entao`), números com ponto, `0..4`, textos, comentários `//` fora do fluxo, `←`
  aceito como `<-`, erros L001/L002.
- `packages/compiler/src/parser.ts`: descida recursiva, precedência
  `ou < e < nao < comparações < + - < * / div mod < - unário`, ids pelo caminho estrutural,
  spans que incluem parênteses do operando, formato `x:0:2`, `passo -1`, funções e
  procedimentos, vetores; **recuperação por comando** (um comando quebrado vira nó `erro`);
  mensagens em português (S001–S014) com dicas (`=` no lugar de `<-`, palavra reservada como
  nome, bloco não fechado com a linha onde abriu).
- `packages/compiler/src/mapa-ptbr.ts`: AST → mapa id → ranges e tipos, no formato das fixtures.
- Testes (39 novos): **as 5 fixtures batem id a id, posição a posição e tipo a tipo com o que foi
  marcado à mão**; os 19 `programa.por` do spike passam sem erro; precedência, spans, recuperação
  e mensagens.

Decisões que o parser tomou e precisam de confirmação: D9 (maiúsculas em nomes) e D10
(precedência do `nao`) em `docs/decisoes.md`.

Catálogo de erros: ✅ documentado em `docs/erros.md` (cada código, quando aparece, mensagem e
exemplo). Regra: todo código novo entra lá no mesmo commit.

Números de referência (16/11): `lexer.ts` ~190 linhas, `parser.ts` ~600, `mapa-ptbr.ts` ~95;
47 testes no compilador (5 do lexer, 5 das fixtures, 19 do spike, 4 de estrutura, 6 de erros,
6 de marcadores, 2 de linguagens).

Falta da S1, em ordem:
1. **Comentários como nós** (`comentario`): hoje o lexer guarda os comentários à parte. Ligar
   cada um ao comando seguinte (ou ao bloco) para os geradores replicarem (`#` em Python, `//` nas
   outras). Aceite: um comentário em `programa.por` aparece no mapa e acende nos 5 painéis.
2. **Página de debug da AST** em `apps/web` (`?debug=ast`): editor PT-BR simples, árvore da AST,
   erros com linha/coluna e o mapa PT-BR. Serve para o Renato revisar o parser sem ler código.
3. **`ast.json` das fixtures**: gerar com o parser no `gerar-fixtures.ts` e conferir no
   `--verificar` (substitui o snapshot planejado abaixo).

Depois da S1 (S2/S3): análise semântica — tabela de símbolos, escopos, tipos, erros em português
(variável não declarada, tipo incompatível, `retorne` fora de função, chamada com aridade errada),
as pegadinhas detectáveis estaticamente (texto com acento, divisão por literal zero) e a decisão
D9 (aviso de mesmo nome com grafias diferentes). Em seguida, o interpretador de referência (S4),
que habilita o botão "Executar" com `leia` interativo, e o emissor/geradores (S5–S7), que tornam o
PT-BR editável com as 5 linguagens ao vivo.

Plano original, mantido como referência:
1. `packages/compiler/src/lexer.ts` + testes (palavras-chave do subconjunto, posições 1-indexadas).
2. `parser.ts` por descida recursiva + Pratt para expressões, produzindo os tipos de `ast.ts`.
3. Recuperação por comando (nó `Erro`), IDs por caminho estrutural.
4. Corpus: começar pelos 5 programas do spike + 5 das fixtures (já têm `programa.por`).
5. Teste de snapshot: `programa.por` → `ast.json` esperado das fixtures.

---

## 7. Achados técnicos

### 7.1 Divergências confirmadas (spike, 16/11/2026)

| Caso | Quem destoa | Tratamento |
|---|---|---|
| `div`/`mod` com operando negativo | Python (arredonda para baixo) | Pegadinha no interpretador (já na spec) |
| Overflow de 32 bits | Python e PHP não estouram; Java dá a volta; C/C++ é comportamento indefinido (no teste, deu o mesmo valor do Java) | Pegadinha no interpretador (já na spec) |
| Real formatado: empate exato (`0.125`) | Java com `String.format` (HALF_UP) | Resolvido: `BigDecimal` + `HALF_EVEN` (D1) |
| Real formatado: valor comum (`2.675`) | Java com `String.format` (arredonda a partir do decimal curto) | Resolvido: `BigDecimal` + `HALF_EVEN` (D1) |
| Zero negativo (`-0.001` com 2 casas) | Java com `BigDecimal` dá `0.00`; as outras dão `-0.00` | Pegadinha no interpretador |

### 7.2 Confirmações (funcionou como a spec previa)

- `Locale.ROOT` no Java imprime ponto mesmo com a JVM em pt-BR.
- `Scanner.nextLine()` + `Integer.parseInt(...trim())` evita a armadilha `nextInt`/`nextLine`.
- `fgets` + `sscanf` em C e `getline` + `stoi/stod` em C++ leem números com espaços nas pontas.
- `printf("%.2F")` no PHP 8.2 formata igual a C e Python.
- PHP: `array &$w` faz o vetor ser alterado dentro do procedimento.
- C: `strcpy`/`strcat`/`strcmp` com `char[256]` compilam sem aviso com `-Wall -Wextra -Werror`.
- `printf("100%%")` em C; nas outras linguagens o `%` é literal.

### 7.3 Observações de estilo para os geradores

- Inicialização padrão + primeira atribuição gera `total = 0` duas vezes (ver
  `p4-vetor-funcao/main.py`). Proposta D6: fundir.
- Python usa `range(0, 5)`; o idiomático seria `range(5)`. Regra para o gerador: omitir o início
  quando for o literal `0` e o passo for 1.
- C: funções definidas depois do `main`, com protótipos antes. C++: definidas antes do `main`, sem
  protótipos. Manter as duas convenções e explicar a diferença nos cartões.

---

## 8. Decisões

Todas em [`docs/decisoes.md`](./decisoes.md). Pendentes:

| # | Decisão | Recomendação | Prazo |
|---|---|---|---|
| D2 | Índice de vetor | 0, confirmar com professores | G0 |
| D3 | Repo público + MIT | Decidir antes de publicar o protótipo | G0 |
| D10 | Precedência do `nao` | Abaixo das comparações (`nao a > b` = `nao (a > b)`, já implementado); confirmar com professores | G0 |
| D4 | Nome/branding | "EducAI" é provisório | pós-G0 |
| D9 | Nomes diferenciam maiúsculas? | Diferenciar (implementado) e avisar grafias diferentes na semântica | S3 |
| D6 | Fundir inicialização padrão com a 1ª atribuição | Fundir | S5 |
| D7 | `std::` explícito em C++ | `std::` | S7 |

---

## 9. Riscos e pontos de atenção

| Risco | Situação | Ação |
|---|---|---|
| Pesquisa com alunos/professores não acontecer a tempo | **Alto**, nada agendado | Agendar até 22/11 (§6.1) |
| 14 h/semana do Renato não se confirmarem | Médio | Confirmar; se não, cortar pela IA (S9) — `sprint.md` §0 |
| Revisão do código acumular (Claude escreve mais rápido do que o Renato revisa) | Médio | Revisar por PR pequeno depois do G0; a página de debug da AST (§6.8) facilita |
| Catálogo de explicações com erro conceitual chegar aos alunos | Médio | Revisão do Renato antes de 25/11 (§6.4) |
| Acentos em `caractere` | ✅ Resolvido: só ASCII no v1 (decisão 012) | Semântica avisa (S2/S3) |
| Repositório público expõe plano e protótipo | Baixo/médio | D3 |
| Convite de colaborador pendente para quem saiu da equipe | Baixo | Decidir manter ou cancelar (§2) |

---

## 10. Checklist da próxima sessão

Em ordem:

1. [ ] `git fetch && git checkout feat/fase0-setup && pnpm install && pnpm test`
2. [ ] Abrir o Docker Desktop (§4) e conferir `docker run --rm educai-runtimes` (reconstruir a
       imagem se tiver sido apagada).
3. [ ] **Renato:** fazer merge do PR #1 (merge commit) e depois do PR #2.
4. [ ] **Renato:** agendar professores e alunos (§6.1) — até 22/11.
5. [ ] **Renato:** revisar `catalogo/*.json` e `fixtures/*/notas.json` (§6.4) — antes de 25/11.
6. [ ] **Renato:** confirmar 14 h/semana (§2) e decidir onde publicar o protótipo (D3).
7. [ ] **Claude:** terminar a S1 (§6.8): comentários como nós → página de debug da AST →
       `ast.json` das fixtures.
8. [ ] **Claude:** começar a S2/S3 (análise semântica), depois o interpretador (S4).

Já feito: PR #2 com CI verde; spike `p6`–`p14` e D1; fixtures; protótipo; replanejamento v2.1;
lexer, parser, mapa PT-BR e catálogo de erros.

Para retomar com o Claude, basta pedir: *"leia docs/PROGRESSO.md e continue do item N do
checklist"*.
