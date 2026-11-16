#include <iostream>

int total = 0;
int i = 0;

void somar(int valor) {
    total = total + valor;
}

int dobroDoTotal() {
    return total * 2;
}

int main() {
    total = 0;
    for (i = 1; i <= 4; i++) {
        somar(i * 10);
    }
    std::cout << "total: " << total << "\n";
    std::cout << "dobro: " << dobroDoTotal() << "\n";
    return 0;
}
