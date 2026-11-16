#include <stdio.h>

int fat(int k);

int main(void) {
    char linha[256];
    int n = 0;
    int i = 0;

    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &n);
    }
    for (i = 1; i <= n; i++) {
        printf("%d! = %d\n", i, fat(i));
    }
    return 0;
}

int fat(int k) {
    if (k <= 1) {
        return 1;
    } else {
        return k * fat(k - 1);
    }
}
