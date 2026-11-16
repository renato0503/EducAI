⟦prog:cabecalho|cabecalho⟧algoritmo "maior"⟦/⟧
⟦prog:var|secao_var⟧var⟦/⟧
   ⟦var/0|declaracao⟧v: vetor[0..4] de inteiro⟦/⟧
   ⟦var/1|declaracao⟧i, maior: inteiro⟦/⟧
⟦prog:inicio|bloco_principal⟧inicio⟦/⟧
   ⟦main/0|escreva⟧escreval(⟦main/0/0|literal⟧"Digite 5 numeros:"⟦/⟧)⟦/⟧
   ⟦main/1|para⟧para ⟦main/1/var|variavel⟧i⟦/⟧ de ⟦main/1/de|literal⟧0⟦/⟧ ate ⟦main/1/ate|literal⟧4⟦/⟧ faca
      ⟦main/1/corpo/0|leia⟧leia(⟦main/1/corpo/0/alvo|indice⟧v[i]⟦/⟧)⟦/⟧
   fimpara⟦/⟧
   ⟦main/2|atribuicao⟧⟦main/2/alvo|variavel⟧maior⟦/⟧ <- ⟦main/2/valor|indice⟧v[0]⟦/⟧⟦/⟧
   ⟦main/3|para⟧para ⟦main/3/var|variavel⟧i⟦/⟧ de ⟦main/3/de|literal⟧1⟦/⟧ ate ⟦main/3/ate|literal⟧4⟦/⟧ faca
      ⟦main/3/corpo/0|se⟧se ⟦main/3/corpo/0/cond|operacao⟧v[i] > maior⟦/⟧ entao
         ⟦main/3/corpo/0/entao/0|atribuicao⟧maior <- v[i]⟦/⟧
      fimse⟦/⟧
   fimpara⟦/⟧
   ⟦main/4|escreva⟧escreval(⟦main/4/0|literal⟧"Maior: "⟦/⟧, ⟦main/4/1|variavel⟧maior⟦/⟧)⟦/⟧
⟦prog:inicio⟧fimalgoritmo⟦/⟧
