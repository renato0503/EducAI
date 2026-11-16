#include <stdbool.h>
#include <stdio.h>

int main(void) {
    char linha[256];
    int a = 0;
    int b = 0;
    double x = 0.0;
    bool par = false;

    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &a);
    }
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &b);
    }
    printf("%d / %d = %.2f\n", a, b, (double) a / b);
    printf("%d div %d = %d\n", a, b, a / b);
    printf("%d mod %d = %d\n", a, b, a % b);
    par = a % 2 == 0;
    printf("a e par? %s\n", par ? "verdadeiro" : "falso");
    x = 0.125;
    printf("0.125 com 2 casas: %.2f\n", x);
    x = 2.675;
    printf("2.675 com 2 casas: %.2f\n", x);
    x = 0.1 + 0.2;
    printf("0.1 + 0.2 = %.2f\n", x);
    return 0;
}
