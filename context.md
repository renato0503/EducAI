# EducAI — Contexto do MVP

> Documento de contexto do projeto. Consolida a dor original (`dor.md`), o objetivo do MVP,
> a arquitetura proposta, o público-alvo e as decisões em aberto.
>
> Projeto de **Renato + Vitório**.

---

## 1. Visão em uma frase

Uma **IDE educacional com copiloto de IA** em que o aluno escreve em **português estruturado**
(estilo VisualG/Portugol) e vê, **ao mesmo tempo e em abas sincronizadas**, o mesmo programa
traduzido para **C, C++, Java, Python e PHP** — com **cada elemento do código explicado em
contexto, em cada linguagem**.

O código gerado é de **produção**: o aluno não precisa reescrevê-lo depois em outra linguagem.

---

## 2. Problema / dor

Hoje o aluno de tecnologia enfrenta dois males opostos:

1. **Aprende uma linguagem isolada** e não enxerga o que é "conceito" e o que é "sintaxe daquela
   linguagem" (variável, laço, função, ponteiro, classe). Migrar de Python para C ou de Java para
   PHP parece começar do zero.
2. **Usa IA para gerar código pronto** e vira analfabeto funcional: o programa funciona, mas ele não
   sabe explicar uma linha. A IA entrega a resposta e mata o aprendizado.

A dor que o EducAI ataca: **como usar IA para produzir código real sem terceirizar o entendimento
do aluno?**

### Tese do produto

> Se o aluno escreve **uma vez** em português estruturado e vê o **mesmo conceito** materializado
> em várias linguagens, com explicação ancorada em cada elemento, ele aprende **o conceito** e,
> por tabela, aprende **todas as linguagens ao mesmo tempo** — sem reescrever código.

---

## 3. Público-alvo

### Persona primária — Aluno iniciante
- **Quem:** 16–35 anos, cursando técnico em informática, ADS, Ciência da Computação, Eng. de
  Software, bootcamp ou curso livre.
- **Contexto:** primeira ou segunda linguagem; já ouviu falar de Python/Java, mas não entende por
  que existem várias.
- **Dor:** "eu copio o código da IA, roda, mas não sei explicar"; "mudei de linguagem e travei".
- **O que quer:** entender rápido, ver resultado rodando, comparar linguagens lado a lado.

### Persona secundária — Professor / Instrutor
- **Quem:** professor de lógica, algoritmos, programação I/II, técnico.
- **Dor:** turmas heterogêneas, alunos que colam código de IA, pouco tempo para explicar 5 linguagens.
- **O que quer:** material que mostre o mesmo conceito em várias linguagens e um jeito de verificar
  se o aluno entendeu (explicações, exercícios).

### Persona terciária — Instituição
- Escola técnica, faculdade, curso livre, ONG de ensino de tecnologia.
- Quer **retenção e resultado pedagógico**, não só "mais uma ferramenta de IA".

### Fora do público do MVP
- Desenvolvedor profissional buscando produtividade (não é o foco).
- Crianças (linguagem e ritmo diferentes).
- Aluno avançado de tópicos específicos (concorrência, sistemas distribuídos).

---

## 4. Objetivo do MVP

### 4.1 Objetivo central

Provar o **loop de aprendizado multi-linguagem** de ponta a ponta:

> O aluno escreve um programa em português estruturado → o sistema valida, gera o código
> equivalente em **pelo menos 3 linguagens**, executa e mostra a saída → o aluno clica em qualquer
> elemento e recebe a explicação daquele elemento **em cada linguagem**.

### 4.2 Critérios de sucesso do MVP (Definition of Done)

- [ ] Aluno escreve um programa de ~30–50 linhas em PT-BR estruturado (variáveis, entrada/saída,
      `se`, `enquanto`, `para`, funções, vetores) e o parser aceita **sem erro**.
- [ ] O mesmo programa aparece em **abas sincronizadas** em pelo menos **3 linguagens**
      (proposta: Python, C e Java; C++ e PHP entram na sequência).
- [ ] Clicar/hover em um elemento em qualquer aba **destaca o elemento equivalente** nas outras abas.
- [ ] O painel lateral explica o elemento selecionado **em cada linguagem**, com nível ajustável
      (iniciante/intermediário/avançado).
- [ ] O código gerado **compila/executa de verdade** e produz a **mesma saída** em todas as abas.
- [ ] O aluno pode pedir ao copiloto "faça um programa que..." e recebe **português estruturado
      válido**, não código solto de uma linguagem.
- [ ] Erros de sintaxe/semântica são explicados **em português**, apontando o elemento e o conceito.
- [ ] Uma turma piloto (10–30 alunos) consegue usar sem treinamento prévio.

### 4.3 Métricas de sucesso (piloto)

- **Compreensão:** ≥ 80% dos alunos conseguem explicar, com as próprias palavras, 3 conceitos do
  programa depois de usar a ferramenta.
- **Comparação:** ≥ 70% relatam que passaram a entender a diferença entre as linguagens.
- **Engajamento:** ≥ 60% voltam a usar na semana seguinte.
- **Técnica:** ≥ 95% dos programas do subconjunto suportado geram código que executa com saída
  idêntica em todas as linguagens.
- **Latência:** geração + execução em < 5s; explicação de um elemento em < 2s (com cache).

### 4.4 Fora do escopo do MVP (não-objetivos)

- Debugger com breakpoints, autocomplete/LSP completo, refatoração.
- Colaboração em tempo real / multiusuário no mesmo arquivo.
- Versão mobile nativa.
- Gamificação, marketplace, integração com LMS (Moodle etc.).
- Todas as linguagens e todo o PHP "do mundo": o MVP cobre um **subconjunto canônico**.
- Suporte a bibliotecas externas arbitrárias.

---

## 5. Princípios do produto (regras que não podem ser quebradas)

1. **Uma fonte de verdade semântica.** Todas as linguagens nascem de uma **única representação
   intermediária (IR/AST)**. Nunca traduzir "texto de linguagem A → texto de linguagem B"; isso faz
   as abas divergirem ao longo do tempo.
2. **Código de produção, não pseudocódigo.** O que sai em Python/C/Java/PHP precisa rodar de verdade
   e ser legível/idiomático naquela linguagem.
3. **Explicação ancorada no elemento.** Cada nó da AST tem ID estável; a explicação é por nó e por
   linguagem, não um texto solto sobre o programa.
4. **A IA gera estrutura, não prosa livre.** O copiloto sempre devolve **português estruturado
   válido** (validado pelo parser), com loop de reparo.
5. **O aluno no comando.** IA sugere, o aluno edita; toda geração é visível, explicada e reversível.
6. **Divulgação progressiva.** Explicação em camadas (o que é / por que existe / como aparece em cada
   linguagem / pegadinhas) para não sobrecarregar o iniciante.
7. **Determinismo onde der.** Parser, geradores e execução são determinísticos; a IA fica restrita a
   explicações e à escrita do programa em PT-BR.

---

## 6. Arquitetura do projeto

### 6.1 Visão em camadas

```
┌──────────────────────────────────────────────────────────────────┐
│  WEB APP (Next.js + React + Monaco Editor)                       │
│  Abas: Português | Python | C | C++ | Java | PHP                 │
│  - highlight cruzado entre abas (mapa AST → ranges de token)      │
│  - painel de explicação por elemento e por linguagem              │
│  - console de execução e comparação de saídas                     │
└───────────────┬──────────────────────────────────────────────────┘
                │ REST/WebSocket
┌───────────────▼──────────────────────────────────────────────────┐
│  API / BFF                                                       │
│  - projetos, autenticação, histórico, cache de explicações        │
└──────┬───────────────┬──────────────────┬─────────────────────────┘
       │               │                  │
┌──────▼──────┐ ┌──────▼──────────┐ ┌─────▼───────────────────────┐
│ COMPILER    │ │ EXPLAINER       │ │ EXECUTION                   │
│ SERVICE     │ │ SERVICE         │ │ SERVICE                     │
│             │ │                 │ │                             │
│ PT-BR ──▶   │ │ AST + nó +      │ │ sandbox isolado (Piston/    │
│ Parser      │ │ linguagem +     │ │ Judge0/Docker)              │
│   │         │ │ nível           │ │ → compila (gcc/javac/php)   │
│   ▼         │ │   │             │ │ → executa                  │
│ AST/IR      │ │   ▼             │ │ → captura stdout/stderr    │
│   │         │ │ LLM + cache     │ │                             │
│   ▼         │ │ (por nó/ling.)  │ │                             │
│ Geradores   │ └─────────────────┘ └─────────────────────────────┘
│ Python/C/   │
│ C++/Java/PHP│        ┌──────────────────────────────┐
│ + token map │        │ COPILOTO (NL → PT-BR)        │
└─────────────┘        │ LLM + validação no parser    │
                       │ + loop de reparo             │
                       └──────────────────────────────┘
```

### 6.2 Pipeline principal (o coração)

```
Texto em PT-BR estruturado
      │
      ▼
1. PARSER (gramática fechada — Lark/ANTLR)
      │  produz AST tipada + spans (linha/coluna)
      ▼
2. ANÁLISE SEMÂNTICA
      │  tabela de símbolos, escopos, tipos, checagens
      │  erros amigáveis em PT-BR (não stack trace)
      ▼
3. IR / AST CANÔNICA (IDs estáveis por nó)
      │
      ├──▶ 4a. GERADORES DE CÓDIGO (um por linguagem, por nó, via templates)
      │         AST ──▶ Python | C | C++ | Java | PHP
      │         cada gerador emite também o mapa nó ↔ range de token
      │
      ├──▶ 4b. EXECUÇÃO (sandbox)
      │         compila/roda o código gerado, normaliza a saída
      │         (opcional: interpretador direto da IR para feedback instantâneo)
      │
      └──▶ 4c. EXPLICADOR
                para cada nó: explicação em cada linguagem, por nível
                (LLM com prompt ancorado no nó + cache versionado)
```

### 6.3 Decisão-chave: IR única + mapa de tokens

Este é o ponto que faz ou quebra o produto.

- **Uma AST só.** `se`, `enquanto`, `para`, `funcao`, `variavel`, `atribuicao`, `vetor`,
  `operacao`, `retorno`, `chamada`, `escreva`, `leia`.
- **Cada nó tem `id` estável**, `tipo`, `filhos` e `span` no texto PT-BR.
- **Cada gerador devolve, além do código, um `mapa: nodeId → {linha, colInicio, linhaFim, colFim}`**
  na linguagem de destino.
- Com isso o **highlight cruzado** e a **explicação por elemento** são triviais e sempre coerentes:
  o aluno clica em `enquanto` em Python, o sistema sabe qual nó é e acende o `while` em C, o `while`
  em Java etc.

Exemplo de AST (resumido):

```json
{
  "id": "n7",
  "tipo": "enquanto",
  "condicao": { "id": "n8", "tipo": "operacao", "op": "<", "esq": {"id":"n9","tipo":"variavel","nome":"i"}, "dir": {"id":"n10","tipo":"literal","valor":10} },
  "corpo": [ { "id": "n11", "tipo": "escreva", "expr": { "id":"n12","tipo":"variavel","nome":"i" } } ]
}
```

### 6.4 Subconjunto canônico da linguagem (MVP)

Sintaxe em PT-BR, inspirada no VisualG, mas **estruturada e sem ambiguidade**:

- Declaração e atribuição de variáveis (inteiro, real, texto, logico).
- `escreva` / `leia` (entrada/saída padronizada).
- Operadores aritméticos, relacionais e lógicos.
- `se` / `senao`.
- `enquanto`, `para`.
- Funções/procedimentos com parâmetros e retorno.
- Vetores/matrizes de uma dimensão (MVP), índice a partir de 0 (decisão explícita).
- Comentários.

> Regra: se o conceito não cabe no subconjunto, o MVP **rejeita com mensagem educativa**, não gera
> código duvidoso.

### 6.5 Stack sugerida (MVP)

| Camada | Escolha | Por quê |
|---|---|---|
| Frontend | **Next.js + React + Monaco** | Monaco dá editor sério; abas e highlight são viáveis |
| API/BFF | **Node (NestJS)** ou **Python (FastAPI)** | Time pequeno: escolher uma só |
| Parser/IR/geradores | **Python + Lark** (ou ANTLR) | Gramática declarativa, fácil iterar; geração por templates Jinja2 |
| LLM | API de modelo (OpenAI/Anthropic) | Explicações + NL→PT-BR |
| Execução | **Piston** (self-hosted) ou Judge0 | Já compila/roda várias linguagens em sandbox |
| Banco | **PostgreSQL** | Usuários, projetos, cache de explicações |
| Cache | **Redis** | Explicações e execuções repetidas |

> Alternativa: começar 100% TypeScript (parser com Chevrotain) se o time preferir uma linguagem só.
> O importante é a **arquitetura**, não a stack.

### 6.6 Modelo de dados mínimo

```
Usuario      (id, nome, email, papel: aluno|professor|admin)
Projeto      (id, usuario_id, nome, fonte_ptbr, criado_em, atualizado_em)
Execucao     (id, projeto_id, linguagem, saida, status, duracao_ms, criado_em)
Explicacao   (id, tipo_no, linguagem, nivel, texto, prompt_versao, hash_contexto)
Snapshot     (id, projeto_id, ast_json, mapa_tokens_json, versao)
Turma        (id, professor_id, nome)          # pós-MVP imediato
```

### 6.7 Fluxo do aluno (jornada do MVP)

1. Abre o projeto → editor em PT-BR à esquerda, abas de linguagens à direita (ou empilhadas).
2. Escreve (ou pede ao copiloto) um programa.
3. O sistema parseia em tempo real e mostra erros em português, com sublinhado no elemento.
4. Ao ficar válido, as abas são preenchidas: Python, C, Java (+ C++ e PHP).
5. Clica em "Executar" → vê a saída no console e a confirmação de que todas as linguagens deram o
   mesmo resultado.
6. Clica em qualquer elemento → painel explica "o que é", "por que existe" e "como aparece em cada
   linguagem".
7. Alterna o nível da explicação (iniciante → avançado).
8. Edita o PT-BR e tudo se atualiza de forma incremental.

---

## 7. Papel da IA (e limites)

### O que a IA faz
- **Copiloto de escrita:** converte intenção em linguagem natural ("faça um programa que calcule a
  média de 4 notas") em **português estruturado válido**.
- **Explicadora:** gera a explicação de um nó em uma linguagem e nível, ancorada no código real
  gerado (não em teoria genérica).
- **Tutora de erro:** traduz erro de compilação/execução em explicação didática em PT-BR.
- **Geradora de exercícios** (pós-MVP): variações do programa para o aluno praticar.

### O que a IA NÃO faz
- Não escreve direto em Python/C/Java/PHP por fora da IR.
- Não "inventa" sintaxe: toda saída passa pelo parser e pelo validador de tipos.
- Não substitui a execução real: o resultado exibido é o do código executado no sandbox.

### Guarda-corpos técnicos
- **Validação obrigatória** da saída do copiloto no parser; se falhar, **loop de reparo** (máx. N
  tentativas) e, por fim, mensagem honesta ao aluno.
- Explicações **versionadas** (`prompt_versao` + hash do contexto) para auditoria e cache.
- Explicações **determinísticas como fallback** (templates por nó/linguagem) se a LLM falhar ou
  estourar orçamento.
- Custo controlado: explicação **sob demanda** (hover/clique), cache agressivo, modelo menor para
  explicações e maior só para o copiloto.

---

## 8. Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Abas divergirem semanticamente | Alto | IR única + testes de equivalência de saída por programa |
| Código gerado "feio"/não idiomático | Médio | Templates revisados por linguagem; revisão de especialista |
| Explicação genérica/errada | Alto | Prompt ancorado no nó + código real; revisão amostral; cache versionado |
| Custo/latência de LLM | Médio | Sob demanda, cache, modelo pequeno, fallback por template |
| Segurança do sandbox | Alto | Isolamento (container sem rede, limites de CPU/memória/tempo) |
| Escopo explodir (5 linguagens + features) | Alto | Subconjunto canônico + 3 linguagens no MVP; resto por roadmap |
| Sobrecarga cognitiva do aluno | Médio | Divulgação progressiva e explicação por elemento, não por programa |
| Diferenças de semântica entre linguagens (overflow, texto, IO) | Médio | Regras de normalização documentadas + casos de teste |
| Dependência de um provedor de LLM | Médio | Camada de abstração de provedor |

---

## 9. Roadmap do MVP

### Fase 0 — Fundação (2–3 semanas)
- Gramática do subconjunto PT-BR (Lark) + AST + spans.
- Análise semântica mínima + mensagens de erro em PT-BR.
- Geradores **Python e C** + mapa de tokens.
- Editor com 2 abas + highlight cruzado.
- Execução via Piston + comparação de saída.

### Fase 1 — O diferencial (3–4 semanas)
- Geradores **Java**, depois **C++ e PHP**.
- Explicador por nó e por linguagem (com níveis) + cache.
- Copiloto NL → PT-BR com validação e loop de reparo.
- Console comparativo de execução.

### Fase 2 — Validação pedagógica (2–3 semanas)
- Contas, projetos salvos, histórico.
- Turma piloto com professor.
- Coleta das métricas da seção 4.3 e iteração.

### Pós-MVP
- Exercícios gerados, correção assistida, integração com LMS, colaboração, mobile, mais linguagens.

---

## 10. Decisões em aberto (para fechar com o Vitório)

1. **Stack final:** Python (Lark/FastAPI) para o compilador ou tudo em TypeScript?
2. **Quais 3 linguagens no MVP:** Python + C + Java (proposta) ou outra combinação?
3. **Produto:** web SaaS, desktop (Electron) ou web + offline? (afeta sandbox e distribuição)
4. **Público inicial:** uma turma real de qual instituição/curso para o piloto?
5. **Modelo de negócio:** gratuito para aluno + plano de instituição? open source?
6. **Nome/branding:** "EducAI" é nome de trabalho — confirmar.
7. **Índice de vetores começa em 0** (como C/Python/Java) ou em 1 (como VisualG)? Recomendação:
   **0**, com explicação explícita do porquê em cada linguagem.
8. **Profundidade do copiloto:** só gera programa completo ou também edita/refatora trechos?

---

## 11. Resumo para alinhamento

- **O que é:** IDE educacional que traduz português estruturado para várias linguagens e explica
  cada elemento em cada uma, simultaneamente.
- **Problema:** aluno aprende uma linguagem só e/ou usa IA sem entender o código.
- **Diferencial:** IR única → abas sempre coerentes; explicação ancorada no nó → aprende o conceito,
  não a sintaxe isolada; código de produção → não precisa reescrever.
- **MVP:** subconjunto canônico de algoritmos, 3 linguagens, execução real, explicação por elemento,
  copiloto NL→PT-BR, piloto com uma turma.
- **Sucesso:** aluno entende e consegue explicar o que a IA escreveu.
