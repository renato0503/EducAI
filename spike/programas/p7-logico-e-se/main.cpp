#include <iostream>
#include <string>

int main() {
    std::string linha;
    int a = 0;
    int b = 0;
    bool x = false;
    bool y = false;

    std::getline(std::cin, linha);
    a = std::stoi(linha);
    std::getline(std::cin, linha);
    b = std::stoi(linha);
    x = (a > 0) && (b > 0);
    y = (a > 10) || !(b > 10);
    std::cout << "ambos positivos? " << (x ? "verdadeiro" : "falso") << "\n";
    std::cout << "y? " << (y ? "verdadeiro" : "falso") << "\n";
    if (x) {
        if (a > b) {
            std::cout << "a maior\n";
        } else {
            if (a == b) {
                std::cout << "iguais\n";
            } else {
                std::cout << "b maior\n";
            }
        }
    } else {
        std::cout << "algum nao positivo\n";
    }
    if ((b != 0) && (a / b > 1)) {
        std::cout << "a e mais que o dobro de b\n";
    }
    return 0;
}
