⟦syn:cpp.includes⟧#include <iostream>
#include <string>⟦/⟧

⟦prog:inicio⟧int main() {⟦/⟧
    ⟦syn:cpp.buffer_linha⟧std::string linha;⟦/⟧
    ⟦var/0⟧int v[5] = {0};⟦/⟧
    ⟦var/1⟧int i = 0;
    int maior = 0;⟦/⟧

    ⟦main/0⟧std::cout << ⟦main/0/0⟧"Digite 5 numeros:\n"⟦/⟧;⟦/⟧
    ⟦main/1⟧for (⟦main/1/var⟧i⟦/⟧ = ⟦main/1/de⟧0⟦/⟧; i <= ⟦main/1/ate⟧4⟦/⟧; i++) {
        ⟦main/1/corpo/0⟧std::getline(std::cin, linha);
        ⟦main/1/corpo/0/alvo⟧v[i]⟦/⟧ = std::stoi(linha);⟦/⟧
    }⟦/⟧
    ⟦main/2⟧⟦main/2/alvo⟧maior⟦/⟧ = ⟦main/2/valor⟧v[0]⟦/⟧;⟦/⟧
    ⟦main/3⟧for (⟦main/3/var⟧i⟦/⟧ = ⟦main/3/de⟧1⟦/⟧; i <= ⟦main/3/ate⟧4⟦/⟧; i++) {
        ⟦main/3/corpo/0⟧if (⟦main/3/corpo/0/cond⟧v[i] > maior⟦/⟧) {
            ⟦main/3/corpo/0/entao/0⟧maior = v[i];⟦/⟧
        }⟦/⟧
    }⟦/⟧
    ⟦main/4⟧std::cout << ⟦main/4/0⟧"Maior: "⟦/⟧ << ⟦main/4/1⟧maior⟦/⟧ << "\n";⟦/⟧
    ⟦syn:cpp.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
