algoritmo "fatorial"
var
   n: inteiro

funcao fatorial(k: inteiro): inteiro
var
   i, resultado: inteiro
inicio
   resultado <- 1
   para i de 2 ate k faca
      resultado <- resultado * i
   fimpara
   retorne resultado
fimfuncao

inicio
   escreval("Calcular o fatorial de:")
   leia(n)
   escreval(n, "! = ", fatorial(n))
fimalgoritmo
