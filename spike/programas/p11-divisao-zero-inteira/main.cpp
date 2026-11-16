#include <iostream>
#include <string>

int main() {
    std::string linha;
    int a = 0;
    int b = 0;

    std::getline(std::cin, linha);
    a = std::stoi(linha);
    std::getline(std::cin, linha);
    b = std::stoi(linha);
    std::cout << "inteira: " << a / b << "\n";
    return 0;
}
