⟦syn:cpp.includes⟧#include <iostream>
#include <string>⟦/⟧

⟦prog:inicio⟧int main() {⟦/⟧
    ⟦syn:cpp.buffer_linha⟧std::string linha;⟦/⟧
    ⟦var/0⟧int n = 0;
    int i = 0;⟦/⟧

    ⟦main/0⟧std::cout << ⟦main/0/0⟧"Tabuada de qual numero?\n"⟦/⟧;⟦/⟧
    ⟦main/1⟧std::getline(std::cin, linha);
    ⟦main/1/alvo⟧n⟦/⟧ = std::stoi(linha);⟦/⟧
    ⟦main/2⟧for (⟦main/2/var⟧i⟦/⟧ = ⟦main/2/de⟧1⟦/⟧; i <= ⟦main/2/ate⟧10⟦/⟧; i++) {
        ⟦main/2/corpo/0⟧std::cout << ⟦main/2/corpo/0/0⟧n⟦/⟧ << " x " << ⟦main/2/corpo/0/2⟧i⟦/⟧ << " = " << ⟦main/2/corpo/0/4⟧n * i⟦/⟧ << "\n";⟦/⟧
    }⟦/⟧
    ⟦syn:cpp.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
