#include <stdio.h>

int main(void) {
    char linha[256];
    int n = 0;
    int i = 0;

    printf("Tabuada de qual numero?\n");
    if (fgets(linha, sizeof linha, stdin) != NULL) {
        sscanf(linha, "%d", &n);
    }
    for (i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", n, i, n * i);
    }
    return 0;
}
