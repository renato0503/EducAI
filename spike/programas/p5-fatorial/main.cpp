#include <iostream>
#include <string>

int fat(int k) {
    if (k <= 1) {
        return 1;
    } else {
        return k * fat(k - 1);
    }
}

int main() {
    std::string linha;
    int n = 0;
    int i = 0;

    std::getline(std::cin, linha);
    n = std::stoi(linha);
    for (i = 1; i <= n; i++) {
        std::cout << i << "! = " << fat(i) << "\n";
    }
    return 0;
}
