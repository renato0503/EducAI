#include <iostream>
#include <string>

void dobrar(int w[5]) {
    int j = 0;
    for (j = 0; j <= 4; j++) {
        w[j] = w[j] * 2;
    }
}

int soma(int w[5]) {
    int j = 0;
    int total = 0;
    total = 0;
    for (j = 0; j <= 4; j++) {
        total = total + w[j];
    }
    return total;
}

int main() {
    std::string linha;
    int v[5] = {0};
    int i = 0;

    for (i = 0; i <= 4; i++) {
        std::getline(std::cin, linha);
        v[i] = std::stoi(linha);
    }
    dobrar(v);
    for (i = 4; i >= 0; i--) {
        std::cout << v[i] << " ";
    }
    std::cout << "\n";
    std::cout << "Soma: " << soma(v) << "\n";
    return 0;
}
