algoritmo "arredondamento"
var
   x: real
inicio
   x <- 0.125
   escreval("0.125 -> ", x)
   x <- 0.375
   escreval("0.375 -> ", x)
   x <- 2.675
   escreval("2.675 -> ", x)
   x <- 1.005
   escreval("1.005 -> ", x)
   x <- 1234.5678
   escreval("1234.5678 -> ", x)
   x <- -2.675
   escreval("-2.675 -> ", x)
   x <- 0.0
   escreval("0.0 -> ", x)
   x <- -0.001
   escreval("-0.001 -> ", x)
   x <- 2.5
   escreval("2.5 com 0 casas -> ", x:0:0)
   x <- 3.5
   escreval("3.5 com 0 casas -> ", x:0:0)
   x <- 0.1 + 0.2
   escreval("0.1 + 0.2 com 3 casas -> ", x:0:3)
fimalgoritmo
