#include <stdio.h>
#include <string.h>

int main(void) {
    char nome[256] = "";
    char saudacao[256] = "";

    printf("Qual e o seu nome?\n");
    if (fgets(nome, sizeof nome, stdin) == NULL) {
        nome[0] = '\0';
    }
    nome[strcspn(nome, "\n")] = '\0';
    strcpy(saudacao, "Ola, ");
    strcat(saudacao, nome);
    strcat(saudacao, "!");
    printf("%s\n", saudacao);
    printf("Seu nome tem %d caracteres\n", (int) strlen(nome));
    printf("Progresso: 100%%\n");
    if (strcmp(nome, "fim") == 0) {
        printf("Ate logo\n");
    } else {
        printf("Bem-vindo\n");
    }
    return 0;
}
