#include <stdio.h>

int total = 0;
int i = 0;

void somar(int valor);
int dobroDoTotal(void);

int main(void) {
    total = 0;
    for (i = 1; i <= 4; i++) {
        somar(i * 10);
    }
    printf("total: %d\n", total);
    printf("dobro: %d\n", dobroDoTotal());
    return 0;
}

void somar(int valor) {
    total = total + valor;
}

int dobroDoTotal(void) {
    return total * 2;
}
