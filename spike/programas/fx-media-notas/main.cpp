#include <iomanip>
#include <iostream>
#include <string>

int main() {
    std::string linha;
    double n1 = 0.0;
    double n2 = 0.0;
    double n3 = 0.0;
    double n4 = 0.0;
    double media = 0.0;

    std::cout << "Digite as 4 notas:\n";
    std::getline(std::cin, linha);
    n1 = std::stod(linha);
    std::getline(std::cin, linha);
    n2 = std::stod(linha);
    std::getline(std::cin, linha);
    n3 = std::stod(linha);
    std::getline(std::cin, linha);
    n4 = std::stod(linha);
    media = (n1 + n2 + n3 + n4) / 4;
    std::cout << "Media: " << std::fixed << std::setprecision(2) << media << "\n";
    if (media >= 7) {
        std::cout << "Aprovado\n";
    } else {
        std::cout << "Reprovado\n";
    }
    return 0;
}
