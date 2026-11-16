algoritmo "media_notas"
var
   n, i: inteiro
   nota, soma, media: real
inicio
   escreval("Quantas notas?")
   leia(n)
   soma <- 0
   para i de 1 ate n faca
      escreval("Nota ", i, ":")
      leia(nota)
      soma <- soma + nota
   fimpara
   media <- soma / n
   escreval("Media: ", media)
   escreval("Media com 1 casa: ", media:0:1)
   se media >= 7 entao
      escreval("Aprovado")
   senao
      escreval("Reprovado")
   fimse
fimalgoritmo
