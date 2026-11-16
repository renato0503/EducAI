#include <iomanip>
#include <iostream>
#include <string>

int main() {
    std::string linha;
    int n = 0;
    int i = 0;
    double nota = 0.0;
    double soma = 0.0;
    double media = 0.0;

    std::cout << "Quantas notas?\n";
    std::getline(std::cin, linha);
    n = std::stoi(linha);
    soma = 0;
    for (i = 1; i <= n; i++) {
        std::cout << "Nota " << i << ":\n";
        std::getline(std::cin, linha);
        nota = std::stod(linha);
        soma = soma + nota;
    }
    media = soma / n;
    std::cout << "Media: " << std::fixed << std::setprecision(2) << media << "\n";
    std::cout << "Media com 1 casa: " << std::fixed << std::setprecision(1) << media << "\n";
    if (media >= 7) {
        std::cout << "Aprovado\n";
    } else {
        std::cout << "Reprovado\n";
    }
    return 0;
}
