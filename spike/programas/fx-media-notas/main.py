n1 = 0.0
n2 = 0.0
n3 = 0.0
n4 = 0.0
media = 0.0

print("Digite as 4 notas:")
n1 = float(input())
n2 = float(input())
n3 = float(input())
n4 = float(input())
media = (n1 + n2 + n3 + n4) / 4
print(f"Media: {media:.2f}")
if media >= 7:
    print("Aprovado")
else:
    print("Reprovado")
