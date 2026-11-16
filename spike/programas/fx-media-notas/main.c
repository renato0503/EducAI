#include <stdio.h>

int main(void) {
    char linha[256];
    double n1 = 0.0;
    double n2 = 0.0;
    double n3 = 0.0;
    double n4 = 0.0;
    double media = 0.0;

    printf("Digite as 4 notas:\n");
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &n1);
    }
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &n2);
    }
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &n3);
    }
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &n4);
    }
    media = (n1 + n2 + n3 + n4) / 4;
    printf("Media: %.2f\n", media);
    if (media >= 7) {
        printf("Aprovado\n");
    } else {
        printf("Reprovado\n");
    }
    return 0;
}
