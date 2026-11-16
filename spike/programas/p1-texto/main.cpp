#include <iostream>
#include <string>

int main() {
    std::string nome = "";
    std::string saudacao = "";

    std::cout << "Qual e o seu nome?\n";
    std::getline(std::cin, nome);
    saudacao = "Ola, " + nome + "!";
    std::cout << saudacao << "\n";
    std::cout << "Seu nome tem " << nome.length() << " caracteres\n";
    std::cout << "Progresso: 100%\n";
    if (nome == "fim") {
        std::cout << "Ate logo\n";
    } else {
        std::cout << "Bem-vindo\n";
    }
    return 0;
}
