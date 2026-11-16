#include <iomanip>
#include <iostream>
#include <string>

int main() {
    std::string linha;
    double x = 0.0;

    std::getline(std::cin, linha);
    x = std::stod(linha);
    std::cout << "x: " << std::fixed << std::setprecision(2) << x << "\n";
    return 0;
}
