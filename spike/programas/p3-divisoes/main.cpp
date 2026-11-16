#include <iomanip>
#include <iostream>
#include <string>

int main() {
    std::string linha;
    int a = 0;
    int b = 0;
    double x = 0.0;
    bool par = false;

    std::getline(std::cin, linha);
    a = std::stoi(linha);
    std::getline(std::cin, linha);
    b = std::stoi(linha);
    std::cout << a << " / " << b << " = " << std::fixed << std::setprecision(2)
              << static_cast<double>(a) / b << "\n";
    std::cout << a << " div " << b << " = " << a / b << "\n";
    std::cout << a << " mod " << b << " = " << a % b << "\n";
    par = a % 2 == 0;
    std::cout << "a e par? " << (par ? "verdadeiro" : "falso") << "\n";
    x = 0.125;
    std::cout << "0.125 com 2 casas: " << std::fixed << std::setprecision(2) << x << "\n";
    x = 2.675;
    std::cout << "2.675 com 2 casas: " << std::fixed << std::setprecision(2) << x << "\n";
    x = 0.1 + 0.2;
    std::cout << "0.1 + 0.2 = " << std::fixed << std::setprecision(2) << x << "\n";
    return 0;
}
