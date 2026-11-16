#include <iostream>
#include <string>

int main() {
    std::string linha;
    int n = 0;
    int i = 0;

    std::cout << "Tabuada de qual numero?\n";
    std::getline(std::cin, linha);
    n = std::stoi(linha);
    for (i = 1; i <= 10; i++) {
        std::cout << n << " x " << i << " = " << n * i << "\n";
    }
    return 0;
}
