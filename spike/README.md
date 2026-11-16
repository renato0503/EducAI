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

## Próximos casos a adicionar (ver docs/PROGRESSO.md §6.2)

`p6-arredondamento` (testar a opção A da D1), `p7-logico-e-se`, `p8-globais` (`global` em Python e
PHP), `p9-para-variavel-apos-laco`, `p10-texto-acentos` (UTF-8), `p11-divisao-por-zero`,
`p12-recursao-profunda`, `p13-entrada-com-virgula`.
