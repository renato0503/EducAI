algoritmo "saudacao"
var
   nome, saudacao: caractere
inicio
   escreval("Qual e o seu nome?")
   leia(nome)
   saudacao <- "Ola, " + nome + "!"
   escreval(saudacao)
   escreval("Seu nome tem ", compr(nome), " caracteres")
   escreval("Progresso: 100%")
   se nome = "fim" entao
      escreval("Ate logo")
   senao
      escreval("Bem-vindo")
   fimse
fimalgoritmo
