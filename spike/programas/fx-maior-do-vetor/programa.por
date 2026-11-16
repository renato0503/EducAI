algoritmo "maior"
var
   v: vetor[0..4] de inteiro
   i, maior: inteiro
inicio
   escreval("Digite 5 numeros:")
   para i de 0 ate 4 faca
      leia(v[i])
   fimpara
   maior <- v[0]
   para i de 1 ate 4 faca
      se v[i] > maior entao
         maior <- v[i]
      fimse
   fimpara
   escreval("Maior: ", maior)
fimalgoritmo
