#include <stdio.h>

int main(void) {
    char linha[256];
    int a = 0;
    int b = 0;

    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &a);
    }
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &b);
    }
    printf("inteira: %d\n", a / b);
    return 0;
}
