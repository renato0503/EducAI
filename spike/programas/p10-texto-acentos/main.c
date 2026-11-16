#include <stdio.h>
#include <string.h>

int main(void) {
    char nome[256] = "";

    if (fgets(nome, sizeof nome, stdin) == NULL) {
        nome[0] = '\0';
    }
    nome[strcspn(nome, "\n")] = '\0';
    printf("Ola, %s!\n", nome);
    printf("tamanho: %d\n", (int) strlen(nome));
    return 0;
}
