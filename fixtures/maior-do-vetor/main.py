⟦var/0⟧v = [0] * 5⟦/⟧
⟦var/1⟧i = 0
maior = 0⟦/⟧

⟦main/0⟧print(⟦main/0/0⟧"Digite 5 numeros:"⟦/⟧)⟦/⟧
⟦main/1⟧for ⟦main/1/var⟧i⟦/⟧ in range(⟦main/1/ate⟧5⟦/⟧):
    ⟦main/1/corpo/0⟧⟦main/1/corpo/0/alvo⟧v[i]⟦/⟧ = ⟦syn:python.conversao_input⟧int(input())⟦/⟧⟦/⟧⟦/⟧
⟦main/2⟧⟦main/2/alvo⟧maior⟦/⟧ = ⟦main/2/valor⟧v[0]⟦/⟧⟦/⟧
⟦main/3⟧for ⟦main/3/var⟧i⟦/⟧ in range(⟦main/3/de⟧1⟦/⟧, ⟦main/3/ate⟧5⟦/⟧):
    ⟦main/3/corpo/0⟧if ⟦main/3/corpo/0/cond⟧v[i] > maior⟦/⟧:
        ⟦main/3/corpo/0/entao/0⟧maior = v[i]⟦/⟧⟦/⟧⟦/⟧
⟦main/4⟧print(f"⟦main/4/0⟧Maior: ⟦/⟧{⟦main/4/1⟧maior⟦/⟧}")⟦/⟧
