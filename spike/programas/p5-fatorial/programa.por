algoritmo "fatorial"
var
   n, i: inteiro

funcao fat(k: inteiro): inteiro
inicio
   se k <= 1 entao
      retorne 1
   senao
      retorne k * fat(k - 1)
   fimse
fimfuncao

inicio
   leia(n)
   para i de 1 ate n faca
      escreval(i, "! = ", fat(i))
   fimpara
fimalgoritmo
