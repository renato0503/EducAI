⟦syn:c.include_stdio⟧#include <stdio.h>⟦/⟧

⟦prog:inicio⟧int main(void) {⟦/⟧
    ⟦syn:c.buffer_linha⟧char linha[256];⟦/⟧
    ⟦var/0⟧int n = 0;
    int i = 0;⟦/⟧

    ⟦main/0⟧printf(⟦main/0/0⟧"Tabuada de qual numero?\n"⟦/⟧);⟦/⟧
    ⟦main/1⟧if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &⟦main/1/alvo⟧n⟦/⟧);
    }⟦/⟧
    ⟦main/2⟧for (⟦main/2/var⟧i⟦/⟧ = ⟦main/2/de⟧1⟦/⟧; i <= ⟦main/2/ate⟧10⟦/⟧; i++) {
        ⟦main/2/corpo/0⟧printf("⟦main/2/corpo/0/0⟧%d⟦/⟧ x ⟦main/2/corpo/0/2⟧%d⟦/⟧ = ⟦main/2/corpo/0/4⟧%d⟦/⟧\n", ⟦main/2/corpo/0/0⟧n⟦/⟧, ⟦main/2/corpo/0/2⟧i⟦/⟧, ⟦main/2/corpo/0/4⟧n * i⟦/⟧);⟦/⟧
    }⟦/⟧
    ⟦syn:c.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
