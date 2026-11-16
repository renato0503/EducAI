#include <iostream>
#include <string>

int fatorial(int k) {
    int i = 0;
    int resultado = 0;
    resultado = 1;
    for (i = 2; i <= k; i++) {
        resultado = resultado * i;
    }
    return resultado;
}

int main() {
    std::string linha;
    int n = 0;

    std::cout << "Calcular o fatorial de:\n";
    std::getline(std::cin, linha);
    n = std::stoi(linha);
    std::cout << n << "! = " << fatorial(n) << "\n";
    return 0;
}
