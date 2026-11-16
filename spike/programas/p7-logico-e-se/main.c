#include <stdbool.h>
#include <stdio.h>

int main(void) {
    char linha[256];
    int a = 0;
    int b = 0;
    bool x = false;
    bool y = false;

    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &a);
    }
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &b);
    }
    x = (a > 0) && (b > 0);
    y = (a > 10) || !(b > 10);
    printf("ambos positivos? %s\n", x ? "verdadeiro" : "falso");
    printf("y? %s\n", y ? "verdadeiro" : "falso");
    if (x) {
        if (a > b) {
            printf("a maior\n");
        } else {
            if (a == b) {
                printf("iguais\n");
            } else {
                printf("b maior\n");
            }
        }
    } else {
        printf("algum nao positivo\n");
    }
    if ((b != 0) && (a / b > 1)) {
        printf("a e mais que o dobro de b\n");
    }
    return 0;
}
