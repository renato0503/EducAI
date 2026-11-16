# Registro de decisões (ADR leve)

> Uma linha por decisão: data, decisão, motivo, quem decidiu e onde está detalhada.
> Decisões pendentes ficam no fim, com dono e prazo. Toda mudança de plano passa por aqui.

## Tomadas

| # | Data | Decisão | Motivo | Detalhes |
|---|---|---|---|---|
| 001 | 12/11/2026 | Plano v2: Fase 0 de validação antes do compilador | Testar a tese antes de ~500 h de código | context.md §12 |
| 002 | 12/11/2026 | TypeScript ponta a ponta; compilador roda no navegador | Uma linguagem só; latência zero; sem sandbox no MVP | context.md §6.5 |
| 003 | 12/11/2026 | MVP com 5 linguagens (Python, Java, C, C++, PHP); v1.1 com 8 (+ JS, C#, Go) | Premissa do produto mantida de forma factível | context.md §10 |
| 004 | 12/11/2026 | Interpretador de referência estrito como oráculo da semântica | Garantir saída idêntica sem código artificial | docs/semantica.md §1 |
| 005 | 12/11/2026 | IA opcional, desligável por turma, nunca escreve na linguagem-alvo | Produto funciona sem IA; resposta ao risco de cola | context.md §7 |
| 006 | 16/11/2026 | **Vitório sai da divisão de tarefas: tudo é feito por Renato (com Claude)** | Decisão do Renato | docs/PROGRESSO.md §2 — sprint.md ainda precisa ser replanejado |
| 007 | 16/11/2026 | pnpm 11 com `allowBuilds: { esbuild: true }` no `pnpm-workspace.yaml` | pnpm 11 bloqueia scripts de build por padrão; `onlyBuiltDependencies` não funciona mais | pnpm-workspace.yaml |
| 008 | 16/11/2026 | Imagem Docker `debian:bookworm-slim` com Python 3.11, OpenJDK 17, gcc/g++ 12, PHP 8.2 e Node para o spike e o CI | Runtimes reais com versões conhecidas | spike/Dockerfile |
| 009 | 16/11/2026 | Concatenação de `caractere` em C com `strcpy` + `strcat` | Compila sem aviso com `-Werror`; evita `-Wformat-truncation` do `snprintf` | docs/semantica.md §3 |
| 010 | 16/11/2026 | `leia` de `caractere` remove só o fim de linha; números ignoram espaços nas pontas | Comportamento confirmado nas 5 linguagens | docs/semantica.md §5 |
| 014 | 16/11/2026 | **D5 fechada:** plano v2.1 — Renato + Claude, gates com as mesmas datas, orçamento em horas do Renato (~230 h de ~290 h) | O código deixa de ser o gargalo; o que pesa é pesquisa, revisão e piloto. **Premissa a confirmar: 14 h/semana** | sprint.md §0 |
| 012 | 16/11/2026 | `caractere` só aceita ASCII imprimível no v1 (literais e entrada); acento vira pegadinha | Spike `p10`: Java 17 sem locale UTF-8 imprime `Jos??`; C, C++, PHP (e o Java) contam `José` com 5 | docs/semantica.md §2 |
| 013 | 16/11/2026 | Confirmadas no spike as pegadinhas de divisão por zero, recursão > 500, variável do `para` após o laço e vírgula na entrada; lógicos, curto-circuito e globais iguais nas 5 | Spike `p7`–`p14` | docs/semantica.md §3, §5–§7 |
| 011 | 16/11/2026 | **D1 fechada:** real formatado em Java com `new BigDecimal(x).setScale(n, RoundingMode.HALF_EVEN).toPlainString()`; zero negativo vira pegadinha | Spike `p6-arredondamento`: igual às outras 4 linguagens em 11 casos; só o zero negativo diverge | docs/semantica.md §4 |

## Pendentes

| # | Decisão | Opções | Recomendação | Dono | Prazo |
|---|---|---|---|---|---|
| D2 | Índice de vetor | 0 (recomendado) ou limite declarado do VisualG | Ouvir professores (tarefa 0.4) | Renato | G0 |
| D3 | Repositório público/privado e licença MIT | Manter público + MIT · privado | Decidir antes de publicar o protótipo | Renato | G0 |
| D4 | Nome/branding | "EducAI" é provisório | — | Renato | pós-G0 |
| D9 | Nomes diferenciam maiúsculas? | Diferenciar (como C/Java/Python/PHP) · não diferenciar (como VisualG) | Parser diferencia; a semântica avisa grafias diferentes do mesmo nome | Renato | S3 |
| D10 | Precedência do `nao` | Abaixo das comparações (`nao a > b` = `nao (a > b)`, implementado) · acima (como Pascal/VisualG) | Manter abaixo (mais intuitivo; os geradores põem parênteses) — confirmar com professores | Renato | G0 |
| D6 | Inicialização padrão + primeira atribuição duplicada (`total = 0` duas vezes) | Gerador funde as duas · manter literal | Fundir quando a 1ª instrução da função for atribuição constante à variável | Renato | S5 |
| D7 | C++ com `std::` explícito ou `using namespace std` | `std::` (spike usa) · `using` | `std::` (boa prática; cartão explica) | Renato | S7 |
