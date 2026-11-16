⟦prog:cabecalho|cabecalho⟧algoritmo "contagem"⟦/⟧
⟦prog:var|secao_var⟧var⟦/⟧
   ⟦var/0|declaracao⟧n: inteiro⟦/⟧
⟦prog:inicio|bloco_principal⟧inicio⟦/⟧
   ⟦main/0|escreva⟧escreval(⟦main/0/0|literal⟧"Contar a partir de:"⟦/⟧)⟦/⟧
   ⟦main/1|leia⟧leia(⟦main/1/alvo|variavel⟧n⟦/⟧)⟦/⟧
   ⟦main/2|enquanto⟧enquanto ⟦main/2/cond|operacao⟧n > 0⟦/⟧ faca
      ⟦main/2/corpo/0|escreva⟧escreval(⟦main/2/corpo/0/0|variavel⟧n⟦/⟧)⟦/⟧
      ⟦main/2/corpo/1|atribuicao⟧⟦main/2/corpo/1/alvo|variavel⟧n⟦/⟧ <- ⟦main/2/corpo/1/valor|operacao⟧n - 1⟦/⟧⟦/⟧
   fimenquanto⟦/⟧
   ⟦main/3|escreva⟧escreval(⟦main/3/0|literal⟧"Fogo!"⟦/⟧)⟦/⟧
⟦prog:inicio⟧fimalgoritmo⟦/⟧
