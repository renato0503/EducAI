# EducAI

> Uma IDE educacional, **com ou sem IA**: o aluno escreve em **português estruturado** (estilo
> VisualG/Portugol) e, **conforme o código vai surgindo**, vê cada elemento **replicado e explicado
> ao mesmo tempo** em **Python, Java, C, C++ e PHP** — e, na v1.1, também em **JavaScript, C# e Go**.

O código gerado é **real**: idiomático, compila e roda em cada linguagem. Não é pseudocódigo.

---

## O problema

1. O aluno **aprende uma linguagem isolada** e não separa "conceito" de "sintaxe daquela linguagem".
2. O aluno **usa IA para gerar código pronto** e não sabe explicar uma linha.

O EducAI ataca a pergunta: **como produzir código real — com ou sem IA — sem terceirizar o
entendimento do aluno?**

## A tese (hipótese a validar)

> Se o aluno escreve **uma vez** em português estruturado e vê **cada elemento** materializado nas
> várias linguagens, no momento em que ele surge, com explicação ancorada nele, ele aprende o
> conceito e passa a **ler e transferir** esse conceito para as outras linguagens.

A Fase 0 testa a tese com um protótipo antes do compilador, e o piloto mede **transferência** com
grupo de comparação.

---

## Como funciona

```
 Português estruturado (digitado ou construído passo a passo pelo copiloto)
        │
        ▼                              ── tudo no navegador ──
 ┌──────────────┐   ┌──────────────┐   ┌───────────────────────────────────────┐
 │ Parser +     │──▶│  AST / IR    │──▶│ Geradores: Python · Java · C · C++ · PHP│
 │ semântica    │   │  única (IDs) │   │ + mapa nó → [ranges] + nós sintéticos  │
 └──────────────┘   └──────┬───────┘   └───────────────────────────────────────┘
                           │
        ┌──────────────────┼────────────────────┬────────────────────────────┐
        ▼                  ▼                    ▼                            ▼
 ┌──────────────┐  ┌──────────────────┐  ┌─────────────────┐   ┌──────────────────────┐
 │ Interpretador│  │ Modo construção  │  │ Catálogo de     │   │ IA (opcional):        │
 │ de referência│  │ elemento novo    │  │ explicações por │   │ copiloto passo a passo│
 │ (leia        │  │ acende nas 5 abas│  │ nó × linguagem  │   │ + frase contextual    │
 │ interativo)  │  │ + cartão         │  │ × nível         │   │                       │
 └──────────────┘  └──────────────────┘  └─────────────────┘   └──────────────────────┘

 CI: cada programa roda no interpretador e em python3, java, gcc, g++ e php reais → saídas idênticas
```

**Decisões-chave**
- **Uma única AST/IR.** Nunca traduzimos texto de linguagem A → B.
- **O interpretador de referência é o juiz.** Ele é mais estrito que todas as linguagens: o que ele
  executa roda igual em todas; o que divergiria (overflow, divisão de negativos, índice fora…) ele
  interrompe e explica a "pegadinha". Regras em [`docs/semantica.md`](./docs/semantica.md).
- **Todo trecho gerado é explicável**, inclusive o boilerplate (`#include`, `public class Main`,
  `Scanner`, `<?php`).
- **A IA é opcional** e nunca escreve na linguagem-alvo; o professor pode desligá-la por turma.

## Funcionalidades do MVP

- **Abas sincronizadas em 5 linguagens**, com modo grade (todas) e modo foco (1–2).
- **Modo construção:** cada comando novo acende em todas as abas e gera um cartão de explicação.
- **Highlight cruzado:** clique em `enquanto` no Python e acenda o `while` em Java, C, C++ e PHP.
- **Explicação por elemento e por linguagem**, em 2 níveis, sem depender de IA.
- **Execução no navegador** com `leia` interativo; equivalência garantida no CI com runtimes reais.
- **Erros em português** durante a digitação, apontando o elemento e o conceito.
- **Atividades:** preveja a saída, complete a lacuna em C/Java, ache a linha equivalente.
- **Copiloto opcional:** "faça um programa que calcule a média de 4 notas" é construído
  **passo a passo**, e cada passo aparece explicado nas 5 linguagens.

### Fora do escopo do MVP

Execução no servidor (v1.1), debugger, LSP completo, colaboração em tempo real, mobile nativo,
contas com e-mail, gamificação, LMS, matrizes/`escolha`/`repita`/arquivos/OO.

---

## Subconjunto da linguagem (v1)

- Tipos: `inteiro`, `real`, `caractere` (até 255), `logico`
- `algoritmo` / `var` / `inicio` / `fimalgoritmo`, atribuição `<-`
- `escreva` / `escreval` / `leia`
- `se` / `senao`, `enquanto`, `para … passo`
- Funções e procedimentos
- Vetores de uma dimensão com tamanho constante (índice a partir de `0`, a confirmar com professores)
- Comentários `//`

---

## Stack

| Camada | Escolha |
|---|---|
| Linguagem | TypeScript (monorepo pnpm) |
| Compilador | Parser por descida recursiva, semântica, interpretador e geradores — rodam no navegador e no CI |
| Frontend | Vite + React + Monaco |
| API | Node (Hono/Fastify): turma, projetos, telemetria, proxy de LLM |
| Banco | Postgres gerenciado (plano gratuito) |
| Testes diferenciais | GitHub Actions + Docker com python3, OpenJDK, gcc, g++, php |
| LLM (opcional) | API de modelo com camada de abstração, teto de gasto |

---

## Documentação

| Documento | Conteúdo |
|---|---|
| [`dor.md`](./dor.md) | A dor original |
| [`context.md`](./context.md) | Visão, público, MVP, arquitetura, papel da IA, riscos, decisões |
| [`sprint.md`](./sprint.md) | Plano: orçamento de horas, sprints, gates, cortes, cronograma |
| [`docs/semantica.md`](./docs/semantica.md) | Semântica do PT-BR e como cada linguagem a implementa |
| [`docs/PROGRESSO.md`](./docs/PROGRESSO.md) | **Estado atual, o que foi feito e o que falta (leia ao retomar)** |
| [`docs/decisoes.md`](./docs/decisoes.md) | Decisões tomadas e pendentes |
| [`docs/fase0-roteiros.md`](./docs/fase0-roteiros.md) | Roteiros de entrevista com professores e think-aloud com alunos |
| [`spike/README.md`](./spike/README.md) | Spike de equivalência nas 5 linguagens e resultados |

---

## Roadmap

| Fase | Período | Foco |
|---|---|---|
| **0 — Validação** | 16/11 – 06/12/2026 | Protótipo estático, think-aloud, professores, spike de equivalência |
| **1 — Núcleo** | 07/12/2026 – 07/02/2027 | Parser, semântica, interpretador, IDE sobre fixtures |
| **2 — 5 linguagens** | 08/02 – 21/03/2027 | Python, Java, C, C++, PHP + CI diferencial + fuzz |
| **3 — Pedagogia** | 22/03 – 04/04/2027 | Modo construção, catálogo, atividades |
| **4 — IA opcional** | 05/04 – 18/04/2027 | Copiloto passo a passo |
| **5 — Piloto** | 19/04 – 30/05/2027 | Preparação, 2 sessões com turma real, relatório |
| **v1.1** | jun – jul/2027 | JavaScript, C#, Go (8 linguagens) + execução real no servidor |

---

## Status

Fase 0 (validação). Prontos: monorepo TypeScript com CI, spike de equivalência nas 5 linguagens
(14 programas), 5 programas didáticos com mapa elemento → trecho, protótipo da IDE em `apps/web` e,
adiantados da Sprint 1, o lexer e o parser do português estruturado. Detalhes e próximos passos em
[`docs/PROGRESSO.md`](./docs/PROGRESSO.md).

```bash
pnpm install && pnpm test        # monorepo
pnpm dev                         # protótipo em http://localhost:5173
pnpm spike                       # spike com os runtimes instalados
```

## Contribuindo

Desenvolvido por **Renato Rosa** (com Claude). Abra uma issue antes de enviar um pull request.

## Licença

[MIT](./LICENSE) © 2026 Renato Rosa
