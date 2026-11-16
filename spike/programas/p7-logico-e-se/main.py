a = 0
b = 0
x = False
y = False

a = int(input())
b = int(input())
x = (a > 0) and (b > 0)
y = (a > 10) or not (b > 10)
print(f"ambos positivos? {'verdadeiro' if x else 'falso'}")
print(f"y? {'verdadeiro' if y else 'falso'}")
if x:
    if a > b:
        print("a maior")
    else:
        if a == b:
            print("iguais")
        else:
            print("b maior")
else:
    print("algum nao positivo")
if (b != 0) and (a // b > 1):
    print("a e mais que o dobro de b")
