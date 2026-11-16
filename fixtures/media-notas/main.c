⟦syn:c.include_stdio⟧#include <stdio.h>⟦/⟧

⟦prog:inicio⟧int main(void) {⟦/⟧
    ⟦syn:c.buffer_linha⟧char linha[256];⟦/⟧
    ⟦var/0⟧double n1 = 0.0;
    double n2 = 0.0;
    double n3 = 0.0;
    double n4 = 0.0;
    double media = 0.0;⟦/⟧

    ⟦main/0⟧printf(⟦main/0/0⟧"Digite as 4 notas:\n"⟦/⟧);⟦/⟧
    ⟦main/1⟧if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &⟦main/1/alvo⟧n1⟦/⟧);
    }⟦/⟧
    ⟦main/2⟧if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &⟦main/2/alvo⟧n2⟦/⟧);
    }⟦/⟧
    ⟦main/3⟧if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &⟦main/3/alvo⟧n3⟦/⟧);
    }⟦/⟧
    ⟦main/4⟧if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &⟦main/4/alvo⟧n4⟦/⟧);
    }⟦/⟧
    ⟦main/5⟧⟦main/5/alvo⟧media⟦/⟧ = ⟦main/5/valor⟧(⟦main/5/valor/esq⟧n1 + n2 + n3 + n4⟦/⟧) / 4⟦/⟧;⟦/⟧
    ⟦main/6⟧printf("⟦main/6/0⟧Media: ⟦/⟧⟦main/6/1⟧%.2f⟦/⟧\n", ⟦main/6/1⟧media⟦/⟧);⟦/⟧
    ⟦main/7⟧if (⟦main/7/cond⟧media >= 7⟦/⟧) {
        ⟦main/7/entao/0⟧printf("Aprovado\n");⟦/⟧
    } else {
        ⟦main/7/senao/0⟧printf("Reprovado\n");⟦/⟧
    }⟦/⟧
    ⟦syn:c.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
