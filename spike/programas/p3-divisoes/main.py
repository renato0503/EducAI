a = 0
b = 0
x = 0.0
par = False

a = int(input())
b = int(input())
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} div {b} = {a // b}")
print(f"{a} mod {b} = {a % b}")
par = a % 2 == 0
print(f"a e par? {'verdadeiro' if par else 'falso'}")
x = 0.125
print(f"0.125 com 2 casas: {x:.2f}")
x = 2.675
print(f"2.675 com 2 casas: {x:.2f}")
x = 0.1 + 0.2
print(f"0.1 + 0.2 = {x:.2f}")
