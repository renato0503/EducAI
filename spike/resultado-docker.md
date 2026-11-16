## Spike de equivalência (0.5)

### Runtimes

- Python: Python 3.11.2
- Java: javac 17.0.21
- C: gcc (Debian 12.2.0-14+deb12u1) 12.2.0
- C++: g++ (Debian 12.2.0-14+deb12u1) 12.2.0
- PHP: PHP 8.2.35 (cli) (built: Oct 21 2026 06:29:51) (NTS)

### Resultado por programa e entrada

| Programa/entrada | Python | Java | C | C++ | PHP |
|---|---|---|---|---|---|
| fx-contagem-regressiva/cinco.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-contagem-regressiva/zero.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-fatorial-funcao/cinco.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-fatorial-funcao/dez.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-fatorial-funcao/um.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-maior-do-vetor/negativos.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-maior-do-vetor/positivos.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-media-notas/aprovado.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-media-notas/reprovado.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-tabuada/doze.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| fx-tabuada/sete.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p1-texto/fim.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p1-texto/nome-composto.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p10-texto-acentos/jose.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p11-divisao-zero-inteira/controle.txt | 📝 ok | 📝 ok | 📝 ok | 📝 ok | 📝 ok |
| p11-divisao-zero-inteira/por-zero.txt | 📝 falhou | 📝 falhou | 📝 falhou | 📝 falhou | 📝 falhou |
| p12-divisao-zero-real/controle.txt | 📝 ok | 📝 ok | 📝 ok | 📝 ok | 📝 ok |
| p12-divisao-zero-real/por-zero.txt | 📝 falhou | 📝 falhou | 📝 ok | 📝 ok | 📝 falhou |
| p13-recursao-profunda/profundidade-1000.txt | 📝 falhou | 📝 ok | 📝 ok | 📝 ok | 📝 ok |
| p13-recursao-profunda/profundidade-400.txt | 📝 ok | 📝 ok | 📝 ok | 📝 ok | 📝 ok |
| p13-recursao-profunda/profundidade-50000.txt | 📝 falhou | 📝 falhou | 📝 ok | 📝 ok | 📝 ok |
| p14-entrada-virgula/ponto.txt | 📝 ok | 📝 ok | 📝 ok | 📝 ok | 📝 ok |
| p14-entrada-virgula/virgula.txt | 📝 falhou | 📝 falhou | 📝 ok | 📝 ok | 📝 ok |
| p2-notas/quatro-notas.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p2-notas/tres-notas.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p3-divisoes/negativo.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p3-divisoes/par.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p3-divisoes/positivos.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p4-vetor-funcao/com-negativos.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p4-vetor-funcao/positivos.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p5-fatorial/ate-12.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p5-fatorial/ate-13.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p6-arredondamento/literais.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p7-logico-e-se/a-maior.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p7-logico-e-se/b-maior.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p7-logico-e-se/b-zero.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p7-logico-e-se/iguais.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p8-globais/sem-entrada.txt | ✅ | ✅ | ✅ | ✅ | ✅ |
| p9-para-apos-laco/sem-entrada.txt | ✅ | ✅ | ✅ | ✅ | ✅ |

### Divergências esperadas (ignoradas na comparação)

- **p10-texto-acentos/jose.txt** — `Ola, ` → DIVERGIU (confirmada)
  - motivo: Java 17 num ambiente sem locale UTF-8 lê e escreve os bytes de 'é' como '??'; as outras repassam os bytes intactos
  - spec/esperado: `Ola, José!`
  - Python: `Ola, José!`
  - Java: `Ola, Jos??!`
  - C: `Ola, José!`
  - C++: `Ola, José!`
  - PHP: `Ola, José!`
- **p10-texto-acentos/jose.txt** — `tamanho:` → DIVERGIU (confirmada)
  - motivo: Python conta caracteres (4); C, C++ e PHP contam bytes UTF-8 (5); Java conta os 2 '?' (5)
  - spec/esperado: `tamanho: 4`
  - Python: `tamanho: 4`
  - Java: `tamanho: 5`
  - C: `tamanho: 5`
  - C++: `tamanho: 5`
  - PHP: `tamanho: 5`
- **p3-divisoes/negativo.txt** — `-17 div 5` → DIVERGIU (confirmada)
  - motivo: Python: -17 // 5 = -4; C/C++/Java/PHP truncam: -3
  - spec/esperado: `-17 div 5 = -3`
  - Python: `-17 div 5 = -4`
  - Java: `-17 div 5 = -3`
  - C: `-17 div 5 = -3`
  - C++: `-17 div 5 = -3`
  - PHP: `-17 div 5 = -3`
- **p3-divisoes/negativo.txt** — `-17 mod 5` → DIVERGIU (confirmada)
  - motivo: Python: -17 % 5 = 3; C/C++/Java/PHP: -2
  - spec/esperado: `-17 mod 5 = -2`
  - Python: `-17 mod 5 = 3`
  - Java: `-17 mod 5 = -2`
  - C: `-17 mod 5 = -2`
  - C++: `-17 mod 5 = -2`
  - PHP: `-17 mod 5 = -2`
- **p3-divisoes/negativo.txt** — `0.125 com 2 casas` → DIVERGIU (confirmada)
  - motivo: Empate exato: C/C++/Python arredondam para o par (0.12); suspeita de 0.13 em Java (HALF_UP) e possivelmente PHP
  - spec/esperado: `0.125 com 2 casas: 0.12`
  - Python: `0.125 com 2 casas: 0.12`
  - Java: `0.125 com 2 casas: 0.13`
  - C: `0.125 com 2 casas: 0.12`
  - C++: `0.125 com 2 casas: 0.12`
  - PHP: `0.125 com 2 casas: 0.12`
- **p3-divisoes/negativo.txt** — `2.675 com 2 casas` → DIVERGIU (confirmada)
  - motivo: 2.675 é 2.67499999... em binário; suspeita de que Java/PHP partam da representação decimal curta e deem 2.68
  - spec/esperado: `2.675 com 2 casas: 2.67`
  - Python: `2.675 com 2 casas: 2.67`
  - Java: `2.675 com 2 casas: 2.68`
  - C: `2.675 com 2 casas: 2.67`
  - C++: `2.675 com 2 casas: 2.67`
  - PHP: `2.675 com 2 casas: 2.67`
- **p3-divisoes/par.txt** — `0.125 com 2 casas` → DIVERGIU (confirmada)
  - motivo: Empate exato: C/C++/Python arredondam para o par (0.12); suspeita de 0.13 em Java (HALF_UP) e possivelmente PHP
  - spec/esperado: `0.125 com 2 casas: 0.12`
  - Python: `0.125 com 2 casas: 0.12`
  - Java: `0.125 com 2 casas: 0.13`
  - C: `0.125 com 2 casas: 0.12`
  - C++: `0.125 com 2 casas: 0.12`
  - PHP: `0.125 com 2 casas: 0.12`
- **p3-divisoes/par.txt** — `2.675 com 2 casas` → DIVERGIU (confirmada)
  - motivo: 2.675 é 2.67499999... em binário; suspeita de que Java/PHP partam da representação decimal curta e deem 2.68
  - spec/esperado: `2.675 com 2 casas: 2.67`
  - Python: `2.675 com 2 casas: 2.67`
  - Java: `2.675 com 2 casas: 2.68`
  - C: `2.675 com 2 casas: 2.67`
  - C++: `2.675 com 2 casas: 2.67`
  - PHP: `2.675 com 2 casas: 2.67`
- **p3-divisoes/positivos.txt** — `0.125 com 2 casas` → DIVERGIU (confirmada)
  - motivo: Empate exato: C/C++/Python arredondam para o par (0.12); suspeita de 0.13 em Java (HALF_UP) e possivelmente PHP
  - spec/esperado: `0.125 com 2 casas: 0.12`
  - Python: `0.125 com 2 casas: 0.12`
  - Java: `0.125 com 2 casas: 0.13`
  - C: `0.125 com 2 casas: 0.12`
  - C++: `0.125 com 2 casas: 0.12`
  - PHP: `0.125 com 2 casas: 0.12`
- **p3-divisoes/positivos.txt** — `2.675 com 2 casas` → DIVERGIU (confirmada)
  - motivo: 2.675 é 2.67499999... em binário; suspeita de que Java/PHP partam da representação decimal curta e deem 2.68
  - spec/esperado: `2.675 com 2 casas: 2.67`
  - Python: `2.675 com 2 casas: 2.67`
  - Java: `2.675 com 2 casas: 2.68`
  - C: `2.675 com 2 casas: 2.67`
  - C++: `2.675 com 2 casas: 2.67`
  - PHP: `2.675 com 2 casas: 2.67`
- **p5-fatorial/ate-13.txt** — `13! = ` → DIVERGIU (confirmada)
  - motivo: Overflow: Python e PHP (inteiro de 64 bits) dão 6227020800; Java dá a volta (1932053504); em C/C++ é comportamento indefinido
  - spec/esperado: `13! = 6227020800`
  - Python: `13! = 6227020800`
  - Java: `13! = 1932053504`
  - C: `13! = 1932053504`
  - C++: `13! = 1932053504`
  - PHP: `13! = 6227020800`
- **p6-arredondamento/literais.txt** — `-0.001 ->` → DIVERGIU (confirmada)
  - motivo: Zero negativo: C/Python imprimem -0.00; BigDecimal não tem zero negativo (provável 0.00)
  - spec/esperado: `-0.001 -> -0.00`
  - Python: `-0.001 -> -0.00`
  - Java: `-0.001 -> 0.00`
  - C: `-0.001 -> -0.00`
  - C++: `-0.001 -> -0.00`
  - PHP: `-0.001 -> -0.00`
- **p9-para-apos-laco/sem-entrada.txt** — `i depois do laco:` → DIVERGIU (confirmada)
  - motivo: Python: o for termina com i = 3; Java/C/C++/PHP: o laço para quando i = 4
  - spec/esperado: `i depois do laco: 4`
  - Python: `i depois do laco: 3`
  - Java: `i depois do laco: 4`
  - C: `i depois do laco: 4`
  - C++: `i depois do laco: 4`
  - PHP: `i depois do laco: 4`

### Comportamentos documentados (📝, sem comparação)

- **p11-divisao-zero-inteira/controle.txt**
  - Python: ok — saída: `inteira: 3`
  - Java: ok — saída: `inteira: 3`
  - C: ok — saída: `inteira: 3`
  - C++: ok — saída: `inteira: 3`
  - PHP: ok — saída: `inteira: 3`
- **p11-divisao-zero-inteira/por-zero.txt**
  - Python: falhou (1) — erro: `ZeroDivisionError: integer division or modulo by zero`
  - Java: falhou (1) — erro: `Exception in thread "main" java.lang.ArithmeticException: / by zero`
  - C: falhou (sinal SIGFPE)
  - C++: falhou (sinal SIGFPE)
  - PHP: falhou (255) — erro: `PHP Fatal error:  Uncaught DivisionByZeroError: Division by zero in /tmp/educai-p11-divisao-zero-inteira-php-NaDafn/main`
- **p12-divisao-zero-real/controle.txt**
  - Python: ok — saída: `real: 3.50`
  - Java: ok — saída: `real: 3.50`
  - C: ok — saída: `real: 3.50`
  - C++: ok — saída: `real: 3.50`
  - PHP: ok — saída: `real: 3.50`
- **p12-divisao-zero-real/por-zero.txt**
  - Python: falhou (1) — erro: `ZeroDivisionError: division by zero`
  - Java: falhou (1) — erro: `Exception in thread "main" java.lang.NumberFormatException: Infinite or NaN`
  - C: ok — saída: `real: inf`
  - C++: ok — saída: `real: inf`
  - PHP: falhou (255) — erro: `PHP Fatal error:  Uncaught DivisionByZeroError: Division by zero in /tmp/educai-p12-divisao-zero-real-php-a0fFYR/main.ph`
- **p13-recursao-profunda/profundidade-1000.txt**
  - Python: falhou (1) — erro: `RecursionError: maximum recursion depth exceeded`
  - Java: ok — saída: `soma: 500500`
  - C: ok — saída: `soma: 500500`
  - C++: ok — saída: `soma: 500500`
  - PHP: ok — saída: `soma: 500500`
- **p13-recursao-profunda/profundidade-400.txt**
  - Python: ok — saída: `soma: 80200`
  - Java: ok — saída: `soma: 80200`
  - C: ok — saída: `soma: 80200`
  - C++: ok — saída: `soma: 80200`
  - PHP: ok — saída: `soma: 80200`
- **p13-recursao-profunda/profundidade-50000.txt**
  - Python: falhou (1) — erro: `RecursionError: maximum recursion depth exceeded`
  - Java: falhou (1) — erro: `Exception in thread "main" java.lang.StackOverflowError`
  - C: ok — saída: `soma: 1250025000`
  - C++: ok — saída: `soma: 1250025000`
  - PHP: ok — saída: `soma: 1250025000`
- **p14-entrada-virgula/ponto.txt**
  - Python: ok — saída: `x: 7.50`
  - Java: ok — saída: `x: 7.50`
  - C: ok — saída: `x: 7.50`
  - C++: ok — saída: `x: 7.50`
  - PHP: ok — saída: `x: 7.50`
- **p14-entrada-virgula/virgula.txt**
  - Python: falhou (1) — erro: `ValueError: could not convert string to float: '7,5'`
  - Java: falhou (1) — erro: `Exception in thread "main" java.lang.NumberFormatException: For input string: "7,5"`
  - C: ok — saída: `x: 7.00`
  - C++: ok — saída: `x: 7.00`
  - PHP: ok — saída: `x: 7.00`

RESULTADO: OK — nenhuma divergência inesperada.
