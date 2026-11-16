⟦syn:cpp.includes⟧#include <iostream>
#include <string>⟦/⟧

⟦f0⟧⟦f0:assinatura⟧int fatorial(⟦f0/param/0⟧int k⟦/⟧)⟦/⟧ {
    ⟦f0/var/0⟧int i = 0;
    int resultado = 0;⟦/⟧
    ⟦f0/0⟧resultado = 1;⟦/⟧
    ⟦f0/1⟧for (⟦f0/1/var⟧i⟦/⟧ = ⟦f0/1/de⟧2⟦/⟧; i <= ⟦f0/1/ate⟧k⟦/⟧; i++) {
        ⟦f0/1/corpo/0⟧resultado = ⟦f0/1/corpo/0/valor⟧resultado * i⟦/⟧;⟦/⟧
    }⟦/⟧
    ⟦f0/2⟧return resultado;⟦/⟧
}⟦/⟧

⟦prog:inicio⟧int main() {⟦/⟧
    ⟦syn:cpp.buffer_linha⟧std::string linha;⟦/⟧
    ⟦var/0⟧int n = 0;⟦/⟧

    ⟦main/0⟧std::cout << ⟦main/0/0⟧"Calcular o fatorial de:\n"⟦/⟧;⟦/⟧
    ⟦main/1⟧std::getline(std::cin, linha);
    ⟦main/1/alvo⟧n⟦/⟧ = std::stoi(linha);⟦/⟧
    ⟦main/2⟧std::cout << ⟦main/2/0⟧n⟦/⟧ << "! = " << ⟦main/2/2⟧fatorial(n)⟦/⟧ << "\n";⟦/⟧
    ⟦syn:cpp.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
