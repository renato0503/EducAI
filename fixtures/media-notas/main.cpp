⟦syn:cpp.includes⟧#include <iomanip>
#include <iostream>
#include <string>⟦/⟧

⟦prog:inicio⟧int main() {⟦/⟧
    ⟦syn:cpp.buffer_linha⟧std::string linha;⟦/⟧
    ⟦var/0⟧double n1 = 0.0;
    double n2 = 0.0;
    double n3 = 0.0;
    double n4 = 0.0;
    double media = 0.0;⟦/⟧

    ⟦main/0⟧std::cout << ⟦main/0/0⟧"Digite as 4 notas:\n"⟦/⟧;⟦/⟧
    ⟦main/1⟧std::getline(std::cin, linha);
    ⟦main/1/alvo⟧n1⟦/⟧ = std::stod(linha);⟦/⟧
    ⟦main/2⟧std::getline(std::cin, linha);
    ⟦main/2/alvo⟧n2⟦/⟧ = std::stod(linha);⟦/⟧
    ⟦main/3⟧std::getline(std::cin, linha);
    ⟦main/3/alvo⟧n3⟦/⟧ = std::stod(linha);⟦/⟧
    ⟦main/4⟧std::getline(std::cin, linha);
    ⟦main/4/alvo⟧n4⟦/⟧ = std::stod(linha);⟦/⟧
    ⟦main/5⟧⟦main/5/alvo⟧media⟦/⟧ = ⟦main/5/valor⟧(⟦main/5/valor/esq⟧n1 + n2 + n3 + n4⟦/⟧) / 4⟦/⟧;⟦/⟧
    ⟦main/6⟧std::cout << ⟦main/6/0⟧"Media: "⟦/⟧ << ⟦main/6/1⟧std::fixed << std::setprecision(2) << media⟦/⟧ << "\n";⟦/⟧
    ⟦main/7⟧if (⟦main/7/cond⟧media >= 7⟦/⟧) {
        ⟦main/7/entao/0⟧std::cout << "Aprovado\n";⟦/⟧
    } else {
        ⟦main/7/senao/0⟧std::cout << "Reprovado\n";⟦/⟧
    }⟦/⟧
    ⟦syn:cpp.return0⟧return 0;⟦/⟧
⟦prog:inicio⟧}⟦/⟧
