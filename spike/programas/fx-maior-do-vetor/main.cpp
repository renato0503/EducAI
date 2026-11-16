#include <iostream>
#include <string>

int main() {
    std::string linha;
    int v[5] = {0};
    int i = 0;
    int maior = 0;

    std::cout << "Digite 5 numeros:\n";
    for (i = 0; i <= 4; i++) {
        std::getline(std::cin, linha);
        v[i] = std::stoi(linha);
    }
    maior = v[0];
    for (i = 1; i <= 4; i++) {
        if (v[i] > maior) {
            maior = v[i];
        }
    }
    std::cout << "Maior: " << maior << "\n";
    return 0;
}
