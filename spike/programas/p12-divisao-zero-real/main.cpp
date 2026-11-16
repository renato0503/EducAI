#include <iomanip>
#include <iostream>
#include <string>

int main() {
    std::string linha;
    int a = 0;
    int b = 0;
    double x = 0.0;

    std::getline(std::cin, linha);
    a = std::stoi(linha);
    std::getline(std::cin, linha);
    b = std::stoi(linha);
    x = static_cast<double>(a) / b;
    std::cout << "real: " << std::fixed << std::setprecision(2) << x << "\n";
    return 0;
}
