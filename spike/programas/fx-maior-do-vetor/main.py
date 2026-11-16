v = [0] * 5
i = 0
maior = 0

print("Digite 5 numeros:")
for i in range(5):
    v[i] = int(input())
maior = v[0]
for i in range(1, 5):
    if v[i] > maior:
        maior = v[i]
print(f"Maior: {maior}")
