# EducAI

> Uma IDE educacional com copiloto de IA: o aluno escreve em **português estruturado** (estilo
> VisualG/Portugol) e vê o mesmo programa, **simultaneamente**, em **C, C++, Java, Python e PHP** —
> com **cada elemento explicado em contexto, em cada linguagem**.

O código gerado é **código de produção**: o aluno não precisa reescrevê-lo depois em outra linguagem.

---

## O problema

O aluno de tecnologia hoje enfrenta dois males opostos:

1. **Aprende uma linguagem isolada** e não enxerga o que é "conceito" e o que é "sintaxe daquela
   linguagem". Migrar de Python para C ou de Java para PHP parece começar do zero.
2. **Usa IA para gerar código pronto** e vira analfabeto funcional: o programa funciona, mas ele não
   sabe explicar uma linha.

O EducAI ataca a pergunta: **como usar IA para produzir código real sem terceirizar o entendimento
do aluno?**

## A tese

> Se o aluno escreve **uma vez** em português estruturado e vê o **mesmo conceito** materializado
> em várias linguagens, com explicação ancorada em cada elemento, ele aprende **o conceito** e, por
> tabela, aprende **todas as linguagens ao mesmo tempo** — sem reescrever código.

---

## Como funciona

```
 Português estruturado
        │
        ▼
 ┌─────────────┐     ┌──────────────────┐     ┌─────────────────────────┐
 │   Parser    │ ──▶ │  AST / IR única   │ ──▶ │  Geradores (1 por lang.) │
 │  + semântica│     │  (IDs + spans)    │     │  Python · C · C++ · Java │
 └─────────────┘     └──────────────────┘     │  · PHP + mapa de tokens  │
                                               └───────────┬─────────────┘
                                                           │
                        ┌──────────────────────────────────┼───────────────┐
                        ▼                                  ▼               ▼
                 ┌─────────────┐                  ┌─────────────┐  ┌─────────────┐
                 │  Execução   │                  │  Explicador │  │  Copiloto   │
                 │  (sandbox)  │                  │  por nó +   │  │  NL → PT-BR │
                 │  compara    │                  │  linguagem  │  │  + reparo   │
                 │  saídas     │                  │  + nível    │  │             │
                 └─────────────┘                  └─────────────┘  └─────────────┘
```

**Decisão-chave:** todas as linguagens nascem de uma **única AST/IR**. Nunca traduzimos "texto de
linguagem A → texto de linguagem B". Cada gerador também emite um mapa `nodeId → range`, o que torna
o *highlight cruzado* entre abas e a *explicação por elemento* sempre coerentes.

## Funcionalidades (MVP)

- **Editor multi-linguagem:** escreva em PT-BR e veja o programa em abas sincronizadas.
- **Highlight cruzado:** clique em `enquanto` em Python e acenda o equivalente em C, Java etc.
- **Explicação por elemento e por linguagem:** o que é, por que existe, como aparece em cada
  linguagem, pegadinhas — em níveis iniciante/intermediário/avançado.
- **Execução real:** o código é compilado/executado em sandbox e as saídas são comparadas.
- **Erros em português:** sintaxe e semântica apontam o elemento e o conceito, sem stack trace.
- **Copiloto NL → PT-BR:** "faça um programa que calcule a média de 4 notas" vira português
  estruturado válido, com validação no parser e loop de reparo.

### Fora do escopo do MVP

Debugger, autocomplete/LSP completo, colaboração em tempo real, mobile nativo, gamificação,
integração com LMS, bibliotecas externas arbitrárias e todo o PHP "do mundo". O MVP cobre um
**subconjunto canônico** de algoritmos.

---

## Subconjunto da linguagem (v1)

- Variáveis: `inteiro`, `real`, `texto`, `logico`
- Atribuição, operadores aritméticos, relacionais e lógicos
- `escreva` / `leia`
- `se` / `senao`
- `enquanto`, `para`
- Funções e procedimentos com parâmetros e retorno
- Vetores de uma dimensão (índice a partir de `0`)
- Comentários

Se o conceito não cabe no subconjunto, o sistema **rejeita com mensagem educativa** em vez de gerar
código duvidoso.

---

## Stack

| Camada | Escolha |
|---|---|
| Frontend | Next.js + React + Monaco Editor |
| API/BFF | Node (NestJS) ou Python (FastAPI) |
| Parser / IR / geradores | Python + Lark (ou ANTLR), templates Jinja2 |
| LLM | API de modelo (OpenAI/Anthropic) com camada de abstração |
| Execução | Piston (self-hosted) ou Judge0 |
| Banco / Cache | PostgreSQL / Redis |

> A stack ainda está em decisão na fase de fundação — o importante é a arquitetura, não a
> ferramenta. Detalhes em [`context.md`](./context.md).

---

## Documentação

| Documento | Conteúdo |
|---|---|
| [`dor.md`](./dor.md) | A dor original que deu origem ao projeto |
| [`context.md`](./context.md) | Visão, público-alvo, objetivo do MVP, arquitetura, riscos e decisões abertas |
| [`sprint.md`](./sprint.md) | Plano de execução: fases, sprints, tarefas, critérios de aceite e cronograma |

---

## Roadmap

| Fase | Sprints | Foco |
|---|---|---|
| **A — Ideação e Discovery** | Sprint 0 | Escopo, arquitetura, protótipo |
| **B — Fundação do compilador** | Sprints 1–2 | Gramática, AST, semântica, geradores Python/C |
| **C — Experiência multi-linguagem** | Sprints 3–4 | Editor com abas, highlight, execução |
| **D — IA pedagógica** | Sprints 5–6 | Explicador por nó, copiloto NL→PT-BR |
| **E — Produto e piloto** | Sprints 7–8 | Contas, projetos, telemetria, turma piloto |
| **F — Hardening e release** | Sprint 9 | Segurança, performance, deploy e documentação |

Detalhes completos em [`sprint.md`](./sprint.md).

---

## Status

Projeto em fase de **ideação e fundação** — nesta etapa o repositório contém a documentação de
contexto e o plano de sprints. O código do compilador, da IDE e dos serviços começa na Fase B.

## Contribuindo

O projeto é desenvolvido por **Renato Rosa** e **Vitório**. Para propor mudanças, abra uma issue
descrevendo o problema ou a ideia antes de enviar um pull request.

## Licença

[MIT](./LICENSE) © 2026 Renato Rosa
