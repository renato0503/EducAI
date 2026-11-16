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

### Divergências esperadas (ignoradas na comparação)

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

RESULTADO: OK — nenhuma divergência inesperada.
