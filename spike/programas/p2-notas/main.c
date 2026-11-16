#include <stdio.h>

int main(void) {
    char linha[256];
    int n = 0;
    int i = 0;
    double nota = 0.0;
    double soma = 0.0;
    double media = 0.0;

    printf("Quantas notas?\n");
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &n);
    }
    soma = 0;
    for (i = 1; i <= n; i++) {
        printf("Nota %d:\n", i);
        if (fgets(linha, sizeof linha, stdin) != NULL) {
            sscanf(linha, "%lf", &nota);
        }
        soma = soma + nota;
    }
    media = soma / n;
    printf("Media: %.2f\n", media);
    printf("Media com 1 casa: %.1f\n", media);
    if (media >= 7) {
        printf("Aprovado\n");
    } else {
        printf("Reprovado\n");
    }
    return 0;
}
