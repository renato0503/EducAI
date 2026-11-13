# EducAI — Contexto do MVP (v2, plano revisado)

> Documento de contexto do projeto. Consolida a dor original (`dor.md`), o objetivo do MVP,
> a arquitetura, o público-alvo e as decisões.
>
> **v2 (nov/2026):** revisado após avaliação crítica. A premissa é a mesma; mudou *como* chegar lá
> de forma factível para 2 pessoas em dedicação parcial. Ver §12 (o que mudou e por quê).
>
> Projeto de **Renato + Vitório**.

---

## 1. Visão em uma frase

Uma **IDE educacional, com ou sem auxílio de IA**, em que o aluno escreve em **português
estruturado** (estilo VisualG/Portugol) e, **conforme o código vai surgindo**, vê **cada elemento
replicado e explicado ao mesmo tempo** nas principais linguagens — **Python, Java, C, C++ e PHP**
no MVP, chegando a **8 linguagens** (+ JavaScript, C# e Go) na v1.1.

O código gerado é **código real**: idiomático, compila e roda em cada linguagem — não é
pseudocódigo. O aluno não precisa reescrevê-lo em outra linguagem.

---

## 2. Problema / dor

O aluno de tecnologia enfrenta dois males opostos:

1. **Aprende uma linguagem isolada** e não enxerga o que é "conceito" e o que é "sintaxe daquela
   linguagem". Migrar de Python para C ou de Java para PHP parece começar do zero.
2. **Usa IA para gerar código pronto** e vira analfabeto funcional: o programa funciona, mas ele não
   sabe explicar uma linha.

A pergunta que o EducAI ataca: **como produzir código real — com ou sem IA — sem terceirizar o
entendimento do aluno?**

### Tese do produto (hipótese a validar)

> Se o aluno escreve **uma vez** em português estruturado e vê **cada elemento** materializado
> nas várias linguagens, no momento em que ele surge, com explicação ancorada nele, ele aprende
> **o conceito** e passa a **reconhecer e transferir** esse conceito para as outras linguagens.

Isto é uma **hipótese**, não um fato. A Fase 0 (sprint.md §4) existe para testá-la barato antes de
construir o compilador, e o piloto mede **transferência** (§4.3), não só satisfação.

---

## 3. Público-alvo

### Persona primária — Aluno iniciante
- **Quem:** 16–35 anos, técnico em informática, ADS, Ciência da Computação, Eng. de Software,
  bootcamp ou curso livre. Primeira ou segunda linguagem.
- **Dor:** "copio o código da IA, roda, mas não sei explicar"; "mudei de linguagem e travei".
- **Quer:** entender rápido, ver rodando, comparar linguagens lado a lado.

### Persona secundária — Professor (canal de entrada do produto)
- **Quem:** professor de lógica, algoritmos, programação I/II.
- **Dor:** turmas heterogêneas, alunos que colam código de IA, já tem material em VisualG/Portugol.
- **Quer:** mostrar o mesmo conceito em várias linguagens; **controlar a IA** (poder desligá-la);
  verificar se o aluno entendeu.
- **Por que importa:** sem o professor não há turma, nem piloto. As preocupações dele (cola,
  compatibilidade com o material atual) são requisitos, não detalhes.

### Persona terciária — Instituição
- Escola técnica, faculdade, curso livre, ONG. Quer resultado pedagógico demonstrável.

### Fora do público do MVP
- Desenvolvedor profissional buscando produtividade; crianças; tópicos avançados.

---

## 4. Objetivo do MVP

### 4.1 Objetivo central

Provar o **loop de aprendizado multi-linguagem** de ponta a ponta:

> O aluno escreve (ou constrói com o copiloto, passo a passo) um programa em português
> estruturado → **a cada elemento que surge**, as **5 abas** (Python, Java, C, C++, PHP) se
> atualizam e o elemento novo acende em todas → o aluno clica em qualquer elemento, em qualquer
> aba, e vê a explicação daquele elemento **em cada linguagem** → executa e vê a saída.

### 4.2 Critérios de sucesso do MVP (Definition of Done)

- [ ] Aluno escreve um programa de ~30–50 linhas (variáveis, `leia`/`escreva`, `se`, `enquanto`,
      `para`, funções/procedimentos, vetores) e o parser aceita, com erros em PT-BR enquanto digita.
- [ ] O programa aparece **em 5 linguagens** (Python, Java, C, C++, PHP), atualizado a cada edição.
- [ ] **Modo construção:** cada elemento novo (digitado ou vindo do copiloto) é destacado em todas
      as abas e gera um cartão de explicação no "fio de elementos".
- [ ] Clicar/hover em um elemento em qualquer aba destaca o equivalente em todas as outras —
      inclusive elementos que **só existem em uma linguagem** (ex.: `#include`, `public class Main`).
- [ ] O painel explica o elemento **em cada linguagem**, em 2 níveis (básico / aprofundar),
      **sem depender de IA**.
- [ ] O programa **executa** no navegador (interpretador de referência, com `leia` interativo).
- [ ] **Garantia de equivalência:** todo programa que o interpretador executa até o fim produz
      saída **idêntica** nas 5 linguagens — garantido por testes diferenciais no CI com os
      compiladores/interpretadores reais (ver `docs/semantica.md`).
- [ ] Atividades ativas: "preveja a saída", "complete a lacuna em C/Java", "qual linha corresponde?".
- [ ] **IA opcional:** a IDE funciona 100% sem IA. Com IA ligada, o copiloto constrói o programa
      **passo a passo** (cada passo validado e explicado) e o professor pode desligá-lo por turma.
- [ ] Piloto com uma turma real (10–30 alunos, 2 sessões), métricas da §4.3 coletadas.

### 4.3 Métricas do piloto

| Métrica | Como medir | Meta |
|---|---|---|
| **Transferência** (mede a tese) | Pós-teste: prever a saída de um trecho em linguagem que o aluno não estudou (ex.: Java) e apontar o equivalente de uma linha | Grupo "5 abas" ≥ 15 pontos percentuais acima do grupo "PT-BR + Python" |
| **Compreensão** | Aluno explica 3 elementos do próprio programa (rubrica 0–3, avaliada pelo professor) | Média ≥ 2 |
| **Retenção** | Mesmo teste de transferência 1 semana depois (sessão 2) | Queda ≤ 25% |
| **Uso** | Telemetria: abas abertas, cartões lidos, atividades feitas | ≥ 70% dos alunos usam ≥ 3 linguagens e ≥ 5 cartões |
| **Retorno** | Uso voluntário entre a sessão 1 e a 2 | ≥ 40% |
| **Técnica** | Programas dos alunos re-executados offline (com consentimento) nos 5 runtimes reais | 100% idênticos quando o interpretador terminou sem erro (qualquer falha = bug a corrigir) |
| **Latência** | Parse + geração das 5 linguagens no navegador | < 150 ms para 50 linhas (p95) |

Desenho: turma dividida aleatoriamente por código de acesso em dois grupos (5 abas × PT-BR +
Python). Sem grupo de comparação não dá para atribuir o resultado à tese.

### 4.4 Fora do escopo do MVP

- Execução no servidor/sandbox (o MVP executa no navegador; os runtimes reais rodam no CI) — v1.1.
- Debugger, LSP/autocomplete completo, colaboração em tempo real, mobile nativo.
- Contas com e-mail/senha (MVP usa **código de turma + apelido**).
- Gamificação, LMS, marketplace, painel completo do professor.
- Matrizes, `escolha`, `repita`, arquivos, registros, OO (v2 da linguagem).
- JavaScript, C# e Go (v1.1, após o piloto — ver sprint.md §11).

---

## 5. Princípios do produto (não podem ser quebrados)

1. **Uma fonte de verdade semântica.** Todas as linguagens nascem de uma única **AST/IR**. Nunca
   traduzir texto de linguagem A → texto de linguagem B.
2. **O interpretador de referência é o juiz.** Ele define a semântica e é **mais estrito que todas
   as linguagens-alvo**: tudo que ele aceita roda igual em todas; o que divergiria (overflow,
   divisão de negativos, índice fora do vetor…) ele interrompe com uma explicação da "pegadinha".
3. **Código real, idiomático.** O que sai em cada linguagem compila, roda e parece escrito por uma
   pessoa daquela linguagem — dentro do subconjunto.
4. **Cada elemento é explicado onde e quando aparece.** Todo trecho de código gerado — inclusive
   o que não vem de nenhuma linha em PT-BR (`#include`, `class Main`, `Scanner`) — tem um ID e
   uma explicação.
5. **A IA é opcional e nunca escreve na linguagem-alvo.** Sem IA, o produto funciona. Com IA, ela
   só produz **AST/PT-BR validado** e frases contextuais; o código das 5 linguagens é sempre
   determinístico.
6. **O aluno no comando.** Nada da IA entra no editor sem passar pelo validador e sem o aluno ver,
   passo a passo. O professor controla se a IA está disponível.
7. **Divulgação progressiva.** Explicação em camadas (básico → aprofundar); modo "foco" com 1–2
   linguagens e modo "grade" com todas.

---

## 6. Arquitetura

### 6.1 Visão em camadas

```
┌──────────────────────────── NAVEGADOR (tudo determinístico, sem servidor) ──────────────────┐
│  Editor PT-BR (Monaco)                     Abas/grade: Python | Java | C | C++ | PHP        │
│        │                                          ▲          (Monaco read-only)              │
│        ▼                                          │                                          │
│  ┌──────────┐   ┌──────────┐   ┌───────────┐   ┌──┴────────────┐   ┌──────────────────────┐ │
│  │ Lexer +  │──▶│ Semântica│──▶│ AST/IR    │──▶│ Geradores (5) │   │ Catálogo de          │ │
│  │ Parser   │   │ (tipos,  │   │ anotada   │   │ + mapa nó →   │   │ explicações (JSON)   │ │
│  │ c/ recup.│   │ escopos) │   │ (IDs)     │   │ N ranges      │   │ por nó × linguagem   │ │
│  └──────────┘   └──────────┘   └─────┬─────┘   └───────────────┘   └──────────────────────┘ │
│                                      │                                                       │
│                         ┌────────────┴───────────┐   ┌───────────────────────────────┐       │
│                         │ Interpretador de        │   │ Diff de AST → "modo construção"│       │
│                         │ referência (console,    │   │ (elementos novos acendem e     │       │
│                         │ leia interativo)        │   │ geram cartões)                 │       │
│                         └────────────────────────┘   └───────────────────────────────┘       │
└──────────────────────────────────────────┬──────────────────────────────────────────────────┘
                                           │ HTTPS (só para o que precisa de servidor)
┌──────────────────────────────────────────▼──────────────────────────────────────────────────┐
│  API pequena: código de turma, projetos, telemetria anônima, proxy de LLM (opcional, c/ teto)│
└──────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────── CI (GitHub Actions + imagem Docker com os runtimes reais) ──────────┐
│  corpus + programas aleatórios (fuzz) → interpretador × python3 × javac/java × gcc × g++ × php│
│  → saídas idênticas? senão, o build quebra                                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Por que tudo no navegador:** parse e geração a cada tecla sem ida ao servidor (latência ~0),
execução instantânea com `leia` interativo, **nenhum sandbox para proteger no MVP** e hospedagem
quase gratuita. O servidor fica pequeno e só existe para turma, telemetria e IA.

### 6.2 Pipeline

```
Texto PT-BR
  │
  ▼ 1. LEXER + PARSER (descida recursiva, recuperação por comando)
  │     → AST com spans; um comando quebrado não derruba o programa inteiro
  ▼ 2. SEMÂNTICA
  │     → tipos, escopos, aridade, regras de equivalência (docs/semantica.md), erros em PT-BR
  ▼ 3. IR ANOTADA (tipos resolvidos, IDs por caminho estrutural)
  ├──▶ 4a. GERADORES (emissor programático: emit(texto, nodeId))
  │         → código + mapa nodeId → [ranges] + nós sintéticos por linguagem
  ├──▶ 4b. INTERPRETADOR DE REFERÊNCIA (execução estrita; o oráculo dos testes)
  ├──▶ 4c. DIFF DE AST → elementos novos/alterados → modo construção
  └──▶ 4d. EXPLICAÇÃO: catálogo (nó × linguagem × nível) + slots do programa
            (+ frase contextual da IA, se ligada)
```

### 6.3 Decisão-chave: IR única + mapa de tokens (corrigido)

- **Uma AST só**, com nós `programa`, `declaracao`, `atribuicao`, `escreva`, `leia`, `se`,
  `enquanto`, `para`, `funcao`, `procedimento`, `parametro`, `chamada`, `retorno`, `indice`,
  `operacao`, `literal`, `variavel`, `comentario`.
- **IDs por caminho estrutural** (ex.: `main/2/cond/esq`) — determinísticos; para o modo
  construção, um diff por lista de comandos (tipo + hash do conteúdo) identifica o que é novo.
- **Mapa `nodeId → lista de ranges`.** Um nó pode aparecer em vários pedaços:
  `escreva("Média: ", m)` → `printf("Média: %.2f\n", m)` (o `m` está no `%.2f` e no argumento);
  `para` → três pedaços do `for`; função em C → protótipo + definição.
- **Nó sem equivalente** é mapeado como vazio e explicado ("Python não exige declarar o tipo").
- **Nós sintéticos** por linguagem, com ID próprio (`syn:c.include_stdio`, `syn:java.class_main`,
  `syn:java.scanner`, `syn:php.open_tag`, `syn:cpp.using_std`…) e cartão de explicação curado. É
  justamente o "boilerplate" que mais confunde o iniciante.
- **Emissor programático, não templates de texto.** Cada gerador chama `emit(texto, nodeId)`; o
  emissor calcula linha/coluna e monta o mapa. Isso torna o mapa correto por construção.

Exemplo de saída de um gerador:

```json
{
  "linguagem": "c",
  "codigo": "#include <stdio.h>\n\nint main(void) {\n    int i = 0;\n    while (i < 10) { ... }",
  "mapa": {
    "syn:c.include_stdio": [[1,1,1,19]],
    "syn:c.main":          [[3,1,3,17]],
    "main/0":              [[4,5,4,15]],
    "main/1":              [[5,5,5,10]],
    "main/1/cond":         [[5,12,5,18]]
  }
}
```

### 6.4 Subconjunto canônico da linguagem (v1)

Sintaxe **compatível com um subconjunto do VisualG** (para aproveitar o material dos professores),
fechada e sem ambiguidade. A especificação completa, com o comportamento de cada caso em cada
linguagem, está em [`docs/semantica.md`](./docs/semantica.md).

- Tipos: `inteiro` (faixa de 32 bits), `real`, `caractere` (texto, máx. 255), `logico`.
- `algoritmo` / `var` / `inicio` / `fimalgoritmo`; atribuição `<-`.
- `escreva` / `escreval` (com formato `x:0:2` para real); `leia` (uma linha por valor).
- Aritméticos (`+ - * /`, `div`, `mod`), relacionais, lógicos (`e`, `ou`, `nao`).
- `se … entao … senao … fimse`; `enquanto … faca … fimenquanto`;
  `para … de … ate … [passo k] faca … fimpara`.
- `funcao` / `procedimento` com parâmetros por valor; vetores por referência.
- `vetor[0..N-1] de tipo` (uma dimensão, tamanho constante, **índice a partir de 0** — ver §10).
- Operações em `caractere`: atribuir, concatenar (`+`), comparar (`=`, `<>`), `compr()`.
- Comentários `//` (preservados e replicados em todas as linguagens).

> Regra: o que não cabe no subconjunto é **rejeitado com mensagem educativa**; o que caberia mas
> divergiria entre linguagens é **interrompido pelo interpretador com a explicação da pegadinha**.

### 6.5 Stack (decidida)

| Camada | Escolha | Por quê |
|---|---|---|
| Linguagem única | **TypeScript** (monorepo pnpm) | Um só idioma para compilador, UI e API; o compilador roda no navegador e no CI |
| Parser | **Descida recursiva escrita à mão** (+ Pratt para expressões) | Gramática pequena; controle total das mensagens em PT-BR e da recuperação de erro durante a digitação |
| Frontend | **Vite + React + Monaco** | SPA estática; Monaco para os 6 editores (1 editável + 5 read-only) |
| Catálogo de explicações | Arquivos **JSON/YAML versionados** no repo | Revisáveis em PR, sem servidor, sem custo |
| API | **Node + Hono/Fastify** (pequena) | Turma, projetos, telemetria, proxy de LLM |
| Banco | **Postgres gerenciado** (Supabase/Neon, plano gratuito) | Pouco volume; sem Redis no MVP |
| Testes diferenciais | **GitHub Actions + imagem Docker** com python3, OpenJDK, gcc, g++, php | Runtimes reais com versões fixadas |
| LLM (opcional) | API de modelo com camada de abstração | Copiloto passo a passo + frase contextual |
| Hospedagem | Hospedagem estática (Cloudflare Pages/Vercel) + API em plano pequeno | Custo perto de zero no piloto |

### 6.6 Modelo de dados mínimo

```
Turma        (id, codigo_acesso, nome, ia_habilitada, grupo_experimento)
Aluno        (id, turma_id, apelido, criado_em)                # sem e-mail, sem nome real
Projeto      (id, aluno_id, nome, fonte_ptbr, atualizado_em)
Evento       (id, aluno_id, tipo, payload_json, criado_em)     # telemetria anônima
Geracao_IA   (id, aluno_id, pedido, passos_json, prompt_versao, sucesso, custo, criado_em)
```

As explicações **não** ficam no banco: são o catálogo versionado no repositório.

### 6.7 Jornada do aluno

1. Entra com **código da turma + apelido** → programa de exemplo já aberto.
2. Escreve em PT-BR (ou pede ao copiloto, se a turma tiver IA). Erros em português aparecem
   sublinhados enquanto digita.
3. **A cada comando completo**, as 5 abas se atualizam; o elemento novo **acende em todas** e um
   cartão "Novo: laço `enquanto`" entra no fio de elementos.
4. Clica em qualquer elemento, em qualquer aba → destaque em todas + painel "o que é / por que existe
   / como fica em cada linguagem / pegadinha".
5. Clica em "Executar" → console com `leia` interativo; se o programa cair numa divergência, a
   explicação mostra como cada linguagem se comportaria.
6. Faz atividades: prever a saída, completar a lacuna em C/Java, achar a linha equivalente.
7. Alterna "grade" (5 linguagens) ↔ "foco" (escolhe 1–2).

---

## 7. Papel da IA (opcional) e limites

### Sem IA (padrão do núcleo)
- Explicações vêm do **catálogo curado** preenchido com dados do programa (nome da variável, tipo,
  valores) → contextualizadas e determinísticas, sem custo e sem alucinação.

### Com IA (turma com `ia_habilitada`)
- **Copiloto em modo construção:** "faça um programa que calcule a média de 4 notas" → a LLM devolve
  um **plano de passos**, cada passo é um comando em **AST JSON** (saída estruturada por schema) →
  validação semântica → o passo entra no editor → acende nas 5 abas com cartão → o aluno avança
  ("próximo passo"), edita ou descarta. Isso atende à premissa: **conforme o código é gerado, cada
  elemento é mostrado e replicado em todas as linguagens**.
- **Frase contextual:** 1–2 frases sobre o papel do elemento *neste* programa, exibidas abaixo do
  cartão curado (nunca no lugar dele).
- **Checagem de intenção:** o programa do copiloto roda no interpretador com 2–3 entradas de
  exemplo geradas junto; se falhar, mensagem honesta.

### O que a IA NUNCA faz
- Não escreve código em Python/Java/C/C++/PHP.
- Não entra no editor sem validação e sem o aluno ver o passo.
- Não substitui o catálogo: se a IA cair, nada no produto quebra.

### Guarda-corpos
- Schema JSON obrigatório; até 2 reparos com o erro do validador; senão, mensagem honesta.
- Teto de gasto mensal + rate limit por turma e por aluno; corte automático.
- Professor liga/desliga a IA por turma (resposta direta à preocupação com cola).
- Registro de cada geração (`Geracao_IA`) para auditoria e melhoria do prompt.

---

## 8. Riscos e mitigações

| Risco | Sev. | Mitigação |
|---|---|---|
| A tese não se sustenta (aluno ignora as outras abas ou se sobrecarrega) | Bloqueador | Fase 0 com protótipo estático e think-aloud **antes** do compilador; modo foco/grade; piloto com grupo de comparação |
| Saídas divergem entre linguagens | Bloqueador | `docs/semantica.md` + interpretador estrito + testes diferenciais e fuzz no CI com runtimes reais |
| `caractere` em C (buffers, strcmp, leitura de linha) | Alto | Tamanho máx. 255, operações limitadas, padrão de geração fixo; C++ usa `std::string` |
| Cronograma estourar | Alto | Orçamento em horas com 20% de folga (sprint.md §2); ordem de corte definida; IA é o 1º corte |
| Renato como gargalo do caminho crítico | Alto | Vitório assume PHP, C++, catálogo e todo o frontend; fixtures da Fase 0 desacoplam UI e compilador |
| Mapa de tokens incorreto | Alto | Emissor programático; teste automático "todo caractere não-branco do código gerado pertence a algum nó" |
| Professor rejeitar por cola | Alto | IA desligável por turma; copiloto passo a passo; atividades ativas |
| Explicação errada no catálogo | Médio | Revisão em PR com checklist; rascunho por LLM offline + revisão humana; testes que verificam que todo nó/sintético tem cartão |
| Sobrecarga cognitiva com 5 abas | Médio | Modo foco por padrão para iniciante; grade sob demanda; validar na Fase 0 |
| Sintaxe incompatível com o material do professor | Médio | Subconjunto compatível com VisualG; validar com professores na Fase 0 |
| LGPD (adolescentes 16–17, transferência para provedor de LLM) | Médio | Sem dados pessoais (apelido + código); termo com a instituição; IA desligável; não enviar nada além do programa |
| Custo/abuso do proxy de LLM | Baixo | Teto mensal, rate limit, só turmas autenticadas por código |
| Segurança de execução | Baixo no MVP | Não há execução no servidor no MVP; volta a ser Alto na v1.1 (sandbox) |
| Dependência de provedor de LLM | Baixo | IA opcional + camada de abstração |

---

## 9. Roadmap resumido

| Fase | Período (2026–27) | Resultado |
|---|---|---|
| **0 — Validação** | 16/nov – 06/dez | Tese testada com protótipo estático; spec de semântica; decisões fechadas |
| **1 — Núcleo do compilador + casca da IDE** | 07/dez – 07/fev | PT-BR → AST → interpretador, com erros em PT-BR, rodando no navegador |
| **2 — 5 linguagens** | 08/fev – 21/mar | Python, Java, C, C++, PHP com mapa e equivalência garantida no CI |
| **3 — Experiência pedagógica** | 22/mar – 04/abr | Modo construção, catálogo completo, atividades ativas |
| **4 — IA opcional** | 05/abr – 18/abr | Copiloto passo a passo + frase contextual (cortável) |
| **5 — Piloto** | 19/abr – 30/mai | Preparação, 2 sessões com a turma, relatório |
| **v1.1** | jun – jul/2027 | JavaScript, C#, Go (8 linguagens) + execução real no servidor |

Detalhes em [`sprint.md`](./sprint.md).

---

## 10. Decisões

### Fechadas nesta revisão
1. **Stack:** TypeScript ponta a ponta; compilador roda no navegador (§6.5).
2. **Linguagens:** MVP com **5** (Python, Java, C, C++, PHP); v1.1 com **8** (+ JavaScript, C#, Go).
3. **Produto:** web (SPA estática + API pequena). Offline/desktop pós-MVP.
4. **Execução no MVP:** interpretador de referência no navegador; runtimes reais no CI. Sandbox no
   servidor só na v1.1.
5. **IA:** opcional, desligável por turma, nunca escreve em linguagem-alvo.
6. **Explicações:** catálogo curado versionado (núcleo) + IA contextual (opcional).
7. **Identificação:** código de turma + apelido; sem e-mail no MVP.

### Ainda em aberto (fechar na Fase 0, gate G0)
1. **Instituição/turma/professor do piloto, com data** (piloto previsto para maio/2027).
2. **Índice de vetor:** recomendação **0** (`vetor[0..9]`), com mensagem educativa quando o aluno
   escreve `[1..10]`. Confirmar com os professores; se exigirem `[1..n]`, a alternativa é suportar
   o limite inferior declarado com deslocamento explícito e explicado no código gerado.
3. **Nome/branding:** "EducAI" é nome de trabalho.
4. **Modelo de negócio e licença:** o repositório já está como MIT. Confirmar se o projeto é open
   source; se for, o diferencial é o catálogo curado, a garantia de equivalência e a relação com
   professores — não o código.

---

## 11. Resumo para alinhamento

- **O que é:** IDE educacional, com ou sem IA, que replica cada elemento escrito em PT-BR em 5
  linguagens (8 na v1.1), no momento em que ele surge, e explica cada um em cada linguagem.
- **Diferencial:** equivalência **garantida** entre linguagens (interpretador estrito + testes com
  runtimes reais), explicação de **todo** trecho (inclusive o boilerplate) e IA sob controle do
  professor. Uma conversa com um chatbot genérico não oferece nenhuma dessas três garantias.
- **MVP:** subconjunto VisualG, 5 linguagens, execução no navegador, catálogo curado, modo
  construção, atividades, IA opcional, piloto com grupo de comparação.
- **Sucesso:** o aluno consegue **ler e prever** código numa linguagem que não estudou.

---

## 12. O que mudou em relação à v1 do plano (e por quê)

| v1 | v2 | Motivo |
|---|---|---|
| Piloto na semana 17, sem validação antes | Fase 0 de 3 semanas com protótipo estático | Testar a tese antes de ~500 h de código |
| Python + Lark + FastAPI + Next.js | TypeScript ponta a ponta, compilador no navegador | 1 linguagem para 2 pessoas; latência zero; sem sandbox no MVP |
| Sandbox Piston/Judge0 no MVP | Interpretador no navegador + runtimes reais no CI | Remove o maior risco de operação e segurança; `leia` interativo |
| Equivalência como risco "Médio" | Spec de semântica + interpretador estrito + fuzz | Era o principal risco técnico |
| Mapa `nodeId → 1 range`, templates Jinja | `nodeId → N ranges`, nós sintéticos, emissor programático | Um nó aparece em vários lugares; boilerplate precisa de explicação |
| Explicação 100% por LLM, com cache | Catálogo curado + IA contextual opcional | Sem alucinação, sem custo, sem latência; IA opcional como pedido |
| Copiloto entrega programa pronto | Copiloto passo a passo, desligável pelo professor | Mantém a premissa sem virar ferramenta de cola |
| 3 linguagens no MVP, 5 "depois" | 5 no MVP, 8 na v1.1 | Gerador por emissor + testes diferenciais tornam cada linguagem extra barata |
| Sem gerador Java em nenhuma sprint | Java na Sprint 5 | Buraco no cronograma |
| Hardening depois do piloto | Segurança/LGPD antes do piloto | Piloto é com alunos reais |
| Contas com e-mail, histórico, 3 níveis | Código de turma, 2 níveis, sem histórico | Corte de escopo e menos exposição a LGPD |
| Métricas de autoavaliação, 1 sessão | Teste de transferência com grupo de comparação, 2 sessões | Medir a tese, não a satisfação |
