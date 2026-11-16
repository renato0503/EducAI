nome = ""
saudacao = ""

print("Qual e o seu nome?")
nome = input()
saudacao = "Ola, " + nome + "!"
print(saudacao)
print(f"Seu nome tem {len(nome)} caracteres")
print("Progresso: 100%")
if nome == "fim":
    print("Ate logo")
else:
    print("Bem-vindo")
