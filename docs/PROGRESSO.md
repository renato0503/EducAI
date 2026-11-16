# EducAI — Progresso e continuidade

> **Leia isto primeiro ao retomar o trabalho.** Este documento registra o estado exato do projeto,
> o que foi feito, como reproduzir, o que falta e em que ordem, com critérios de aceite.
>
> Última atualização: **16/11/2026**, sessão 2 da Fase 0 (PRs abertos, CI verde, D1 fechada, fixtures e protótipo prontos).
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
| Plano | v2 em `context.md`, `sprint.md`, `docs/semantica.md` — **PR #1 aberto, aguardando merge do Renato** |
| Código | Monorepo TypeScript verde localmente **e no CI do GitHub** — PR #2 |
| Spike de equivalência | **Concluído**: 14 programas do spike + 5 fixtures × 5 linguagens (40 combinações), nenhuma divergência inesperada; pegadinhas documentadas (`spike/README.md`) |
| Fixtures (0.2) | **Concluídas**: 5 programas didáticos com mapa nó → ranges nas 5 linguagens, gerador e verificação no CI (`fixtures/README.md`) |
| Achado principal | Java arredondava real diferente das outras 4 → **resolvido com `BigDecimal` + `HALF_EVEN` (D1, decisão 011)** |
| Equipe | **Mudou hoje:** Vitório saiu da divisão; tudo fica com Renato (com Claude). `sprint.md` ainda não foi replanejado |
| Bloqueio para o G0 | Tarefas 0.3 e 0.4 (alunos e professores) dependem só do Renato e ainda não começaram |

Tarefas da Fase 0:

| # | Tarefa | Estado |
|---|---|---|
| 0.1 | Protótipo com 5 abas | 🟡 construído e testado; falta **revisão do catálogo pelo Renato** e publicar (D3) |
| 0.2 | Fixtures dos 5 programas | ✅ concluído (falta só o `ast.json` completo, adiado para o parser da S1) |
| 0.3 | Think-aloud com 6–10 alunos | ❌ não iniciado (roteiro em `docs/fase0-roteiros.md`) |
| 0.4 | Entrevistas com 3–5 professores + turma do piloto | ❌ não iniciado (roteiro em `docs/fase0-roteiros.md`) |
| 0.5 | Spike de equivalência | ✅ concluído |
| 0.6 | Fechar `docs/semantica.md` v1 | ✅ todas as regras testadas no spike (`p1`–`p14`); falta só D2 (índice de vetor, com professores) |
| 0.7 | Monorepo, lint, testes, CI | ✅ CI verde no GitHub (PR #2); falta só proteger a `main` |

---

## 2. Mudança de equipe e impacto no plano

**Decisão 006 (16/11/2026):** o Vitório não faz mais parte da divisão de tarefas. Todo o trabalho
fica com o Renato, com o Claude escrevendo código e documentação sob a direção dele.

Impacto no `sprint.md` (ainda **não** atualizado; é a tarefa D5):

- O orçamento atual assume 2 pessoas × 14 h/semana = **~725 h de capacidade** e ~570 h
  planejadas. Com uma pessoa só, a capacidade humana cai para **~360 h**.
- A parte de digitação de código fica muito mais barata com o Claude, mas continuam sendo do
  Renato, sem atalho: decisões, revisão de todo o código, pesquisa com alunos e professores,
  curadoria do catálogo de explicações, piloto e ensaio.
- **Proposta para o replanejamento** (validar antes de aplicar):
  1. Manter as datas dos gates (G0 06/12, G1 07/02, G2 21/03, G3 04/04, G4 02/05) e trocar a coluna
     "Dono" por um único dono.
  2. Recontar as horas por tarefa separando **horas do Renato** (decidir, revisar, testar,
     pesquisar, curar) de **trabalho delegado ao Claude** (escrever código e testes).
  3. Se a soma das horas do Renato passar de ~290 h (80% de 360 h), aplicar a ordem de corte do
     `sprint.md` §13 já no planejamento, começando pela IA (S9).
  4. Remover do `sprint.md` e do `README.md` as menções ao Vitório como responsável.
- O convite de colaborador do GitHub para `garageunicorn` foi enviado em 16/11. Decidir se
  continua (acesso de escrita) ou se deve ser cancelado:
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
├── README.md, context.md, sprint.md, dor.md        documentação do produto (plano v2)
├── prompt-avaliacao.md                             prompt da avaliação crítica (fora do git, de propósito)
├── docs/
│   ├── PROGRESSO.md        ← este documento
│   ├── decisoes.md         registro de decisões tomadas e pendentes (D1–D7)
│   ├── semantica.md        contrato de semântica PT-BR → 5 linguagens (atualizado com o spike)
│   └── fase0-roteiros.md   roteiros das tarefas 0.3 (alunos) e 0.4 (professores)
├── package.json            raiz do monorepo (scripts: lint, typecheck, test, build, dev, spike)
├── pnpm-workspace.yaml     workspaces packages/* e apps/*; allowBuilds esbuild
├── pnpm-lock.yaml
├── tsconfig.base.json      TS estrito (noUncheckedIndexedAccess, exactOptionalPropertyTypes…)
├── eslint.config.js        ESLint 9 flat + typescript-eslint
├── .prettierrc.json, .prettierignore, .editorconfig, .gitattributes (LF), .nvmrc (24)
├── .github/
│   ├── workflows/ci.yml          jobs "qualidade" e "equivalencia"
│   └── pull_request_template.md
├── packages/compiler/      @educai/compiler
│   └── src/
│       ├── ast.ts              esquema da AST/IR (context.md §6.3) + tipos de saída dos geradores
│       ├── linguagens.ts       listas do MVP (5) e da v1.1 (3) + nomes de exibição
│       ├── linguagens.test.ts  2 testes
│       └── index.ts
├── apps/web/               @educai/web — Vite 6 + React 18, casca que lista as linguagens
│   ├── index.html, vite.config.ts, tsconfig.json
│   └── src/main.tsx, src/App.tsx
└── spike/                  tarefa 0.5 (ver spike/README.md)
    ├── Dockerfile, run.mjs, README.md, resultado-docker.md
    └── programas/p1-texto … p5-fatorial
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

### 0.7 — Monorepo, lint, testes, CI (🟡)

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

Verificado localmente: `pnpm lint`, `pnpm typecheck`, `pnpm test` (2 testes) e `pnpm build`
passam.

Falta:
- [x] CI rodou no GitHub (PR #2): `qualidade` 27 s, `equivalencia` 1 min 16 s, ambos verdes.
  O GitGuardian (app instalado no repositório) também passou.
- [ ] Proteção da `main` (exigir PR + CI verde) em Settings → Branches.
- [ ] Fixar a imagem base do Docker por digest (TODO no `spike/Dockerfile`).

### 0.5 — Spike de equivalência (✅)

5 programas escritos à mão em PT-BR e nas 5 linguagens, seguindo `docs/semantica.md`, com 11
entradas no total. Executor `spike/run.mjs` com modos local, estrito e Markdown. Resultado
completo em `spike/resultado-docker.md` e resumo em `spike/README.md`.

**Resultado:** todas as saídas iguais ao esperado, fora as linhas de divergência prevista; todas as
divergências previstas se confirmaram; compilação sem avisos com `-Werror` em C, C++ e Java.
Detalhes em §7.

### 0.6 — `docs/semantica.md` v1 (🟡)

Atualizado com o spike: tabela de arredondamento, decisão pendente D1, regra de `leia` para
`caractere` (só remove o fim de linha), concatenação em C com `strcpy` + `strcat`.

Falta: decidir D1 e cobrir os casos extras do §6.2.

### 0.1, 0.2, 0.3, 0.4 (❌)

Não iniciadas. Instruções detalhadas em §6.

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

### 6.6 — Replanejar `sprint.md` (D5) — ~2 h

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

### 6.8 — Depois do G0 (Sprint 1, a partir de 07/12)

Ver `sprint.md` §5. Primeiros passos concretos:
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

Todas em [`docs/decisoes.md`](./decisoes.md). Pendentes que bloqueiam o G0:

| # | Decisão | Recomendação |
|---|---|---|
| D2 | Índice de vetor | 0, confirmar com professores |
| D3 | Repo público + MIT | Decidir antes de publicar o protótipo |
| D5 | Replanejar sem o Vitório | Ver §2 |

---

## 9. Riscos e pontos de atenção

| Risco | Situação | Ação |
|---|---|---|
| Pesquisa com alunos/professores não acontecer a tempo | **Alto**, nada agendado | Agendar até 22/11 (§6.1) |
| Uma pessoa só para tudo | Alto | Replanejar (§2); Claude no código, Renato na revisão e pesquisa |
| Acentos em `caractere` | Médio, não testado | `p10` do §6.2 |
| Repositório público expõe plano e protótipo | Baixo/médio | D3 |
| Convite de colaborador pendente para quem saiu da equipe | Baixo | Decidir manter ou cancelar (§2) |

---

## 10. Checklist da próxima sessão

Em ordem:

1. [ ] `git fetch && git checkout feat/fase0-setup && pnpm install`
2. [ ] Abrir o Docker Desktop (§4) e conferir `docker run --rm educai-runtimes` (reconstruir a
       imagem se tiver sido apagada).
3. [ ] **Renato:** fazer merge do PR #1 (merge commit) e depois do PR #2.
4. [x] PR #2 aberto e CI verde.
5. [ ] Agendar professores e alunos (§6.1) — se ainda não foi feito.
6. [x] Spike `p6-arredondamento` e D1 fechada.
7. [x] Fixtures + script de marcadores (§6.3).
8. [x] Protótipo em `apps/web` (§6.4) — construído. **Pendente:** revisar `catalogo/*.json` e decidir onde publicar.
9. [x] Spike `p7`–`p14` (§6.2.2).
10. [ ] Replanejar `sprint.md` (§6.6).

Para retomar com o Claude, basta pedir: *"leia docs/PROGRESSO.md e continue do item N do
checklist"*.
