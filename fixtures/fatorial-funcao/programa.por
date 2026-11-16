⟦prog:cabecalho|cabecalho⟧algoritmo "fatorial"⟦/⟧
⟦prog:var|secao_var⟧var⟦/⟧
   ⟦var/0|declaracao⟧n: inteiro⟦/⟧

⟦f0|funcao⟧⟦f0:assinatura|assinatura⟧funcao fatorial(⟦f0/param/0|parametro⟧k: inteiro⟦/⟧): inteiro⟦/⟧
⟦f0:var|secao_var⟧var⟦/⟧
   ⟦f0/var/0|declaracao⟧i, resultado: inteiro⟦/⟧
⟦f0:inicio|bloco_funcao⟧inicio⟦/⟧
   ⟦f0/0|atribuicao⟧resultado <- 1⟦/⟧
   ⟦f0/1|para⟧para ⟦f0/1/var|variavel⟧i⟦/⟧ de ⟦f0/1/de|literal⟧2⟦/⟧ ate ⟦f0/1/ate|variavel⟧k⟦/⟧ faca
      ⟦f0/1/corpo/0|atribuicao⟧resultado <- ⟦f0/1/corpo/0/valor|operacao⟧resultado * i⟦/⟧⟦/⟧
   fimpara⟦/⟧
   ⟦f0/2|retorno⟧retorne resultado⟦/⟧
fimfuncao⟦/⟧

⟦prog:inicio|bloco_principal⟧inicio⟦/⟧
   ⟦main/0|escreva⟧escreval(⟦main/0/0|literal⟧"Calcular o fatorial de:"⟦/⟧)⟦/⟧
   ⟦main/1|leia⟧leia(⟦main/1/alvo|variavel⟧n⟦/⟧)⟦/⟧
   ⟦main/2|escreva⟧escreval(⟦main/2/0|variavel⟧n⟦/⟧, "! = ", ⟦main/2/2|chamada⟧fatorial(n)⟦/⟧)⟦/⟧
⟦prog:inicio⟧fimalgoritmo⟦/⟧
