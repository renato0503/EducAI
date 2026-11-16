#include <stdio.h>

int fatorial(int k);

int main(void) {
    char linha[256];
    int n = 0;

    printf("Calcular o fatorial de:\n");
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &n);
    }
    printf("%d! = %d\n", n, fatorial(n));
    return 0;
}

int fatorial(int k) {
    int i = 0;
    int resultado = 0;
    resultado = 1;
    for (i = 2; i <= k; i++) {
        resultado = resultado * i;
    }
    return resultado;
}
