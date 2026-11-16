⟦prog:cabecalho|cabecalho⟧algoritmo "tabuada"⟦/⟧
⟦prog:var|secao_var⟧var⟦/⟧
   ⟦var/0|declaracao⟧n, i: inteiro⟦/⟧
⟦prog:inicio|bloco_principal⟧inicio⟦/⟧
   ⟦main/0|escreva⟧escreval(⟦main/0/0|literal⟧"Tabuada de qual numero?"⟦/⟧)⟦/⟧
   ⟦main/1|leia⟧leia(⟦main/1/alvo|variavel⟧n⟦/⟧)⟦/⟧
   ⟦main/2|para⟧para ⟦main/2/var|variavel⟧i⟦/⟧ de ⟦main/2/de|literal⟧1⟦/⟧ ate ⟦main/2/ate|literal⟧10⟦/⟧ faca
      ⟦main/2/corpo/0|escreva⟧escreval(⟦main/2/corpo/0/0|variavel⟧n⟦/⟧, " x ", ⟦main/2/corpo/0/2|variavel⟧i⟦/⟧, " = ", ⟦main/2/corpo/0/4|operacao⟧n * i⟦/⟧)⟦/⟧
   fimpara⟦/⟧
⟦prog:inicio⟧fimalgoritmo⟦/⟧
