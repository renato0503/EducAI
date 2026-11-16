# Spike de equivalência (Fase 0, tarefa 0.5)

Objetivo: descobrir, **antes de escrever o compilador**, onde as 5 linguagens do MVP divergem
quando o mesmo programa é escrito seguindo as regras de [`docs/semantica.md`](../docs/semantica.md).

Os arquivos em `programas/` foram escritos **à mão**, exatamente como os geradores deverão
produzi-los. Eles também servem de referência de estilo para os geradores (Sprints 5–7).

## Estrutura

```
spike/
├── Dockerfile            imagem com python3, OpenJDK 17, gcc/g++, php-cli e node
├── run.mjs               executor: compila, roda, compara e gera relatório
├── resultado-docker.md   último relatório completo (5 linguagens, gerado no Docker)
└── programas/
    └── pN-nome/
        ├── meta.json         título, objetivo, divergências esperadas (prefixo da linha + motivo)
        ├── programa.por      o programa em PT-BR estruturado
        ├── main.py  Main.java  main.c  main.cpp  main.php
        ├── entradas/*.txt    stdin (uma linha por leia)
        └── esperado/*.txt    saída definida pela spec (o que o interpretador vai produzir)
```

| Programa | O que testa |
|---|---|
| `p1-texto` | `caractere` em C (char[256], strcpy/strcat, strcmp, fgets), `%` em printf |
| `p2-notas` | `leia` misto com espaços, `para`, divisão real, 2 e 1 casas, Java em locale pt-BR |
| `p3-divisoes` | `/`, `div`, `mod` com negativos, `logico` impresso, arredondamento de real |
| `p4-vetor-funcao` | vetor por referência (PHP `&`), protótipos em C, `passo -1`, `escreva` sem quebra |
| `p5-fatorial` | recursão e overflow de 32 bits |
| `p6-arredondamento` | decisão D1: Java com `BigDecimal` + `HALF_EVEN` contra as outras 4 linguagens |
| `p7-logico-e-se` | `e`/`ou`/`nao`, curto-circuito (`b <> 0 e a div b > 1` com b = 0), `logico` impresso, `se` aninhado |
| `p8-globais` | procedimento e função com global (`global` em Python e PHP, `static` em Java) |
| `p9-para-apos-laco` | valor da variável do `para` depois do laço |
| `p10-texto-acentos` | `José` na entrada, na saída e no `compr()` |
| `p11-divisao-zero-inteira` 📝 | `a div 0` |
| `p12-divisao-zero-real` 📝 | `a / 0` em real e impresso com 2 casas |
| `p13-recursao-profunda` 📝 | recursão com profundidade 400, 1000 e 50000 |
| `p14-entrada-virgula` 📝 | `7,5` digitado num `leia` de real |
| `fx-*` | as 5 fixtures didáticas (geradas por `pnpm fixtures`, não editar aqui; ver `fixtures/README.md`) |

## Como rodar

```bash
# Local (pula o que não estiver instalado; nesta máquina não há gcc/g++)
node spike/run.mjs
node spike/run.mjs --so p3-divisoes --linguagens python,java

# Completo, com os 5 runtimes (precisa do Docker Desktop aberto)
docker build -t educai-runtimes spike
docker run --rm educai-runtimes                       # modo --estrito
docker run --rm educai-runtimes node run.mjs --estrito --markdown > spike/resultado-docker.md
```

No CI, o job `equivalencia` de `.github/workflows/ci.yml` faz o mesmo e publica o relatório no
resumo da execução.

Códigos de saída: `0` = nenhuma divergência inesperada; `1` = alguma falha; `2` = runtime
ausente com `--estrito`.

## Resultado (16/11/2026, Docker)

Runtimes: Python 3.11.2 · javac 17.0.21 · gcc/g++ 12.2.0 · PHP 8.2.35.

**11 combinações programa × entrada × 5 linguagens: todas iguais ao esperado**, fora as linhas
de divergência prevista. Todas as divergências previstas se confirmaram:

| Caso | Python | Java | C | C++ | PHP | Tratamento na spec |
|---|---|---|---|---|---|---|
| `-17 div 5` | **-4** | -3 | -3 | -3 | -3 | pegadinha no interpretador |
| `-17 mod 5` | **3** | -2 | -2 | -2 | -2 | pegadinha no interpretador |
| `0.125` com 2 casas | 0.12 | **0.13** | 0.12 | 0.12 | 0.12 | decisão D1 |
| `2.675` com 2 casas | 2.67 | **2.68** | 2.67 | 2.67 | 2.67 | decisão D1 |
| `13!` (overflow 32 bits) | **6227020800** | 1932053504 | 1932053504 | 1932053504 | **6227020800** | pegadinha no interpretador |

Outros achados:
- Compilação **sem nenhum aviso** com `gcc/g++ -Wall -Wextra -Werror` e `javac -Xlint:all -Werror`.
- `Locale.ROOT` resolve a vírgula do Java em locale pt-BR (a JVM do teste roda em pt-BR).
- `nextLine()` + `parseInt` no Java e `fgets` + `sscanf` no C funcionam para leitura mista.
- PHP 8.2 formata real igual a C e Python (não era o esperado).

### `p6-arredondamento` (16/11/2026) — fecha a decisão D1

Java com `new BigDecimal(x).setScale(n, RoundingMode.HALF_EVEN).toPlainString()`: **igual às
outras 4 linguagens** em `0.125`, `0.375`, `2.675`, `1.005`, `1234.5678`, `-2.675`, `0.0`, `2.5` e
`3.5` com 0 casas, e `0.1 + 0.2` com 3 casas. Única diferença: `-0.001` com 2 casas dá `-0.00` em
C, C++, Python e PHP e `0.00` em Java (zero negativo) → pegadinha no interpretador.

CI no GitHub: os jobs `qualidade` e `equivalencia` passaram na primeira execução (PR #2).

### `p7`–`p14` (16/11/2026)

📝 = modo **documentar** (`"modo": "documentar"` no `meta.json`): o executor não compara com uma
saída esperada; registra o que cada linguagem fez. Serve para as pegadinhas que o interpretador
de referência deve interromper.

- `p7`, `p8`: **iguais nas 5** (lógicos, curto-circuito, globais).
- `p9`: Python termina o `para` com `i = 3`; as outras com `4` → pegadinha confirmada.
- `p10`: com `José`, o Java 17 (sem locale UTF-8) imprime `Jos??`; C, C++ e PHP contam 5
  caracteres → **`caractere` só ASCII no v1** (decisão 012).

| Caso | Python | Java | C / C++ | PHP |
|---|---|---|---|---|
| `a div 0` | `ZeroDivisionError` | `ArithmeticException` | morre com SIGFPE | `DivisionByZeroError` |
| `a / 0` em real | `ZeroDivisionError` | `BigDecimal` falha com `Infinity` | imprime `inf` | `DivisionByZeroError` |
| recursão 1000 | `RecursionError` | ok | ok | ok |
| recursão 50000 | `RecursionError` | `StackOverflowError` | ok | ok |
| `7,5` na entrada | `ValueError` | `NumberFormatException` | **lê 7.00 calado** | **lê 7.00 calado** |
