algoritmo "divisoes"
var
   a, b: inteiro
   x: real
   par: logico
inicio
   leia(a)
   leia(b)
   escreval(a, " / ", b, " = ", a / b)
   escreval(a, " div ", b, " = ", a div b)
   escreval(a, " mod ", b, " = ", a mod b)
   par <- a mod 2 = 0
   escreval("a e par? ", par)
   x <- 0.125
   escreval("0.125 com 2 casas: ", x)
   x <- 2.675
   escreval("2.675 com 2 casas: ", x)
   x <- 0.1 + 0.2
   escreval("0.1 + 0.2 = ", x)
fimalgoritmo
