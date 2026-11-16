n = 0
i = 0
nota = 0.0
soma = 0.0
media = 0.0

print("Quantas notas?")
n = int(input())
soma = 0
for i in range(1, n + 1):
    print(f"Nota {i}:")
    nota = float(input())
    soma = soma + nota
media = soma / n
print(f"Media: {media:.2f}")
print(f"Media com 1 casa: {media:.1f}")
if media >= 7:
    print("Aprovado")
else:
    print("Reprovado")
