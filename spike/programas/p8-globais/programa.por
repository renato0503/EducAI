algoritmo "globais"
var
   total, i: inteiro

procedimento somar(valor: inteiro)
inicio
   total <- total + valor
fimprocedimento

funcao dobroDoTotal(): inteiro
inicio
   retorne total * 2
fimfuncao

inicio
   total <- 0
   para i de 1 ate 4 faca
      somar(i * 10)
   fimpara
   escreval("total: ", total)
   escreval("dobro: ", dobroDoTotal())
fimalgoritmo
