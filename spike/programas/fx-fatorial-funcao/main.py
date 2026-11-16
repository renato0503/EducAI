def fatorial(k):
    i = 0
    resultado = 0
    resultado = 1
    for i in range(2, k + 1):
        resultado = resultado * i
    return resultado


n = 0

print("Calcular o fatorial de:")
n = int(input())
print(f"{n}! = {fatorial(n)}")
