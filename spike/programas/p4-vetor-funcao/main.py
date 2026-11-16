def dobrar(w):
    j = 0
    for j in range(0, 5):
        w[j] = w[j] * 2


def soma(w):
    j = 0
    total = 0
    total = 0
    for j in range(0, 5):
        total = total + w[j]
    return total


v = [0] * 5
i = 0

for i in range(0, 5):
    v[i] = int(input())
dobrar(v)
for i in range(4, -1, -1):
    print(f"{v[i]} ", end="")
print()
print(f"Soma: {soma(v)}")
