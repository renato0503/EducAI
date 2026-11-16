#include <iostream>
#include <string>

int main() {
    std::string linha;
    int n = 0;

    std::cout << "Contar a partir de:\n";
    std::getline(std::cin, linha);
    n = std::stoi(linha);
    while (n > 0) {
        std::cout << n << "\n";
        n = n - 1;
    }
    std::cout << "Fogo!\n";
    return 0;
}
