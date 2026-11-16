⟦prog:cabecalho|cabecalho⟧algoritmo "media"⟦/⟧
⟦prog:var|secao_var⟧var⟦/⟧
   ⟦var/0|declaracao⟧n1, n2, n3, n4, media: real⟦/⟧
⟦prog:inicio|bloco_principal⟧inicio⟦/⟧
   ⟦main/0|escreva⟧escreval(⟦main/0/0|literal⟧"Digite as 4 notas:"⟦/⟧)⟦/⟧
   ⟦main/1|leia⟧leia(⟦main/1/alvo|variavel⟧n1⟦/⟧)⟦/⟧
   ⟦main/2|leia⟧leia(⟦main/2/alvo|variavel⟧n2⟦/⟧)⟦/⟧
   ⟦main/3|leia⟧leia(⟦main/3/alvo|variavel⟧n3⟦/⟧)⟦/⟧
   ⟦main/4|leia⟧leia(⟦main/4/alvo|variavel⟧n4⟦/⟧)⟦/⟧
   ⟦main/5|atribuicao⟧⟦main/5/alvo|variavel⟧media⟦/⟧ <- ⟦main/5/valor|operacao⟧(⟦main/5/valor/esq|operacao⟧n1 + n2 + n3 + n4⟦/⟧) / 4⟦/⟧⟦/⟧
   ⟦main/6|escreva⟧escreval(⟦main/6/0|literal⟧"Media: "⟦/⟧, ⟦main/6/1|variavel⟧media⟦/⟧)⟦/⟧
   ⟦main/7|se⟧se ⟦main/7/cond|operacao⟧media >= 7⟦/⟧ entao
      ⟦main/7/entao/0|escreva⟧escreval("Aprovado")⟦/⟧
   senao
      ⟦main/7/senao/0|escreva⟧escreval("Reprovado")⟦/⟧
   fimse⟦/⟧
⟦prog:inicio⟧fimalgoritmo⟦/⟧
