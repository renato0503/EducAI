⟦syn:cpp.includes⟧#include <iostream>
#include <string>⟦/⟧

⟦prog:inicio⟧int main() {⟦/⟧
    ⟦syn:cpp.buffer_linha⟧std::string linha;⟦/⟧
    ⟦var/0⟧int n = 0;⟦/⟧

    ⟦main/0⟧std::cout << ⟦main/0/0⟧"Contar a partir de:\n"⟦/⟧;⟦/⟧
    ⟦main/1⟧std::getline(std::cin, linha);
    ⟦main/1/alvo⟧n⟦/⟧ = std::stoi(linha);⟦/⟧
    ⟦main/2⟧while (⟦main/2/cond⟧n > 0⟦/⟧) {
        ⟦main/2/corpo/0⟧std::cout << ⟦main/2/corpo/0/0⟧n⟦/⟧ << "\n";⟦/⟧
        ⟦main/2/corpo/1⟧⟦main/2/corpo/1/alvo⟧n⟦/⟧ = ⟦main/2/corpo/1/valor⟧n - 1⟦/⟧;⟦/⟧
    }⟦/⟧
    ⟦main/3⟧std::cout << ⟦main/3/0⟧"Fogo!\n"⟦/⟧;⟦/⟧
    ⟦syn:cpp.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
