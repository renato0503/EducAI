#include <stdio.h>

void dobrar(int w[5]);
int soma(int w[5]);

int main(void) {
    char linha[256];
    int v[5] = {0};
    int i = 0;

    for (i = 0; i <= 4; i++) {
        if (fgets(linha, sizeof linha, stdin) != NULL) {
            sscanf(linha, "%d", &v[i]);
        }
    }
    dobrar(v);
    for (i = 4; i >= 0; i--) {
        printf("%d ", v[i]);
    }
    printf("\n");
    printf("Soma: %d\n", soma(v));
    return 0;
}

void dobrar(int w[5]) {
    int j = 0;
    for (j = 0; j <= 4; j++) {
        w[j] = w[j] * 2;
    }
}

int soma(int w[5]) {
    int j = 0;
    int total = 0;
    total = 0;
    for (j = 0; j <= 4; j++) {
        total = total + w[j];
    }
    return total;
}
