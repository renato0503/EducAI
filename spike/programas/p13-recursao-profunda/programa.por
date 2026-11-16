algoritmo "recursao"
var
   n: inteiro

funcao soma(k: inteiro): inteiro
inicio
   se k = 0 entao
      retorne 0
   senao
      retorne k + soma(k - 1)
   fimse
fimfuncao

inicio
   leia(n)
   escreval("soma: ", soma(n))
fimalgoritmo
