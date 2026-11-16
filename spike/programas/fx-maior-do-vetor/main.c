#include <stdio.h>

int main(void) {
    char linha[256];
    int v[5] = {0};
    int i = 0;
    int maior = 0;

    printf("Digite 5 numeros:\n");
    for (i = 0; i <= 4; i++) {
        if (fgets(linha, sizeof linha, stdin) != NULL) {
            sscanf(linha, "%d", &v[i]);
        }
    }
    maior = v[0];
    for (i = 1; i <= 4; i++) {
        if (v[i] > maior) {
            maior = v[i];
        }
    }
    printf("Maior: %d\n", maior);
    return 0;
}
