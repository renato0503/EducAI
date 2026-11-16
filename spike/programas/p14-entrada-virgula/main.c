#include <stdio.h>

int main(void) {
    char linha[256];
    double x = 0.0;

    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%lf", &x);
    }
    printf("x: %.2f\n", x);
    return 0;
}
