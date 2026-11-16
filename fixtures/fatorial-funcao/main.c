⟦syn:c.include_stdio⟧#include <stdio.h>⟦/⟧

⟦f0:assinatura⟧int fatorial(⟦f0/param/0⟧int k⟦/⟧);⟦/⟧

⟦prog:inicio⟧int main(void) {⟦/⟧
    ⟦syn:c.buffer_linha⟧char linha[256];⟦/⟧
    ⟦var/0⟧int n = 0;⟦/⟧

    ⟦main/0⟧printf(⟦main/0/0⟧"Calcular o fatorial de:\n"⟦/⟧);⟦/⟧
    ⟦main/1⟧if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &⟦main/1/alvo⟧n⟦/⟧);
    }⟦/⟧
    ⟦main/2⟧printf("⟦main/2/0⟧%d⟦/⟧! = ⟦main/2/2⟧%d⟦/⟧\n", ⟦main/2/0⟧n⟦/⟧, ⟦main/2/2⟧fatorial(n)⟦/⟧);⟦/⟧
    ⟦syn:c.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧

⟦f0⟧⟦f0:assinatura⟧int fatorial(⟦f0/param/0⟧int k⟦/⟧)⟦/⟧ {
    ⟦f0/var/0⟧int i = 0;
    int resultado = 0;⟦/⟧
    ⟦f0/0⟧resultado = 1;⟦/⟧
    ⟦f0/1⟧for (⟦f0/1/var⟧i⟦/⟧ = ⟦f0/1/de⟧2⟦/⟧; i <= ⟦f0/1/ate⟧k⟦/⟧; i++) {
        ⟦f0/1/corpo/0⟧resultado = ⟦f0/1/corpo/0/valor⟧resultado * i⟦/⟧;⟦/⟧
    }⟦/⟧
    ⟦f0/2⟧return resultado;⟦/⟧
}⟦/⟧
