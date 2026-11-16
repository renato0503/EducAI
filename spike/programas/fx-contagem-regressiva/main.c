#include <stdio.h>

int main(void) {
    char linha[256];
    int n = 0;

    printf("Contar a partir de:\n");
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &n);
    }
    while (n > 0) {
        printf("%d\n", n);
        n = n - 1;
    }
    printf("Fogo!\n");
    return 0;
}
