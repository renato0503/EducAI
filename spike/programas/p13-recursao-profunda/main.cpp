#include <iostream>
#include <string>

int soma(int k) {
    if (k == 0) {
        return 0;
    } else {
        return k + soma(k - 1);
    }
}

int main() {
    std::string linha;
    int n = 0;

    std::getline(std::cin, linha);
    n = std::stoi(linha);
    std::cout << "soma: " << soma(n) << "\n";
    return 0;
}
