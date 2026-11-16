def soma(k):
    if k == 0:
        return 0
    else:
        return k + soma(k - 1)


n = 0

n = int(input())
print(f"soma: {soma(n)}")
