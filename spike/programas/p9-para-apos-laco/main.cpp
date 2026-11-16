#include <iostream>

int main() {
    int i = 0;
    int soma = 0;

    soma = 0;
    for (i = 1; i <= 3; i++) {
        soma = soma + i;
    }
    std::cout << "soma: " << soma << "\n";
    std::cout << "i depois do laco: " << i << "\n";
    return 0;
}
