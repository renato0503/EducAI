algoritmo "logico"
var
   a, b: inteiro
   x, y: logico
inicio
   leia(a)
   leia(b)
   x <- (a > 0) e (b > 0)
   y <- (a > 10) ou nao (b > 10)
   escreval("ambos positivos? ", x)
   escreval("y? ", y)
   se x entao
      se a > b entao
         escreval("a maior")
      senao
         se a = b entao
            escreval("iguais")
         senao
            escreval("b maior")
         fimse
      fimse
   senao
      escreval("algum nao positivo")
   fimse
   se (b <> 0) e (a div b > 1) entao
      escreval("a e mais que o dobro de b")
   fimse
fimalgoritmo
