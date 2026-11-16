#include <stdio.h>

int soma(int k);

int main(void) {
    char linha[256];
    int n = 0;

    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &n);
    }
    printf("soma: %d\n", soma(n));
    return 0;
}

int soma(int k) {
    if (k == 0) {
        return 0;
    } else {
        return k + soma(k - 1);
    }
}
