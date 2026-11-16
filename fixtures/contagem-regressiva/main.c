⟦syn:c.include_stdio⟧#include <stdio.h>⟦/⟧

⟦prog:inicio⟧int main(void) {⟦/⟧
    ⟦syn:c.buffer_linha⟧char linha[256];⟦/⟧
    ⟦var/0⟧int n = 0;⟦/⟧

    ⟦main/0⟧printf(⟦main/0/0⟧"Contar a partir de:\n"⟦/⟧);⟦/⟧
    ⟦main/1⟧if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &⟦main/1/alvo⟧n⟦/⟧);
    }⟦/⟧
    ⟦main/2⟧while (⟦main/2/cond⟧n > 0⟦/⟧) {
        ⟦main/2/corpo/0⟧printf("⟦main/2/corpo/0/0⟧%d⟦/⟧\n", ⟦main/2/corpo/0/0⟧n⟦/⟧);⟦/⟧
        ⟦main/2/corpo/1⟧⟦main/2/corpo/1/alvo⟧n⟦/⟧ = ⟦main/2/corpo/1/valor⟧n - 1⟦/⟧;⟦/⟧
    }⟦/⟧
    ⟦main/3⟧printf(⟦main/3/0⟧"Fogo!\n"⟦/⟧);⟦/⟧
    ⟦syn:c.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
