#include <stdio.h>

int main(void) {
    char linha[256];
    int a = 0;
    int b = 0;
    double x = 0.0;

    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &a);
    }
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &b);
    }
    x = (double) a / b;
    printf("real: %.2f\n", x);
    return 0;
}
