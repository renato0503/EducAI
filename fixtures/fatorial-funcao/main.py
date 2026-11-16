⟦f0⟧⟦f0:assinatura⟧def fatorial(⟦f0/param/0⟧k⟦/⟧):⟦/⟧
    ⟦f0/var/0⟧i = 0
    resultado = 0⟦/⟧
    ⟦f0/0⟧resultado = 1⟦/⟧
    ⟦f0/1⟧for ⟦f0/1/var⟧i⟦/⟧ in range(⟦f0/1/de⟧2⟦/⟧, ⟦f0/1/ate⟧k + 1⟦/⟧):
        ⟦f0/1/corpo/0⟧resultado = ⟦f0/1/corpo/0/valor⟧resultado * i⟦/⟧⟦/⟧⟦/⟧
    ⟦f0/2⟧return resultado⟦/⟧⟦/⟧


⟦var/0⟧n = 0⟦/⟧

⟦main/0⟧print(⟦main/0/0⟧"Calcular o fatorial de:"⟦/⟧)⟦/⟧
⟦main/1⟧⟦main/1/alvo⟧n⟦/⟧ = ⟦syn:python.conversao_input⟧int(input())⟦/⟧⟦/⟧
⟦main/2⟧print(f"{⟦main/2/0⟧n⟦/⟧}! = {⟦main/2/2⟧fatorial(n)⟦/⟧}")⟦/⟧
