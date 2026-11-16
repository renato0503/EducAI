algoritmo "vetores"
var
   v: vetor[0..4] de inteiro
   i: inteiro

procedimento dobrar(w: vetor[0..4] de inteiro)
var
   j: inteiro
inicio
   para j de 0 ate 4 faca
      w[j] <- w[j] * 2
   fimpara
fimprocedimento

funcao soma(w: vetor[0..4] de inteiro): inteiro
var
   j, total: inteiro
inicio
   total <- 0
   para j de 0 ate 4 faca
      total <- total + w[j]
   fimpara
   retorne total
fimfuncao

inicio
   para i de 0 ate 4 faca
      leia(v[i])
   fimpara
   dobrar(v)
   para i de 4 ate 0 passo -1 faca
      escreva(v[i], " ")
   fimpara
   escreval()
   escreval("Soma: ", soma(v))
fimalgoritmo
