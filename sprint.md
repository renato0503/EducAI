# EducAI — Plano de Sprints v2 (Validação → MVP com 5 linguagens → piloto)

> Plano de execução revisado, derivado do `context.md` v2. Cada sprint tem orçamento em horas,
> dono por tarefa, entregáveis e critérios de aceite verificáveis.
>
> **Premissa mantida:** IDE com ou sem IA que, conforme o código surge, mostra cada elemento e o
> replica nas principais linguagens — **5 no MVP** (Python, Java, C, C++, PHP) e **8 na v1.1**
> (+ JavaScript, C#, Go).

---

## 0. Atualização de 16/11/2026 — equipe: Renato + Claude (v2.1)

**Decisão 006:** o Vitório saiu da divisão de tarefas. O trabalho passa a ser do **Renato**, com o
**Claude** escrevendo código, testes e documentação sob a direção e a revisão dele. As datas dos
gates **não mudam** (o piloto depende do semestre letivo).

### Como ler as tabelas das seções seguintes

As tabelas por sprint (§4–§9) mantêm a divisão original "R" / "V" porque descrevem o **trabalho**.
A partir de agora:

| Na tabela | Quem faz | Horas do Renato |
|---|---|---|
| Código e testes (qualquer dono) | **Claude** escreve; Renato revisa, roda e aprova o PR | ~25–30% das horas da tarefa |
| Pesquisa, entrevistas, sessões, piloto, ensaio | **Renato** | 100% |
| Conteúdo pedagógico (cartões, notas, programas do corpus) | Claude rascunha; **Renato revisa e decide** | ~50% |
| Decisões (gates, cortes, D1–D7) | **Renato** | 100% |

### Novo orçamento (horas do Renato)

Capacidade do Renato: 14 h/semana × 25 semanas + ~4 h/semana × 3 semanas de recesso ≈ **362 h**.
Planejando a 80% (folga de 20%): **~290 h**.

| Bloco | Período | Horas do Renato (estimativa) | O que pesa |
|---|---|---|---|
| Fase 0 (restante) | 16/11 – 06/12 | 30 h | entrevistas e sessões (20 h), revisão do catálogo (6 h), ensaio e publicação (4 h) |
| S1 | 07/12 – 20/12 | 12 h | revisar parser e mensagens de erro |
| S2 (recesso) | 21/12 – 10/01 | 8 h | revisar semântica |
| S3 | 11/01 – 24/01 | 14 h | revisar semântica e editor ao vivo, testar com 1 aluno |
| S4 | 25/01 – 07/02 | 14 h | revisar interpretador e pegadinhas; gate G1 |
| S5 | 08/02 – 21/02 | 14 h | revisar emissor e gerador Python |
| S6 | 22/02 – 07/03 | 16 h | revisar Java, PHP; cartões |
| S7 | 08/03 – 21/03 | 16 h | revisar C, C++, fuzzer; cartões; gate G2 |
| S8 | 22/03 – 04/04 | 16 h | testar modo construção e atividades com alunos; gate G3 |
| S9 (IA, cortável) | 05/04 – 18/04 | 12 h | prompts, avaliação dos 20 pedidos |
| S10 | 19/04 – 02/05 | 24 h | LGPD com a instituição, ensaio, material do professor; gate G4 |
| S11 | 03/05 – 16/05 | 30 h | 2 sessões do piloto, observação, correções urgentes |
| S12 | 17/05 – 30/05 | 24 h | análise, relatório, decisão |
| **Total** | **28 semanas** | **~230 h** | **folga ≈ 60 h sobre os 290 h** |

**Leitura:** o plano cabe, **se** o Renato tiver de fato ~14 h/semana. A maior concentração de horas
está no que não dá para delegar: Fase 0 (pesquisa) e piloto (S10–S12).

### O que muda no cronograma

- **A Fase 0 adiantou:** 0.1 (protótipo), 0.2 (fixtures), 0.5 (spike), 0.6 (semântica) e 0.7
  (monorepo + CI) já estão feitos em 16/11. O que resta é o que depende de pessoas: 0.3, 0.4 e
  a revisão do catálogo.
- **Folga do código:** como o código deixa de ser o gargalo, sprints de implementação podem
  terminar antes. Regra: **não puxar a data do piloto**; a folga vai, nesta ordem, para
  (1) qualidade e testes com alunos reais, (2) a IA opcional (S9), (3) **antecipar a v1.1**
  (JavaScript, C#, Go) para antes do piloto, se o G3 for cumprido com pelo menos 2 semanas de
  sobra.
- **Revisão de PR:** sem segunda pessoa, a revisão é do Renato sobre o código do Claude. O CI
  (lint, tipos, testes, fixtures, equivalência nas 5 linguagens) é obrigatório e não pode ser
  contornado.
- **Riscos novos:** (a) uma pessoa só para pesquisa e piloto — sem substituto se ficar doente na
  semana do piloto → combinar com o professor uma data alternativa; (b) revisão superficial do
  código gerado → o Renato deve rodar o protótipo/IDE a cada sprint, não só ler o diff.

---

## 1. Premissas (plano original, 12/11/2026)

> Mantido como registro. Onde houver conflito, vale a §0.

- **Equipe:** Renato (R) e Vitório (V), **~14 h/semana cada** (28 h/semana a dupla).
- **Início:** segunda, 16/11/2026. **Fim do MVP + piloto:** 30/05/2027 (28 semanas).
- **Recesso:** 21/12/2026 – 10/01/2027 com ~30% da capacidade (considerado no orçamento).
- **Cadência:** sprints de 2 semanas (Fase 0 tem 3; Sprint 2 cobre o recesso com 3).
- **Sincronização:** 30 min por semana + review/demo de 45 min no fim de cada sprint.
- **Controle de horas:** cada um anota horas reais por tarefa. Se uma sprint estourar mais de 20%,
  aplica-se a **ordem de corte** (§13) na review — sem "recuperar no fim de semana".

### Divisão de responsabilidades

| Renato (caminho crítico do compilador) | Vitório (experiência + metade dos geradores) |
|---|---|
| Parser, semântica, interpretador | App, Monaco, highlight cruzado, modo construção |
| Emissor + geradores Python, Java, C | Geradores **PHP** e **C++** (derivados de Python e C) |
| Testes diferenciais, fuzzer | Catálogo de explicações (formato + metade dos cartões) |
| Copiloto (IA) | API pequena, turma, telemetria, deploy |
| Ambos: corpus, cartões, piloto, revisão de todo PR | |

O que desacopla os dois desde o primeiro dia: os **arquivos de fixture** da Fase 0 (5 programas
com AST, código nas 5 linguagens e mapa de tokens escritos à mão). O Vitório constrói a UI sobre
eles enquanto o compilador ainda não existe.

### Convenções

- **DoD de tarefa:** PR revisado pelo Renato (antes: "pelo outro"), testes passando, CI verde, doc mínima atualizada.
  (Deploy em staging contínuo a partir da Sprint 5.)
- **Gate de fase:** a fase seguinte só começa com os critérios do gate cumpridos ou com corte
  explícito registrado em `docs/decisoes.md`.
- **Toda construção nova da linguagem** entra com: programa no corpus + regra em
  `docs/semantica.md` + teste diferencial + cartão no catálogo.

---

## 2. Orçamento de horas

| Bloco | Período | Capacidade | Planejado | R | V |
|---|---|---|---|---|---|
| Fase 0 — Validação | 16/11 – 06/12 | 84 h | 70 h | 32 | 38 |
| S1 — Parser + casca da IDE | 07/12 – 20/12 | 56 h | 46 h | 24 | 22 |
| S2 — Semântica I + catálogo (recesso) | 21/12 – 10/01 | ~25 h | 20 h | 10 | 10 |
| S3 — Semântica II + editor ao vivo | 11/01 – 24/01 | 56 h | 46 h | 23 | 23 |
| S4 — Interpretador + console | 25/01 – 07/02 | 56 h | 46 h | 23 | 23 |
| S5 — Emissor + Python + CI diferencial | 08/02 – 21/02 | 56 h | 46 h | 23 | 23 |
| S6 — Java + PHP + C (início) | 22/02 – 07/03 | 56 h | 46 h | 23 | 23 |
| S7 — C + C++ + fuzzer | 08/03 – 21/03 | 56 h | 46 h | 23 | 23 |
| S8 — Modo construção + atividades | 22/03 – 04/04 | 56 h | 46 h | 23 | 23 |
| S9 — IA opcional + API de turma | 05/04 – 18/04 | 56 h | 46 h | 23 | 23 |
| S10 — Preparação do piloto + segurança | 19/04 – 02/05 | 56 h | 40 h | 18 | 22 |
| S11 — Piloto | 03/05 – 16/05 | 56 h | 36 h | 16 | 20 |
| S12 — Análise e decisão | 17/05 – 30/05 | 56 h | 36 h | 22 | 14 |
| **Total** | **28 semanas** | **~725 h** | **~570 h** | **283** | **287** |

**Folga: ~155 h (~21%).** É ela que absorve doença, provas, trabalho e as estimativas erradas (elas
vão estar erradas). As estimativas são de ordem de grandeza e devem ser recalibradas na review da
S3 com as horas reais das primeiras sprints.

---

## 3. Visão geral e gates

| Fase | Sprints | Gate | Data | Critério de saída |
|---|---|---|---|---|
| **0 — Validação** | F0 | **G0** | 06/12 | Tese com sinal positivo, piloto confirmado, spike de equivalência verde, decisões fechadas |
| **1 — Núcleo** | S1–S4 | **G1** | 07/02 | "VisualG no navegador": escreve, vê erros em PT-BR, executa com `leia` interativo |
| **2 — 5 linguagens** | S5–S7 | **G2** | 21/03 | Python, Java, C, C++ e PHP gerados, mapeados e **idênticos no CI** |
| **3 — Pedagogia** | S8 | **G3** | 04/04 | MVP **sem IA** completo: modo construção, catálogo 100%, atividades. Congelamento do núcleo |
| **4 — IA opcional** | S9 | — | 18/04 | Copiloto passo a passo (cortável sem afetar G3) |
| **5 — Piloto** | S10–S12 | **G4** | 02/05 | Segurança, LGPD, ensaio e material prontos antes do primeiro aluno |

**Caminho crítico:** spec de semântica → parser → semântica → interpretador → emissor/mapa →
geradores → modo construção → piloto.
A UI **não** está no caminho crítico até a S5, graças às fixtures.

---

## 4. Fase 0 — Validação (16/11 – 06/12, 3 semanas)

**Objetivo:** descobrir em 3 semanas, sem compilador, se a tese se sustenta e onde a equivalência
entre linguagens quebra.

| # | Tarefa | Dono | h |
|---|---|---|---|
| 0.1 | **Protótipo estático** (HTML/React simples): 5 programas, editor PT-BR somente leitura, 5 abas, modos grade/foco, highlight cruzado com mapa manual, cartões escritos à mão, "modo construção" simulado (os comandos aparecem um a um e acendem em todas as abas) | V | 24 |
| 0.2 | Escrever os 5 programas em PT-BR + nas 5 linguagens + **fixtures JSON** (AST, código, mapa nó → ranges, nós sintéticos) | R | 12 |
| 0.3 | **Think-aloud com 6–10 alunos** (30 min cada): usar o protótipo e depois prever a saída de um trecho Java/C inédito. Metade faz a mesma tarefa com ChatGPT ("traduza e explique") como baseline | R+V | 12 |
| 0.4 | **Entrevistas com 3–5 professores:** sintaxe que usam, índice de vetor, cola com IA, o que precisam para usar em sala. **Fechar turma e data do piloto** | R+V | 8 |
| 0.5 | **Spike de equivalência:** 5 programas difíceis (texto em C, `leia` misto, real com 2 casas, divisão, vetor em função, fatorial grande) rodando nos 5 runtimes via Docker; registrar todas as divergências | R | 8 |
| 0.6 | Fechar `docs/semantica.md` v1 com o resultado do spike | R | 2 |
| 0.7 | Monorepo TS (pnpm), lint, testes, CI esqueleto, template de PR, `docs/decisoes.md` | V | 4 |

**Entregáveis:** protótipo publicado; `fixtures/` com 5 programas; relatório curto de validação
(`docs/validacao-f0.md`); `docs/semantica.md` v1; imagem Docker com os 5 runtimes; repo com CI.

**Gate G0 (06/12) — seguir se:**
- [ ] ≥ 60% dos alunos preveem corretamente a saída do trecho inédito **e** o grupo do protótipo
      não fica atrás do baseline ChatGPT (ou os think-alouds mostram vantagem qualitativa clara).
- [ ] ≥ 1 professor com turma e datas do piloto confirmadas por escrito.
- [ ] Os 5 programas do spike produzem saída idêntica nos 5 runtimes seguindo as regras escritas.
- [ ] Decisões de context.md §10 fechadas (índice de vetor, sintaxe, licença).

**Se o G0 falhar:** não descartar o projeto — ajustar a forma. Exemplos: modo foco como padrão (1–2
linguagens + "ver nas outras"), mais atividades e menos abas, ou outro público. Registrar a decisão
e refazer só a parte afetada do plano.

---

## 5. Fase 1 — Núcleo do compilador + casca da IDE

### Sprint 1 (07/12 – 20/12) — Parser e IDE sobre fixtures

| # | Tarefa | Dono | h |
|---|---|---|---|
| 1.1 | Lexer com posições (linha/coluna), palavras-chave do subconjunto | R | 5 |
| 1.2 | Parser por descida recursiva + Pratt para expressões; AST tipada com spans | R | 11 |
| 1.3 | **Recuperação por comando:** um comando com erro vira nó `erro` e o resto do programa continua parseado (necessário para gerar enquanto o aluno digita) | R | 4 |
| 1.4 | IDs por caminho estrutural; serialização JSON; corpus com 15 programas + snapshots | R | 4 |
| 1.5 | App Vite + React; layout editor PT-BR + 5 abas Monaco read-only; modos grade/foco | V | 10 |
| 1.6 | Highlight cruzado **multi-range** bidirecional sobre as fixtures (decorations só do nó ativo) | V | 8 |
| 1.7 | Testes de componente do highlight (Vitest + Playwright) | V | 4 |

**Aceite:** 15/15 programas do corpus parseiam; erro de sintaxe aponta linha/coluna; um programa com
1 comando quebrado ainda produz AST para os outros; clicar num elemento de qualquer aba das
fixtures acende todos os seus ranges nas outras 5.

### Sprint 2 (21/12 – 10/01, recesso) — Semântica I + formato do catálogo

| # | Tarefa | Dono | h |
|---|---|---|---|
| 2.1 | Tabela de símbolos, escopos (global/função), tipos, declaração/redeclaração | R | 10 |
| 2.2 | **Schema do catálogo** (`conceito.basico`, `conceito.aprofundar`, por linguagem: `como`, `por_que`, `pegadinha`; slots `{{nome}}`, `{{tipo}}`, `{{valor}}`) + painel de explicação lendo o catálogo | V | 6 |
| 2.3 | Primeiros 10 cartões de conceito (rascunho com LLM offline + revisão humana) | V | 4 |

**Aceite:** erros "variável não declarada" e "tipo incompatível" em PT-BR com span; painel mostra o
cartão de qualquer nó das fixtures com slots preenchidos.

### Sprint 3 (11/01 – 24/01) — Semântica II + editor ao vivo

| # | Tarefa | Dono | h |
|---|---|---|---|
| 3.1 | Aridade, retorno, `para` (passo literal, variável de controle não atribuível), vetores (tamanho constante), identificadores (reservados de todas as 8 linguagens, transliteração) | R | 14 |
| 3.2 | Catálogo de erros com código + texto didático + sugestão (≥ 30 erros) | R | 7 |
| 3.3 | Tokenizador Monarch do PT-BR; parse + semântica **a cada tecla** (debounce 150 ms) no navegador; squiggles + tooltip | V | 14 |
| 3.4 | Corpus +15 programas (total 30), incluindo os do professor da Fase 0 | V | 7 |
| 3.5 | Recalibrar o orçamento com as horas reais de F0–S3 | R+V | 4 |

**Aceite:** os 30 programas passam na semântica; 10 mensagens de erro revisadas por um aluno
iniciante são entendidas; editar o PT-BR mostra erros em < 200 ms.

### Sprint 4 (25/01 – 07/02) — Interpretador de referência + console

| # | Tarefa | Dono | h |
|---|---|---|---|
| 4.1 | Interpretador da IR com a semântica de `docs/semantica.md` | R | 14 |
| 4.2 | **Pegadinhas estritas:** overflow, `div`/`mod` com negativo, divisão por zero, índice fora, texto > 255, recursão > 500, variável de `para` após o laço, real com vírgula na entrada; cada uma com mensagem e "como cada linguagem se comportaria" | R | 9 |
| 4.3 | Console com `leia` **interativo**, limite de passos (anti-laço infinito) e botão parar | V | 10 |
| 4.4 | Cartões de conceito restantes (todos os tipos de nó) | V | 9 |
| 4.5 | Salvar rascunho no `localStorage` | V | 4 |

**Gate G1 (07/02):** um aluno consegue escrever, ver erros em PT-BR e executar os 30 programas do
corpus no navegador; cada pegadinha tem programa de teste que a dispara.

---

## 6. Fase 2 — As 5 linguagens

**Regra:** uma linguagem só entra nas abas reais quando passa em 100% dos testes diferenciais do
corpus. Até lá, a aba mostra a fixture ou "em breve".

### Sprint 5 (08/02 – 21/02) — Emissor, mapa e Python

| # | Tarefa | Dono | h |
|---|---|---|---|
| 5.1 | **Emissor** `emit(texto, nodeId)` com indentação, mapa `nodeId → [ranges]` e nós sintéticos | R | 7 |
| 5.2 | Gerador **Python** (idiomático: `range`, f-strings, `def`) | R | 8 |
| 5.3 | **CI diferencial:** imagem Docker fixa; para cada programa × entrada, compara interpretador × runtime real | R | 8 |
| 5.4 | Trocar fixtures por geração real nas abas; staging contínuo | V | 8 |
| 5.5 | Teste de **cobertura do mapa** (todo caractere não-branco pertence a um nó) | V | 5 |
| 5.6 | **Diff de AST** por lista de comandos (tipo + hash) → conjunto de nós novos/alterados | V | 10 |

**Aceite:** 30/30 programas idênticos em Python; cobertura do mapa 100%; inserir um comando marca
só ele (e seus filhos) como novo.

### Sprint 6 (22/02 – 07/03) — Java, PHP e início do C

| # | Tarefa | Dono | h |
|---|---|---|---|
| 6.1 | Gerador **Java** (`class Main`, `static`, `Scanner` + `nextLine`, `Locale.ROOT`) + sintéticos | R | 13 |
| 6.2 | Gerador **C** — parte 1: `main`, tipos numéricos, `printf`/`fgets`+`sscanf`, protótipos | R | 10 |
| 6.3 | Gerador **PHP** (derivado do Python: `$`, `echo`/`printf("%.2F")`, `fgets(STDIN)`, `array &$v`, `global`) | V | 12 |
| 6.4 | Cartões por linguagem: Python e PHP (incluindo sintéticos) | V | 11 |

**Aceite:** 30/30 idênticos em Java e PHP; C compila sem aviso nos programas só numéricos.

### Sprint 7 (08/03 – 21/03) — C completo, C++ e fuzzer

| # | Tarefa | Dono | h |
|---|---|---|---|
| 7.1 | Gerador **C** — parte 2: `caractere` como `char[256]` (`snprintf`, `strcmp`, `fgets` sem `\n`), vetores, `stdbool.h` | R | 13 |
| 7.2 | **Fuzzer:** gera programas aleatórios bem tipados a partir da gramática + entradas; roda o diferencial nas 5 linguagens no CI (lote noturno) | R | 10 |
| 7.3 | Gerador **C++** (derivado do C: `iostream`, `std::string`, `getline`, `fixed`/`setprecision`) | V | 10 |
| 7.4 | Cartões por linguagem: Java, C e C++ (incluindo sintéticos) | V | 13 |

**Gate G2 (21/03):**
- [ ] 30/30 programas do corpus com saída idêntica nas 5 linguagens e no interpretador.
- [ ] Fuzzer: ≥ 1.000 programas sem divergência (toda divergência encontrada vira regra ou correção).
- [ ] Compilação sem avisos (`-Wall -Wextra -Werror`, `javac -Xlint`, `php -l`).
- [ ] Todo nó e todo sintético das 5 linguagens tem cartão revisado.

---

## 7. Fase 3 — Experiência pedagógica

### Sprint 8 (22/03 – 04/04) — Modo construção + atividades

| # | Tarefa | Dono | h |
|---|---|---|---|
| 8.1 | **Modo construção:** a cada comando completo, os nós novos acendem nas 5 abas por ~2 s e geram um cartão no **fio de elementos** (clicável, com histórico da sessão) | V | 10 |
| 8.2 | **"Reproduzir construção":** reexecuta o programa inteiro comando a comando, acendendo e explicando cada elemento (para o professor apresentar) | V | 5 |
| 8.3 | Atividade **"preveja a saída"** (aluno digita, interpretador confere) | R | 5 |
| 8.4 | Atividade **"complete a lacuna"**: esconde os ranges de um nó numa linguagem; resposta conferida pela comparação normalizada com o código gerado | R | 8 |
| 8.5 | Atividade **"qual linha corresponde?"**: clicar na linha equivalente em outra linguagem (conferida pelo mapa) | R | 4 |
| 8.6 | Tela inicial com 10 programas curados (crescentes) + tour de 3 passos | V | 6 |
| 8.7 | Endurecimento dos geradores: escape de literais (`"`, `\`, `%`), nomes reservados, casos do fuzzer | R | 6 |
| 8.8 | Acessibilidade mínima (contraste, foco, teclado), atalhos (Ctrl+Enter executar) | V | 2 |

**Gate G3 (04/04) — MVP sem IA completo:** um aluno, sem ajuda, escreve um programa de 30 linhas,
vê cada elemento surgir nas 5 linguagens, abre cartões, executa com `leia` e faz as 3 atividades.
O núcleo é **congelado**: daqui em diante, só correção de bug.

---

## 8. Fase 4 — IA opcional

### Sprint 9 (05/04 – 18/04) — Copiloto passo a passo + API de turma

| # | Tarefa | Dono | h |
|---|---|---|---|
| 9.1 | Copiloto: pedido em linguagem natural → **plano de passos**, cada passo = comando em **AST JSON** (saída estruturada por schema) | R | 9 |
| 9.2 | Validação semântica de cada passo; até 2 reparos com o erro do validador; mensagem honesta se falhar; pedidos fora do subconjunto recusados com alternativa | R | 5 |
| 9.3 | Integração com o **modo construção**: cada passo entra no editor, acende nas 5 abas e gera cartão; aluno avança, edita ou descarta | R | 5 |
| 9.4 | Checagem de intenção: o programa roda no interpretador com 2–3 entradas de exemplo geradas junto; suíte de 20 pedidos (meta ≥ 90% válidos e corretos) | R | 4 |
| 9.5 | **API pequena:** turma (código de acesso, `ia_habilitada`, grupo do experimento), aluno por apelido, projetos, eventos | V | 12 |
| 9.6 | Proxy de LLM com teto mensal, rate limit por turma/aluno e corte automático | V | 6 |
| 9.7 | Telemetria: `parse_ok`, `elemento_novo`, `cartao_aberto`, `aba_aberta`, `modo`, `executar`, `pegadinha`, `atividade_ok/erro`, `copiloto_passo` | V | 5 |

**Aceite:** "faça um programa que calcule a média de 4 notas" é construído em passos, cada um
replicado e explicado nas 5 abas; com a IA desligada na turma, o botão some e nada mais muda.

**Se cortada:** a 9.5–9.7 continua (necessária para o piloto); as horas de R da S9 viram folga.

---

## 9. Fase 5 — Piloto

### Sprint 10 (19/04 – 02/05) — Preparação + segurança

| # | Tarefa | Dono | h |
|---|---|---|---|
| 10.1 | Deploy de produção (estático + API), HTTPS, monitoramento de erros (Sentry ou equivalente), backup do banco testado | V | 8 |
| 10.2 | Segurança: segredos fora do repo, CORS, rate limit global, revisão de XSS (o PT-BR do aluno é renderizado em cartões), limites de tamanho de programa e entrada | R | 6 |
| 10.3 | LGPD: sem nome real/e-mail; termo de consentimento acordado com a instituição (atenção a alunos de 16–17 anos); aviso claro de quando o programa vai para o provedor de LLM | R+V | 4 |
| 10.4 | Instrumentos: pré-teste, pós-teste de **transferência** (prever saída + achar linha equivalente em linguagem não estudada), rubrica de explicação 0–3, questionário curto | R | 6 |
| 10.5 | Material do professor (1 página) + roteiro das 2 sessões + divisão aleatória dos grupos (5 abas × PT-BR + Python) | V | 4 |
| 10.6 | **Ensaio** com 3 alunos de fora da turma; corrigir o que travar | R+V | 8 |
| 10.7 | Teste de carga: 30 sessões simultâneas no staging | V | 4 |

**Gate G4 (02/05):** nenhum bug bloqueador aberto; termo aprovado pela instituição; ensaio
concluído; plano B (programas pré-carregados, funcionamento sem IA) testado.

### Sprint 11 (03/05 – 16/05) — Piloto

| # | Tarefa | Dono | h |
|---|---|---|---|
| 11.1 | **Sessão 1** (60–90 min): pré-teste → uso guiado → atividades → pós-teste | R+V | 8 |
| 11.2 | Observação (notas) e triagem de bugs; correção só de bloqueadores | R+V | 12 |
| 11.3 | **Sessão 2** (uma semana depois): uso livre + pós-teste atrasado (retenção) | R+V | 8 |
| 11.4 | Exportar programas dos alunos (com consentimento) e eventos | V | 4 |
| 11.5 | Conversa de 20 min com o professor | R+V | 4 |

### Sprint 12 (17/05 – 30/05) — Análise e decisão

| # | Tarefa | Dono | h |
|---|---|---|---|
| 12.1 | Re-executar **todos os programas dos alunos** nos 5 runtimes reais e comparar com o interpretador; cada divergência vira bug e regra | R | 8 |
| 12.2 | Análise das métricas (context.md §4.3) por grupo | R+V | 12 |
| 12.3 | Relatório do piloto (`docs/piloto-relatorio.md`) | R+V | 8 |
| 12.4 | Decisão registrada: v1.1 (8 linguagens + sandbox), ajustar a forma ou parar; backlog priorizado | R+V | 8 |

**Aceite:** métricas das 7 linhas da §4.3 calculadas; decisão de próximo passo registrada.

---

## 10. Definition of Done global do MVP

- [ ] Programa de 30–50 linhas é parseado com erros em PT-BR durante a digitação.
- [ ] Código gerado em **Python, Java, C, C++ e PHP**, atualizado a cada comando.
- [ ] Modo construção: cada elemento novo acende nas 5 abas e gera cartão.
- [ ] Highlight cruzado multi-range, inclusive para nós sintéticos.
- [ ] Catálogo cobre 100% dos nós e sintéticos das 5 linguagens, em 2 níveis.
- [ ] Execução no navegador com `leia` interativo e pegadinhas explicadas.
- [ ] CI: corpus + fuzz com saída idêntica nas 5 linguagens e compilação sem avisos.
- [ ] 3 atividades ativas funcionando.
- [ ] IA opcional, desligável por turma (ou cortada com decisão registrada).
- [ ] Produção com HTTPS, monitoramento, backup, rate limit e termo LGPD.
- [ ] Piloto com 2 sessões, grupo de comparação e relatório.

---

## 11. Expansão para 8 linguagens (v1.1, jun – jul/2027)

Só começa se o G0 e o piloto confirmarem a tese. Com o emissor, a semântica e o CI diferencial
prontos, cada linguagem nova custa **~15–25 h** (gerador + cartões + regras), contra ~25–35 h das
primeiras.

| Sprint | Entrega | Critério |
|---|---|---|
| S13 | **JavaScript** (`Math.trunc`, Node `readline` no CI) + **C#** (`Console.ReadLine`, `InvariantCulture`) | Diferencial 100% + fuzz |
| S14 | **Go** (aviso de variável não usada na semântica, só imports necessários, `for` como `while`) | Diferencial 100% + fuzz |
| S15 | **Execução real no servidor** (Piston/Judge0 self-hosted, **aceitando só AST/PT-BR, nunca código cru**, sem rede, limites de CPU/memória/tempo, fila) como botão "rodar de verdade" | Teste de abuso + 30 execuções simultâneas |

A grade de abas passa a ter 8 linguagens; o modo foco continua sendo o padrão para iniciantes.
Depois disso: `repita`, `escolha`, matrizes, registros; painel do professor; exercícios gerados.

---

## 12. Estratégia de testes

| Camada | O que testar | Como | Quando |
|---|---|---|---|
| Parser | Válidos, inválidos, spans, recuperação | Snapshots (Vitest) | S1+ |
| Semântica | Cada erro do catálogo dispara com span certo | Casos unitários | S2+ |
| Interpretador | Corpus + 1 programa por pegadinha | Saídas esperadas | S4+ |
| **Diferencial** | Interpretador × 5 runtimes reais | Docker no CI, a cada PR | S5+ |
| **Fuzz** | Programas aleatórios bem tipados | Lote noturno no CI | S7+ |
| Mapa de tokens | Cobertura 100% de caracteres; sintéticos com cartão | Teste automático | S5+ |
| Catálogo | Todo nó/sintético × linguagem × nível tem cartão; slots válidos | Teste de schema | S2+ |
| Frontend | Highlight, modo construção, atividades | Vitest + Playwright | S1+ |
| IA | 20 pedidos fixos; % válidos e corretos | Suíte de avaliação | S9 |
| Segurança | Rate limit, XSS, limites de tamanho | Scripts + revisão | S10 |

**Antes de qualquer UI real (S1–S4):** parser, semântica, interpretador e as pegadinhas precisam
estar cobertos. A UI dessas sprints roda sobre fixtures.

**Regras:** nenhum PR sem revisão do outro; CI obrigatório; bug vira teste de regressão;
divergência encontrada pelo fuzzer vira regra em `docs/semantica.md` ou correção no gerador.

---

## 13. Riscos e contingência

| Risco | Quando aparece | Contingência |
|---|---|---|
| Tese não confirmada | G0 | Ajustar a forma (modo foco padrão, mais atividades) antes de seguir |
| Professor/turma não fecha | G0 | Sem turma confirmada não se passa do G0; alternativa: turma de colegas, com ressalva no relatório |
| Gramática ambígua | S1 | Simplificar a construção; descida recursiva facilita ver o conflito |
| Divergência entre linguagens | S5–S7 | Nova regra estrita no interpretador (pegadinha) em vez de gerar código não idiomático |
| `caractere` em C se arrasta | S7 | Restringir mais (sem concatenação em C no v1, com pegadinha explicando) |
| Mapa de tokens incorreto | S5 | Teste de cobertura quebra o build; corrigir no emissor, não na UI |
| Sobrecarga com 5 abas | Piloto | Modo foco padrão; grade sob demanda |
| Custo de LLM | S9+ | Teto + corte automático; produto funciona sem IA |
| Atraso geral | Qualquer | Ordem de corte abaixo |

**Ordem de corte (primeiro ao último):**
1. IA (S9: copiloto e frase contextual).
2. Atividade "qual linha corresponde?" e "reproduzir construção".
3. Projetos no servidor (fica só `localStorage` + código de turma para telemetria).
4. Nível "aprofundar" dos cartões (fica só o básico).
5. Fuzzer noturno (fica só o diferencial do corpus).
6. C++ (último corte: é o gerador mais barato, derivado do C).

**Nunca cortar:** IR única, interpretador estrito, Python + Java + C + PHP, highlight cruzado,
modo construção, catálogo do nível básico, diferencial no CI, segurança/LGPD do piloto, grupo de
comparação no piloto.

---

## 14. Cronograma

```
Semana (seg)     16/11 07/12 21/12 11/01 25/01 08/02 22/02 08/03 22/03 05/04 19/04 03/05 17/05
                 └─F0──┘└S1─┘└S2 recesso┘└S3─┘└S4─┘└S5─┘└S6─┘└S7─┘└S8─┘└S9─┘└S10┘└S11┘└S12┘
Gates                  G0                     G1                G2    G3          G4
Renato           spike  parser semânt. semânt. interp. emissor Java  C+fuzz ativid. IA   seg.  piloto análise
                 fixtures                            Python  C(1)
Vitório          protót. IDE   catálogo editor  console abas   PHP   C++   constr. API   deploy piloto análise
                 CI      fixt.          ao vivo cartões diff   cartões cartões      telem. ensaio
```

---

## 15. Checklist de encerramento do MVP

- [ ] `docs/validacao-f0.md` e decisões do G0 registradas.
- [ ] `docs/semantica.md` v1 fechado e coberto por testes.
- [ ] Parser com recuperação + semântica + erros em PT-BR.
- [ ] Interpretador estrito com todas as pegadinhas.
- [ ] Geradores Python, Java, C, C++ e PHP com mapa multi-range e sintéticos.
- [ ] CI diferencial + fuzz verdes.
- [ ] Catálogo 100% revisado.
- [ ] Modo construção, highlight cruzado e 3 atividades.
- [ ] IA opcional (ou corte registrado).
- [ ] Produção monitorada, termo LGPD, ensaio.
- [ ] Piloto com 2 sessões e grupo de comparação.
- [ ] Relatório do piloto e decisão sobre a v1.1.
