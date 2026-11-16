# Semântica do PT-BR estruturado — v1 (rascunho para o gate G0)

> Este documento define **o que cada construção significa** e **como cada gerador a escreve**.
> É o contrato que permite prometer: *"todo programa que o interpretador de referência executa
> até o fim produz saída idêntica em Python, Java, C, C++ e PHP"*.
>
> Status: rascunho. Cada regra marcada com **[validar no spike]** precisa ser confirmada rodando o
> código gerado nos runtimes reais na Fase 0 (sprint.md §4, tarefa 0.5).

---

## 1. Princípio: o interpretador é mais estrito que todas as linguagens

Quando as linguagens-alvo discordam, há três saídas possíveis. Usamos sempre a primeira que couber:

1. **Gerar código que concorda** em todas (ex.: inicializar toda variável).
2. **Restringir o subconjunto** para que o caso não exista (ex.: o passo do `para` é sempre literal).
3. **Interromper no interpretador** com um erro de execução educativo — a "pegadinha" — que explica
   como cada linguagem se comportaria (ex.: overflow, divisão inteira de negativos).

Consequência: o código gerado continua **idiomático** (sem checagens artificiais) e a equivalência
vale para todo programa que roda até o fim no interpretador.

---

## 2. Tipos

| PT-BR | Python | Java | C | C++ | PHP | Regra |
|---|---|---|---|---|---|---|
| `inteiro` | `int` | `int` | `int` | `int` | `int` | Faixa **−2³¹ … 2³¹−1**. Resultado fora da faixa → pegadinha "overflow" (Python não estoura, Java dá a volta, C/C++ é comportamento indefinido, PHP vira float). |
| `real` | `float` | `double` | `double` | `double` | `float` | IEEE 754 de 64 bits em todas. |
| `caractere` | `str` | `String` | `char[256]` | `std::string` | `string` | Máx. **255** caracteres; ultrapassar → pegadinha (C precisa de tamanho fixo). **Só ASCII imprimível no v1** (confirmado no spike `p10`, decisão 012): com `José`, o Java 17 sem locale UTF-8 imprime `Jos??`, e C, C++ e PHP contam 5 caracteres (bytes). Texto com acento em literal ou na entrada → pegadinha. |
| `logico` | `bool` | `boolean` | `bool` (`<stdbool.h>`) | `bool` | `bool` | Impresso como `verdadeiro` / `falso` em todas. |

**Inicialização:** toda variável declarada é inicializada explicitamente com `0`, `0.0`, `""` ou
`falso` em todas as linguagens (resolve o lixo de memória em C e a regra de atribuição definida
do Java).

**Conversões:** `inteiro → real` implícita; `real → inteiro` só com `int(x)` (trunca), gerado como
`int(x)` / `(int) x` / `(int) x` / `static_cast<int>(x)` / `(int) $x`.

---

## 3. Operadores

| PT-BR | Semântica | Python | Java / C / C++ | PHP |
|---|---|---|---|---|
| `a / b` | divisão **real** sempre | `a / b` | `(double) a / b` se ambos inteiros | `a / b` |
| `a div b` | divisão inteira | `a // b` | `a / b` | `intdiv(a, b)` |
| `a mod b` | resto | `a % b` | `a % b` | `a % b` |
| `+` em `caractere` | concatenação | `a + b` | Java `a + b`; C `strcpy` + `strcat` (ver nota); C++ `a + b` | `a . b` |
| `=` / `<>` em `caractere` | igualdade | `==` / `!=` | Java `a.equals(b)`; C `strcmp(a,b) == 0`; C++ `==` | `===` / `!==` |
| `e` / `ou` / `nao` | lógicos com curto-circuito | `and` / `or` / `not` | `&&` / `\|\|` / `!` | `&&` / `\|\|` / `!` |

Nota sobre concatenação em C: o spike usa `strcpy(dest, a); strcat(dest, b);`, que compila sem
aviso com `-Wall -Wextra -Werror` (gcc 12). `snprintf` foi evitado porque o gcc tende a emitir
`-Wformat-truncation` quando o tamanho máximo do `%s` é conhecido (hipótese não testada). O
interpretador garante que o resultado cabe em 255 caracteres.

Pegadinhas interrompidas pelo interpretador (todas confirmadas no spike):
- `div` ou `mod` com **operando negativo** (Python arredonda para baixo; as demais truncam).
- Divisão por zero. Confirmado no spike (`p11`, `p12`): **inteira** — Python, Java e PHP lançam
  erro, C/C++ morrem com o sinal SIGFPE; **real** — Python e PHP 8 lançam erro, C/C++ imprimem
  `inf`, Java dá `Infinity` e o `BigDecimal` lança `NumberFormatException` ao formatar.
- Real negativo que arredonda para zero na impressão (`-0.00` × `0.00`, ver §4).
- Resultado inteiro fora da faixa de 32 bits.

---

## 4. Saída (`escreva`, `escreval`)

- `escreva(a, b, …)` concatena os valores sem separador; `escreval` acrescenta `\n`.
- `inteiro` → decimal sem formatação. `logico` → `verdadeiro`/`falso`.
- `real` **sem formato** → 2 casas decimais, ponto como separador. Com formato `x:0:n` → `n` casas.

| | Python | Java | C | C++ | PHP |
|---|---|---|---|---|---|
| real, 2 casas | `f"{x:.2f}"` | `new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString()` | `printf("%.2f", x)` | `std::fixed << std::setprecision(2) << x` | `printf("%.2F", $x)` |

Observações:
- **Java:** sem `Locale.ROOT`, uma JVM com locale pt-BR imprime `3,50`. O `import java.util.Locale`
  é um nó sintético com explicação. Confirmado no spike: com `Locale.ROOT`, a JVM rodando em
  pt-BR imprime ponto.
- **PHP:** `%F` (maiúsculo) não depende de locale; `%f` depende.

**Resultado do spike (16/11/2026) — arredondamento de real:**

| Valor | Python 3.11 | Java 17 `String.format` | C (gcc 12) | C++ (g++ 12) | PHP 8.2 |
|---|---|---|---|---|---|
| `0.125` com 2 casas (empate exato em binário) | 0.12 | **0.13** | 0.12 | 0.12 | 0.12 |
| `2.675` com 2 casas (binário = 2.67499999…) | 2.67 | **2.68** | 2.67 | 2.67 | 2.67 |

Quatro linguagens arredondam o **valor binário exato** com empate para o par. O `Formatter` do Java
arredonda a partir da **representação decimal curta** com HALF_UP, então diverge também fora dos
empates, em valores comuns como preços (`2.675`, `1.005`…). Isso é mais grave do que o previsto.

**Decisão D1 (fechada em 16/11/2026, decisão 011):** Java gera
`new BigDecimal(x).setScale(n, RoundingMode.HALF_EVEN).toPlainString()` (imports
`java.math.BigDecimal` e `java.math.RoundingMode`, nós sintéticos com cartão "por que o Java
precisa disso"). `new BigDecimal(double)` usa o valor binário exato, e HALF_EVEN reproduz as outras
4 linguagens. Como o `BigDecimal` não depende de locale, o `Locale.ROOT` deixa de ser necessário
para formatar real.

Validado no spike `p6-arredondamento` nas 5 linguagens: `0.125`, `0.375`, `2.675`, `1.005`,
`1234.5678`, `-2.675`, `0.0`, `2.5` e `3.5` com 0 casas, `0.1 + 0.2` com 3 casas — **todos iguais**.

**Exceção — zero negativo:** um real negativo que arredonda para zero (ex.: `-0.001` com 2 casas)
imprime `-0.00` em C, C++, Python e PHP e `0.00` em Java (o `BigDecimal` não tem zero negativo).
→ **Pegadinha no interpretador**: "este valor negativo vira zero ao arredondar; algumas linguagens
mostram `-0.00`, o Java mostra `0.00`".

O interpretador de referência usa a regra das 4 linguagens: valor binário exato, empate para o par.
- Literais de texto passam por **escape por linguagem** (`"`, `\`, e `%` → `%%` em formatos de
  `printf`). Nunca interpolar texto do aluno como string de formato.

---

## 5. Entrada (`leia`)

Regra única: **cada `leia(x)` consome uma linha inteira** da entrada. Para `inteiro` e `real`,
espaços nas pontas são ignorados (confirmado no spike com a entrada `" 4 "`). Para `caractere`,
só o fim de linha é removido; os espaços fazem parte do texto.

| Tipo | Python | Java (`Scanner sc`) | C | C++ | PHP |
|---|---|---|---|---|---|
| inteiro | `int(input())` | `Integer.parseInt(sc.nextLine().trim())` | `fgets` + `sscanf(linha, "%d", &x)` | `getline` + `std::stoi` | `(int) trim(fgets(STDIN))` |
| real | `float(input())` | `Double.parseDouble(…)` | `fgets` + `sscanf(…, "%lf", &x)` | `getline` + `std::stod` | `(float) trim(fgets(STDIN))` |
| caractere | `input()` | `sc.nextLine()` | `fgets` + remover `\n` | `std::getline(std::cin, x)` | `rtrim(fgets(STDIN), "\n")` |

- Sempre `nextLine()` no Java: evita a armadilha clássica `nextInt()` + `nextLine()`.
- Número real com **vírgula** (`7,5`) → o interpretador rejeita com mensagem educativa
  ("as linguagens de programação usam ponto"). Confirmado no spike (`p14`): Python e Java lançam
  erro, e **C, C++ e PHP leem `7.00` sem avisar** — o caso mais perigoso para o aluno.
  `leia` de `logico` não existe no v1.
- No navegador, o console do interpretador é **interativo** (o programa pede e espera).
- No CI, a entrada vem de arquivo (`stdin`), uma linha por `leia`.

---

## 6. Controle de fluxo

- `se/senao`, `enquanto`: mapeamento direto.
- `para i de a ate b [passo k] faca`:
  - `k` é **literal inteiro não nulo** (padrão 1); `ate` é **inclusivo**.
  - Python: `for i in range(a, b + 1)` (ou `range(a, b - 1, k)` com passo negativo).
  - Java/C/C++/PHP: `for (i = a; i <= b; i += k)` (ou `>=` com passo negativo).
  - **Proibido** atribuir à variável de controle dentro do laço (erro semântico: o `range` do
    Python ignoraria a atribuição).
  - **Ler a variável de controle depois do laço** é pegadinha no interpretador (Python termina com
    `b`, as demais com `b + k`). Confirmado no spike (`p9`): `para i de 1 ate 3` deixa `i = 3`
    em Python e `i = 4` nas outras.

---

## 7. Funções, procedimentos e escopo

- Parâmetros escalares **por valor**; vetores **por referência**.
  - PHP copia arrays por padrão → o gerador sempre usa `array &$v`.
  - C/C++ recebem `int v[N]` com o tamanho constante declarado.
- Funções não retornam vetor no v1.
- **Variáveis globais** (declaradas no `var` do algoritmo) podem ser usadas em funções:
  - Python: `global x` quando a função atribui; PHP: `global $x;` sempre que usa;
    Java: campos `static`; C/C++: variáveis globais. Confirmado no spike (`p8`): iguais nas 5.
- Recursão permitida; profundidade > **500** → pegadinha. Confirmado no spike (`p13`): com
  profundidade 1000 o Python já quebra (`RecursionError`); com 50000 o Java também
  (`StackOverflowError`); C, C++ e PHP aguentam. Com 400, as 5 dão o mesmo resultado.
- C: o gerador emite **protótipos** antes do `main` (mapeados como 2º range do nó `funcao`).
- Java: tudo dentro de `public class Main` com métodos `static` (nó sintético).

---

## 8. Vetores

- Declaração `v: vetor[0..N-1] de tipo`, com `N` constante.
- Python `[0] * N`; Java `new int[N]`; C/C++ `int v[N] = {0}`; PHP `array_fill(0, N, 0)`.
- Índice fora de `0..N-1` → pegadinha (C não verifica e corrompe memória; as demais lançam erro).
- Limite inferior diferente de 0 → erro educativo (decisão pendente com professores; ver
  context.md §10).

---

## 9. Identificadores

- **Palavras-chave** não diferenciam maiúsculas nem acentos: `Entao`, `então` e `ENTAO` são iguais,
  como no VisualG (implementado no lexer).
- **Nomes** (variáveis, funções) diferenciam maiúsculas no parser. **Pendente (D9):** o VisualG não
  diferencia; decidir se o EducAI acusa `Media` e `media` como o mesmo nome (recomendado: a
  semântica avisa "use sempre a mesma grafia", porque C, Java, Python e PHP diferenciam).
- Letras, dígitos e `_`; acentos permitidos em PT-BR e **transliterados** nas linguagens-alvo
  (`média` → `media`), com erro se a transliteração colidir com outro nome.
- Nomes reservados em **qualquer** linguagem-alvo (atual ou da v1.1) são rejeitados com sugestão:
  `print`, `int`, `class`, `max`, `len`, `list`, `str`, `new`, `echo`, `function`, `var`, `func`,
  `string`, `main`… (lista completa gerada a partir das palavras reservadas oficiais de cada
  linguagem + nomes de biblioteca usados pelos geradores).
- PHP: variáveis ganham `$`; funções não.

---

## 10. Comentários

`// texto` vira nó `comentario` e é replicado: `#` em Python, `//` nas demais.

---

## 11. Garantias testadas no CI

1. **Diferencial:** para cada programa do corpus e do fuzzer, com cada arquivo de entrada:
   saída do interpretador == saída de `python3` == `java` == `gcc` == `g++` == `php`
   (byte a byte, após normalizar `\r\n` → `\n`).
2. **Compilação limpa:** `gcc -Wall -Wextra -Werror`, `g++` idem, `javac -Xlint`, `php -l`,
   `python -m py_compile` — sem avisos.
3. **Pegadinhas:** para cada regra das §2–8 existe um programa que a dispara, e o teste confirma
   que o interpretador interrompe com a mensagem certa.
4. **Cobertura do mapa:** todo caractere não-branco do código gerado pertence a algum nó (real ou
   sintético), e todo nó sintético tem cartão no catálogo.
5. **Versões fixadas** dos runtimes na imagem Docker (registradas em `docs/execucao-ci.md`).

---

## 12. Notas para a v1.1 (8 linguagens)

- **JavaScript:** `div` → `Math.trunc(a / b)` (exato na faixa de 32 bits); leitura de linha exige
  Node (`readline`) — no navegador usa o console do interpretador.
- **C#:** `Console.ReadLine()`, `int.Parse`, `ToString("F2", CultureInfo.InvariantCulture)`.
- **Go:** variável ou import sem uso é **erro de compilação** → a semântica passa a avisar
  variável não usada e o gerador só importa o necessário; `while` vira `for cond {}`.
