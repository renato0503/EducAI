# EducAI — Plano de Sprints (Ideação → MVP concluído)

> Plano de execução detalhado do MVP do EducAI, derivado do `context.md`.
> Cobre fases, sprints, tarefas, entregáveis, critérios de aceite, riscos e cronograma.

---

## 1. Premissas do plano

- **Equipe:** 2 pessoas (Renato + Vitório), com afinidades complementares.
- **Dedicação:** parcial — ~12–16 h/semana por pessoa (ajustar se houver dedicação integral).
- **Cadência:** sprints de **2 semanas** (10 úteis), com demo/review no fim de cada uma.
- **Total estimado:** **~20 semanas** em dedicação parcial; **~10–12 semanas** se dedicação integral.
- **Sugestão de divisão (ajustar por afinidade):**
  - **Renato:** compilador (gramática, AST, semântica), geradores, execução, IA (explicador/copiloto).
  - **Vitório:** frontend (Monaco, abas, highlight), produto (contas, projetos), piloto, QA.
  - Ambos: definição de escopo, testes de equivalência, revisão de código.
- **Fora do plano:** decisões de negócio (preço, marca) não bloqueiam a engenharia; são tratadas na Fase A.

### Convenções

- **DoD (Definition of Done)** de qualquer tarefa: código revisado por outra pessoa, testes
  automatizados passando, documentação mínima atualizada, deploy em *staging* funcionando.
- **Gate de fase:** nenhuma fase começa sem os critérios de saída da anterior.
- **Toda feature nova no compilador** entra acompanhada de um programa de exemplo no *corpus*.

---

## 2. Visão geral das fases

| Fase | Sprints | Foco | Resultado |
|---|---|---|---|
| **A — Ideação e Discovery** | Sprint 0 | Escopo, arquitetura, protótipo | Decisões fechadas e protótipo navegável |
| **B — Fundação do compilador** | Sprints 1–2 | Gramática, AST, semântica, geradores Python/C | PT-BR → AST → código válido |
| **C — Experiência multi-linguagem** | Sprints 3–4 | Editor com abas, mapa de tokens, execução | Abas sincronizadas e código rodando |
| **D — IA pedagógica** | Sprints 5–6 | Explicador por nó, copiloto NL→PT-BR | O diferencial do produto funcionando |
| **E — Produto e piloto** | Sprints 7–8 | Contas, projetos, instrumentação, turma piloto | Uso real por alunos |
| **F — Hardening e release** | Sprint 9 | Segurança, performance, documentação, release | MVP concluído e estável |

> **Caminho crítico:** gramática → AST → geradores → mapa de tokens → highlight → execução.
> Se o mapa de tokens atrasar, adiar o highlight cruzado (Fase C) e não a execução.

---

## 3. Definition of Done global do MVP

O MVP está concluído quando:

- [ ] Um programa de 30–50 linhas em PT-BR (variáveis, IO, `se`, `enquanto`, `para`, funções, vetores)
      é parseado, validado e gerado em **3 linguagens** sem intervenção manual.
- [ ] Código gerado **compila e executa** no sandbox, com saída idêntica nas 3 linguagens.
- [ ] Clicar/hover em qualquer elemento destaca o equivalente nas outras abas.
- [ ] Painel lateral explica o elemento em cada linguagem, com 3 níveis.
- [ ] Copiloto converte pedido em linguagem natural em PT-BR válido, com loop de reparo e preview.
- [ ] Erros de sintaxe/semântica são explicados em PT-BR com span e sugestão.
- [ ] Contas, projetos salvos e histórico funcionam.
- [ ] Piloto com 10–30 alunos executado, métricas coletadas e relatório gerado.
- [ ] Deploy em produção com HTTPS, backups, monitoramento de erros e limites de uso.

---

## 4. Fase A — Ideação e Discovery

### Sprint 0 — Alinhamento, escopo e protótipo (2 semanas)

**Objetivo:** sair da ideia para um plano técnico fechado e um protótipo que permita validar a
experiência antes de escrever o compilador.

**Tarefas**

1. **Fechar escopo do subconjunto PT-BR v1** (formalizar o que entra e o que fica para v2).
   - Entram: variáveis (`inteiro`, `real`, `texto`, `logico`), atribuição, `escreva`/`leia`,
     operadores aritméticos/relacionais/lógicos, `se`/`senao`, `enquanto`, `para`, funções com
     retorno, procedimentos, vetor 1D, comentários.
   - Ficam para v2: matrizes, `escolha`, `repita`, arquivos, ponteiros, classes/OO, strings avançadas.
2. **Escrever a gramática em EBNF/Lark de rascunho** e validar em papel com 5 programas.
3. **Definir o schema da AST** (tipos de nó, campos, IDs estáveis, spans).
4. **Decidir a stack** (gate): Python (Lark/FastAPI) + Next.js **ou** 100% TypeScript (Chevrotain).
   - Critérios: velocidade de iteração na gramática, familiaridade da dupla, facilidade de deploy.
5. **Definir contrato da API** (parse, generate, run, explain, copilot) — OpenAPI rascunho.
6. **Protótipo de UI navegável** (Figma ou HTML estático): editor PT-BR + abas + painel de
   explicação + console.
7. **Escolher linguagens do MVP** (proposta: **Python, C e Java**) e justificar a ordem.
8. **Definir política de execução:** Piston self-hosted vs Judge0 vs docker local.
9. **Criar o repositório**, estrutura de pastas, CI básico (lint + testes) e template de PR.
10. **Definir o corpus inicial de 20 programas** representativos do curso.

**Entregáveis**
- `docs/escopo-v1.md` — subconjunto formal da linguagem.
- `grammar/portugol.lark` (rascunho) + 5 programas de teste.
- `docs/ast-schema.md` — tipos de nó e campos.
- `docs/api-contract.md` — endpoints e payloads.
- Protótipo de UI (Figma/link) + decisão de stack registrada.
- Repositório com CI verde e README de setup.

**Critérios de aceite**
- Escopo v1 escrito e aprovado pelos dois.
- Stack decidida com justificativa (sem "vamos ver depois").
- Protótipo mostra o fluxo completo: escrever → abas preenchidas → clicar → explicação.
- Os 5 programas de papel são parseáveis "na cabeça" pela gramática rascunho.

**Riscos / atenção**
- **Escopo inflado** é o maior risco desta fase. Regra: qualquer ideia nova vai para o backlog
  pós-MVP, não para a v1.
- Não escolher stack por moda; escolher por velocidade de iteração da dupla.

---

## 5. Fase B — Fundação do compilador

### Sprint 1 — Gramática, AST e spans (2 semanas)

**Objetivo:** transformar texto PT-BR em uma AST tipada, com spans corretos e erros de sintaxe
apontando linha/coluna.

**Tarefas**

1. Implementar a gramática completa do subconjunto v1 (Lark/Chevrotain).
   - Expressões com precedência correta; `se`/`senao`; `enquanto`; `para`; funções/procedimentos.
   - Comentários (`//` e `/* */`) ignorados no parser, mas preservados para o editor.
2. Construir a AST canônica:
   - Nós: `programa`, `declaracao`, `atribuicao`, `escreva`, `leia`, `se`, `enquanto`, `para`,
     `funcao`, `procedimento`, `chamada`, `retorno`, `vetor`, `operacao`, `literal`, `variavel`.
   - IDs estáveis (ex.: `n1`, `n2`, ... por ordem de visita) + `span` (linha/coluna início/fim).
3. Testes unitários do parser:
   - 20 programas válidos do corpus → AST esperada (snapshot).
   - 10 programas inválidos → erro com linha, coluna e mensagem em PT-BR.
4. Implementar `GET /parse` (ou função equivalente) devolvendo `{ ast, erros }`.
5. Catalogar erros de sintaxe com código + texto didático ("esperava `fimse`, encontrei ...").
6. Documentar a AST com exemplos reais (JSON) no `docs/ast-schema.md`.

**Entregáveis**
- Gramática versionada + parser funcional.
- AST serializável em JSON + spans.
- Suíte de testes do parser (válidos + inválidos) verde no CI.
- Página/harness de debug que mostra o JSON da AST de um texto colado.

**Critérios de aceite**
- 100% dos 20 programas do corpus parseiam sem erro.
- Cada erro de sintaxe aponta o token e traz mensagem em português.
- AST é determinística: mesmo texto → mesma AST (incluindo IDs).
- Cobertura de testes do parser ≥ 80% das regras da gramática.

**Riscos / atenção**
- Ambiguidade na gramática (ex.: `para` vs. atribuição) → resolver cedo com testes.
- Spans errados quebram highlight e erro na UI → testar spans desde já.

---

### Sprint 2 — Análise semântica + geradores Python e C (2 semanas)

**Objetivo:** validar tipos/escopos e gerar código executável em 2 linguagens, com testes de
equivalência de saída.

**Tarefas**

1. **Análise semântica:**
   - Tabela de símbolos, escopos (global/função/bloco), tipos e compatibilidade.
   - Checagens: variável não declarada, redeclaração, tipo incompatível, aridade de função,
     retorno ausente/errado, vetor fora do índice estático, uso antes de atribuição (best effort).
   - Erros semânticos em PT-BR com span e sugestão de correção.
2. **IR canônica anotada:** AST + `tipo` resolvido em cada expressão + tabela de símbolos.
3. **Gerador Python:**
   - Templates por nó (Jinja2 ou funções puras).
   - Convenções: `escreva` → `print`, `leia` → `input` com cast, vetores → listas, funções → `def`.
   - Emitir **mapa `nodeId → range`** junto com o código.
4. **Gerador C:**
   - `#include <stdio.h>`, `int main`, protótipos, `printf`/`scanf` com formato por tipo.
   - Vetores como arrays; funções com tipo de retorno explícito.
   - Emitir mapa `nodeId → range`.
5. **Testes de equivalência (golden tests):**
   - Para cada programa do corpus: rodar Python e C no sandbox (ou localmente no CI) e comparar
     stdout normalizado (trim, `\r\n` → `\n`).
6. **Normalização de saída documentada** (quebras de linha, formatação de real, fim de arquivo).
7. **Endpoint `POST /generate`** devolvendo código + mapas.

**Entregáveis**
- Análise semântica com catálogo de erros.
- Geradores Python e C funcionais + mapas de tokens.
- Golden tests de equivalência rodando no CI.
- `docs/geracao.md` com as convenções por linguagem.

**Critérios de aceite**
- ≥ 95% do corpus gera Python e C que executam com a mesma saída.
- Todo nó visível no código gerado tem range válido no mapa.
- Erros semânticos são compreensíveis para um iniciante (revisão manual de 10 mensagens).
- Nenhum gerador emite código "quebrado" silenciosamente: falha explícita com erro interno.

**Riscos / atenção**
- **Mapa de tokens** é a parte mais delicada: instrumentar os templates desde o início, não depois.
- Diferenças de saída (`print` de real, `scanf` com espaços) → padronizar entrada/saída no corpus.
- Não otimizar prematuramente geração; priorizar legibilidade didática.

---

## 6. Fase C — Experiência multi-linguagem

### Sprint 3 — Editor com abas, sync e highlight cruzado (2 semanas)

**Objetivo:** a experiência visual que materializa a tese: escrever uma vez, ver em várias
linguagens, clicar e acender o equivalente.

**Tarefas**

1. **Editor Monaco** com a aba de PT-BR:
   - Syntax highlighting básico (tokenizer customizado ou Monarch).
   - Marcação de erros do parser/semântica (squiggles + tooltip em PT-BR).
   - Parse em tempo real com debounce (300–500 ms).
2. **Abas de linguagens** (Python, C, Java) geradas a partir do código atual:
   - Abas read-only no MVP; atualização automática ao editar o PT-BR.
   - Estado de carregamento e indicação de erro de geração.
3. **Mapa de tokens no frontend:**
   - Converter `nodeId → range` em *decorations* do Monaco.
   - Hover/clique em um token → identificar `nodeId` → destacar em todas as abas.
   - Navegação por teclado (Tab/Shift+Tab entre ocorrências do mesmo nó).
4. **Painel lateral de estrutura** (opcional, mas útil): árvore resumida do programa por nós.
5. **Layout responsivo básico**: editor à esquerda, abas à direita, console abaixo (ou abas
   empilhadas no mobile web).
6. **Salvar rascunho local** (`localStorage`) para não perder texto ao recarregar.
7. Testes de componente (renderização de abas, seleção de nó, decorations) com Playwright/Vitest.

**Entregáveis**
- Editor funcional com 4 abas (PT-BR + 3 linguagens).
- Highlight cruzado bidirecional.
- Erros visíveis no editor.
- Protótipo usável de ponta a ponta (sem execução ainda).

**Critérios de aceite**
- Editar uma linha em PT-BR atualiza as 3 abas em < 1s (programas do corpus).
- Clicar em `enquanto` em Python acende o nó correspondente em C e Java e vice-versa.
- Erro de sintaxe aparece sublinhado na posição certa.
- Nenhuma aba fica "dessincronizada" após 20 edições consecutivas (teste manual roteirizado).

**Riscos / atenção**
- Performance do Monaco com muitas decorations → destacar só o nó ativo, não o programa inteiro.
- IDs instáveis entre parses → garantir determinismo (Sprint 1) ou remapear no diff.

---

### Sprint 4 — Execução real e console comparativo (2 semanas)

**Objetivo:** provar que o código gerado roda de verdade e que todas as linguagens produzem a
mesma saída.

**Tarefas**

1. **Subir o sandbox de execução** (Piston self-hosted via Docker Compose ou Judge0).
   - Imagens/runtimes: Python 3, GCC (C), JDK (Java).
   - Limites: tempo (ex.: 5s), memória (ex.: 128 MB), sem rede, sem escrita fora do temp.
2. **Cliente de execução** com contrato único: `{ linguagem, codigo, stdin } → { stdout, stderr,
   status, duracao_ms }`.
3. **Console de execução na UI:**
   - Botão "Executar", campo de entrada (stdin) quando o programa usa `leia`.
   - Aba de saída por linguagem + aba "comparar" com diff lado a lado.
   - Selo "saídas idênticas" / destaque das diferenças.
4. **Timeout e tratamento de erro didático:** erro de compilação vira mensagem em PT-BR (com
   tradução básica do erro do compilador para o aluno).
5. **Cache de execução** (hash do código + entrada) para não reexecutar o mesmo programa.
6. **Testes de integração** do fluxo completo: PT-BR → AST → 3 códigos → execução → comparação.
7. **Métricas de latência** expostas (tempo de parse, geração e execução).

**Entregáveis**
- Execução real em 3 linguagens.
- Console comparativo com selo de equivalência.
- Testes de integração do pipeline ponta a ponta.
- `docs/execucao.md` (limites, formatos, normalização, segurança).

**Critérios de aceite**
- Programa com `leia` recebe entrada e produz a mesma saída nas 3 linguagens.
- Programa com laço e vetor roda dentro do limite de 5s.
- Código malicioso óbvio (loop infinito, escrita em disco) é contido pelo timeout/sandbox.
- O aluno vê erro de compilação em português, não stack trace cru.

**Riscos / atenção**
- Segurança do sandbox é **crítica**: sem rede, sem privilégios, limites agressivos.
- Diferenças de runtime (versões) → fixar versões das imagens no `docker-compose.yml`.
- Se Piston for complexo demais, fallback: executar localmente em containers dedicados.

---

## 7. Fase D — IA pedagógica

### Sprint 5 — Explicador por elemento e por linguagem (2 semanas)

**Objetivo:** o diferencial pedagógico: cada nó explicado em cada linguagem, em níveis, com cache.

**Tarefas**

1. **Taxonomia de explicação por nó** (schema):
   - `o_que_e`, `por_que_existe`, `como_aparece_em_cada_linguagem`, `pegadinhas`, `exemplo`.
2. **Prompt ancorado no nó:**
   - Entrada: subárvore do nó (JSON), código real gerado em cada linguagem, nível, contexto do
     programa (resumido).
   - Saída estruturada (JSON) validada por schema.
   - Instruções: não inventar sintaxe; citar o trecho real; adaptar ao nível.
3. **Integração na UI:** painel lateral ao clicar no elemento; seletor de nível
   (iniciante/intermediário/avançado); estado de carregamento.
4. **Cache versionado:**
   - Chave: `hash(tipo_no + subárvore_normalizada + linguagens + nivel + prompt_versao)`.
   - Redis com TTL + tabela `Explicacao` para auditoria.
5. **Fallback determinístico:** templates por tipo de nó e linguagem, usados se a LLM falhar,
   estourar orçamento ou demorar > 3s.
6. **Orçamento e limites:** máximo de tokens por explicação, rate limit por usuário, telemetria de
   custo.
7. **Revisão de qualidade:** amostra de 20 explicações revisadas manualmente; checklist de
   correção (sem alucinação, nível adequado, referência ao código real).

**Entregáveis**
- Serviço de explicação com nó + linguagem + nível.
- Painel lateral integrado.
- Cache e fallback funcionando.
- Relatório de revisão de qualidade da amostra.

**Critérios de aceite**
- Explicação de 10 nós distintos (em 3 linguagens) considerada correta e didática na revisão manual.
- Explicação responde em < 2s com cache e < 5s sem cache (p95).
- Fallback produz texto útil quando a LLM é desligada (teste com flag).
- Custo por explicação medido e dentro do orçamento definido.

**Riscos / atenção**
- Explicação genérica ("isso é um laço") → exija referência ao trecho real e ao programa concreto.
- Custo explosivo → sob demanda + cache + modelo pequeno.
- Tom didático inconsistente → guia de estilo/prompt versionado.

---

### Sprint 6 — Copiloto NL → PT-BR + tutoria de erros (2 semanas)

**Objetivo:** o aluno pede em linguagem natural e recebe programa válido em PT-BR, com preview e
reparo automático.

**Tarefas**

1. **Prompt do copiloto:**
   - System prompt com gramática resumida + 5 exemplos few-shot + regras de estilo.
   - Saída: apenas código PT-BR (sem markdown, sem explicação).
2. **Pipeline de validação:**
   - Parse obrigatório; em caso de erro, **loop de reparo** com o erro do parser como feedback
     (máx. 3 tentativas).
   - Se falhar, mensagem honesta + sugestão de reformular.
3. **Preview e aplicação:**
   - Mostrar o programa gerado em diff antes de aplicar no editor.
   - Aluno aceita, edita ou descarta (nada é aplicado sem confirmação).
4. **Escopo respeitado:** pedidos fora do subconjunto são recusados com explicação educativa
   ("ainda não suporto arquivos; posso fazer com vetor").
5. **Tutoria de erro (compilação/execução):**
   - Traduzir mensagens de erro do Python/C/Java para explicação didática em PT-BR, com o conceito
     em destaque e o trecho culpado.
6. **Histórico de gerações** (prompt, versão, resultado) para auditoria e melhoria dos prompts.
7. **Testes do copiloto:** 20 pedidos típicos → ≥ 90% geram PT-BR válido em ≤ 3 tentativas.

**Entregáveis**
- Copiloto integrado ao editor com preview.
- Loop de reparo com logs.
- Tutor de erros em PT-BR.
- Suíte de avaliação do copiloto (20 casos).

**Critérios de aceite**
- "Faça um programa que calcule a média de 4 notas" gera programa válido e executável.
- Pedido fora do escopo é recusado sem quebrar o fluxo.
- Nenhuma saída do copiloto entra no editor sem validação do parser.
- Taxa de sucesso ≥ 90% nos 20 casos de avaliação.

**Riscos / atenção**
- LLM tende a "inventar" sintaxe → validação + reparo são obrigatórios, nunca opcionais.
- Latência alta → modelo rápido para o copiloto, streaming na UI se possível.

---

## 8. Fase E — Produto e piloto

### Sprint 7 — Contas, projetos, persistência e polish (2 semanas)

**Objetivo:** transformar o protótipo em produto usável por uma turma.

**Tarefas**

1. **Autenticação** (e-mail/senha ou magic link) + sessão.
2. **CRUD de projetos:** criar, renomear, duplicar, excluir, autosave.
3. **Histórico/versões:** snapshots por execução ou por período; restaurar versão.
4. **Persistência de execuções e explicações** (modelo de dados do `context.md`).
5. **Onboarding:** programa de exemplo pré-carregado + tour de 3 passos.
6. **Polish de UI/UX:**
   - Layout, tipografia, tema claro/escuro, estados vazios e de erro.
   - Atalhos (Ctrl+Enter executar, Ctrl+S salvar).
   - Acessibilidade mínima (contraste, foco, navegação por teclado).
7. **Instrumentação de eventos:** `parse_ok`, `run`, `run_equal`, `explain_click`, `level_switch`,
   `copilot_request`, `copilot_success` (tabela de eventos + dashboard simples).
8. **Mensagens de erro globais** e tela de status.
9. **Testes E2E** do fluxo completo (Playwright).

**Entregáveis**
- Produto com login, projetos salvos e histórico.
- Onboarding e tour.
- Telemetria de uso e painel básico.
- Testes E2E verdes.

**Critérios de aceite**
- Um aluno cria conta, escreve, executa, explica e volta depois com o projeto salvo.
- Nenhuma perda de dados em recarregar/deslogar.
- Fluxo completo coberto por teste E2E.
- Eventos essenciais chegando ao banco.

**Riscos / atenção**
- Autenticação pode inflar escopo → usar solução pronta (Auth.js/Supabase/Clerk).
- Privacidade/LGPD: consentimento e política de dados desde o piloto.

---

### Sprint 8 — Piloto com turma real (2 semanas)

**Objetivo:** validar o loop de aprendizado com 10–30 alunos e coletar as métricas da seção 4.3 do
`context.md`.

**Tarefas**

1. **Preparar o piloto:**
   - Roteiro de 1 sessão de 60–90 min (ou 2 de 45 min).
   - Conta de professor + turma.
   - Guia rápido de 1 página para o aluno (sem treinamento prévio).
2. **Instrumentação pedagógica:**
   - Pré-teste: "você sabe explicar o que é um laço/variável/função?"
   - Pós-teste: aluno explica 3 conceitos com as próprias palavras (rubrica de 0–3).
   - Questionário de percepção (comparação entre linguagens, utilidade, dificuldade).
3. **Executar o piloto** com observação (screen recording/notas) e coleta de bugs.
4. **Triagem de bugs:** classificar (bloqueador, importante, cosmético) e corrigir bloqueadores na
   hora.
5. **Análise:** tempo até primeiro programa rodando, taxa de erro de parse, uso do copiloto,
   uso do explicador, cliques por sessão.
6. **Relatório do piloto** com as métricas e os aprendizados.
7. **Iteração rápida:** ajustes de UX/prompt com base no observado.

**Entregáveis**
- Piloto executado, dados coletados.
- Relatório com métricas vs. metas.
- Lista priorizada de correções e melhorias.

**Critérios de aceite**
- ≥ 80% dos alunos concluem um programa de exemplo sem ajuda.
- Métricas coletadas para as 5 metas da seção 4.3.
- Nenhum bug bloqueador em aberto ao fim do sprint.
- Relatório revisado pelos dois e decisões de próximo passo registradas.

**Riscos / atenção**
- Turma com níveis muito distintos → preparar 3 programas de dificuldade crescente.
- Wi-Fi/latência → ter plano B (programa pré-carregado, execução em lote).
- Coleta de dados exige consentimento (LGPD).

---

## 9. Fase F — Hardening e release do MVP

### Sprint 9 — Segurança, performance, documentação e release (2 semanas)

**Objetivo:** deixar o MVP estável, seguro e apresentável para continuar o piloto.

**Tarefas**

1. **Segurança:**
   - Revisão do sandbox (rede, filesystem, CPU/memória/tempo, processos).
   - Rate limiting por IP/usuário; limites de tamanho de código e de entrada.
   - Gestão de segredos (variáveis de ambiente, nunca no repositório).
   - Checklist OWASP básico (XSS no editor, injeção, autenticação de sessão).
2. **Performance:**
   - Medir p50/p95 de parse, geração, execução e explicação.
   - Otimizar gargalos (debounce, cache, geração incremental se necessário).
3. **Confiabilidade:**
   - Monitoramento de erros (Sentry ou equivalente), logs estruturados, alertas.
   - Backups do banco e teste de restauração.
   - Health checks e página de status.
4. **Documentação:**
   - `README.md` com setup local em < 10 min.
   - `docs/arquitetura.md`, `docs/gramatica.md`, `docs/contribuindo.md`.
   - Guia do professor (como usar em sala).
5. **Deploy de produção:**
   - Ambiente de staging + produção, domínio, HTTPS, CI/CD.
   - Runbook de incidentes (o que fazer se o sandbox cair).
6. **Congelamento de escopo** e checklist final do MVP (seção 3).
7. **Demo final** e retrospectiva do projeto.

**Entregáveis**
- Produção no ar, estável e monitorada.
- Documentação completa.
- Relatório final de métricas técnicas e pedagógicas.
- Backlog priorizado do pós-MVP.

**Critérios de aceite**
- Uptime do piloto sem incidentes bloqueadores no período de teste.
- p95 de execução < 5s; explicação com cache < 2s.
- Setup local documentado reproduzível por uma pessoa de fora.
- Checklist global do MVP 100% marcado.

**Riscos / atenção**
- Custo de infraestrutura (sandbox + LLM) → orçamento e alertas de gasto.
- Dependência de LLM → fallback já implementado e testado.

---

## 10. Expansão de linguagens (C++ e PHP)

Executar **em paralelo** a partir da Sprint 5, ou como sprint extra após a Sprint 8, sem bloquear o
MVP de 3 linguagens:

| Etapa | Tarefa | Critério |
|---|---|---|
| C++ | Gerador com `#include <iostream>`, `std::cin/cout`, `std::vector` ou arrays | Passa nos golden tests |
| PHP | Gerador com `<?php`, `echo`, `readline`/`fgets(STDIN)`, arrays | Passa nos golden tests |
| Docs | Convenções e pegadinhas de cada linguagem no explicador | Revisão manual OK |

Regra: uma linguagem só entra nas abas quando **executa com saída idêntica** ao corpus.

---

## 11. Estratégia de testes e qualidade

| Camada | O que testar | Ferramenta |
|---|---|---|
| Parser | Programas válidos/inválidos, spans, IDs | pytest/Vitest + snapshots |
| Semântica | Tipos, escopos, aridade, erros | pytest/Vitest |
| Geradores | Código gerado + mapa de tokens | golden files |
| Equivalência | Saída idêntica entre linguagens | CI com runtimes |
| Frontend | Abas, highlight, painel, execução | Playwright + Vitest |
| IA | Explicações e copiloto (amostra + casos fixos) | suite de avaliação |
| E2E | Fluxo completo do aluno | Playwright |
| Segurança | Sandbox, limites, rate limit | testes manuais + scripts |

**Regras de qualidade**
- Nenhum PR sem revisão do outro.
- CI obrigatório: lint + testes + golden tests antes do merge.
- Bug de produção vira teste de regressão.
- Toda mudança na gramática exige atualização do corpus.

---

## 12. Riscos transversais e contingência

| Risco | Quando aparece | Contingência |
|---|---|---|
| Gramática ambígua trava o parser | Sprint 1 | Simplificar construtos; adiar recursos para v2 |
| Mapa de tokens não sai limpo | Sprint 2–3 | Highlight só no nó ativo e por linha; refinar depois |
| Sandbox instável/complexo | Sprint 4 | Começar com execução local em containers; Piston depois |
| Custo de LLM estoura | Sprint 5–6 | Modelo menor, cache agressivo, fallback por template |
| Explicação alucina | Sprint 5 | Prompt ancorado + revisão amostral + validação de schema |
| Piloto não fecha com turma | Sprint 8 | Usar colegas/colegas de curso como piloto interno |
| Prazo aperta | Qualquer | Cortar C++/PHP, níveis de explicação e histórico (não cortar execução nem highlight) |

**Ordem de corte em caso de atraso (do primeiro ao último):**
1. C++ e PHP → 2. Histórico de versões → 3. Nível avançado de explicação → 4. Tutor de erros
detalhado → 5. Dark mode/polish.

**Nunca cortar:** IR única, execução real, explicação por elemento, highlight cruzado, validação do
copiloto.

---

## 13. Backlog pós-MVP

- Exercícios gerados e correção assistida.
- Turmas, atribuições e painel do professor.
- Integração com LMS (Moodle) e exportação.
- Mais linguagens (C#, JS/TS, Go, Rust, Kotlin).
- Colaboração em tempo real e comentários.
- Offline/PWA e versão desktop.
- Gamificação e trilhas de aprendizagem.
- Suporte a matrizes, `escolha`, `repita`, arquivos, OO.
- Marketplace de exemplos e planos de aula.

---

## 14. Cronograma resumido

```
Semana        1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
Sprint 0     ██
Sprint 1        ██ ██
Sprint 2              ██ ██
Sprint 3                    ██ ██
Sprint 4                          ██ ██
Sprint 5                                ██ ██
Sprint 6                                      ██ ██
Sprint 7                                            ██ ██
Sprint 8                                                  ██ ██
Sprint 9                                                        ██ ██
C++/PHP (paralelo)                    ░░ ░░ ░░ ░░ ░░ ░░
```

> Em dedicação integral, comprimir para ~1 semana por sprint (≈ 10–12 semanas), mantendo os gates.

---

## 15. Checklist de encerramento do MVP

- [ ] Escopo v1 congelado e documentado.
- [ ] Parser + AST + spans + erros em PT-BR.
- [ ] Semântica com erros didáticos.
- [ ] Geradores Python, C e Java com mapas de tokens.
- [ ] Código executa no sandbox com saída idêntica.
- [ ] Editor com abas e highlight cruzado.
- [ ] Explicador por nó/linguagem/nível com cache e fallback.
- [ ] Copiloto NL→PT-BR com validação e loop de reparo.
- [ ] Contas, projetos, autosave e histórico.
- [ ] Telemetria e dashboard de uso.
- [ ] Piloto com 10–30 alunos + relatório.
- [ ] Segurança do sandbox revisada.
- [ ] Produção monitorada com backups.
- [ ] Documentação e runbook.
- [ ] Backlog pós-MVP priorizado.
