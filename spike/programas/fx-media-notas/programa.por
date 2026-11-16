algoritmo "media"
var
   n1, n2, n3, n4, media: real
inicio
   escreval("Digite as 4 notas:")
   leia(n1)
   leia(n2)
   leia(n3)
   leia(n4)
   media <- (n1 + n2 + n3 + n4) / 4
   escreval("Media: ", media)
   se media >= 7 entao
      escreval("Aprovado")
   senao
      escreval("Reprovado")
   fimse
fimalgoritmo
