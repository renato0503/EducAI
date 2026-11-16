total = 0
i = 0


def somar(valor):
    global total
    total = total + valor


def dobroDoTotal():
    return total * 2


total = 0
for i in range(1, 5):
    somar(i * 10)
print(f"total: {total}")
print(f"dobro: {dobroDoTotal()}")
