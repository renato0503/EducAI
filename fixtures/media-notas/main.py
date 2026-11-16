⟦var/0⟧n1 = 0.0
n2 = 0.0
n3 = 0.0
n4 = 0.0
media = 0.0⟦/⟧

⟦main/0⟧print(⟦main/0/0⟧"Digite as 4 notas:"⟦/⟧)⟦/⟧
⟦main/1⟧⟦main/1/alvo⟧n1⟦/⟧ = ⟦syn:python.conversao_input⟧float(input())⟦/⟧⟦/⟧
⟦main/2⟧⟦main/2/alvo⟧n2⟦/⟧ = ⟦syn:python.conversao_input⟧float(input())⟦/⟧⟦/⟧
⟦main/3⟧⟦main/3/alvo⟧n3⟦/⟧ = ⟦syn:python.conversao_input⟧float(input())⟦/⟧⟦/⟧
⟦main/4⟧⟦main/4/alvo⟧n4⟦/⟧ = ⟦syn:python.conversao_input⟧float(input())⟦/⟧⟦/⟧
⟦main/5⟧⟦main/5/alvo⟧media⟦/⟧ = ⟦main/5/valor⟧(⟦main/5/valor/esq⟧n1 + n2 + n3 + n4⟦/⟧) / 4⟦/⟧⟦/⟧
⟦main/6⟧print(f"⟦main/6/0⟧Media: ⟦/⟧{⟦main/6/1⟧media:.2f⟦/⟧}")⟦/⟧
⟦main/7⟧if ⟦main/7/cond⟧media >= 7⟦/⟧:
    ⟦main/7/entao/0⟧print("Aprovado")⟦/⟧
else:
    ⟦main/7/senao/0⟧print("Reprovado")⟦/⟧⟦/⟧
