#include <iostream>
#include <string>

int main() {
    std::string nome = "";

    std::getline(std::cin, nome);
    std::cout << "Ola, " << nome << "!\n";
    std::cout << "tamanho: " << nome.length() << "\n";
    return 0;
}
