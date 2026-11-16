#include <stdio.h>

int main(void) {
    int i = 0;
    int soma = 0;

    soma = 0;
    for (i = 1; i <= 3; i++) {
        soma = soma + i;
    }
    printf("soma: %d\n", soma);
    printf("i depois do laco: %d\n", i);
    return 0;
}
