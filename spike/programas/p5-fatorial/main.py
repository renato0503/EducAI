def fat(k):
    if k <= 1:
        return 1
    else:
        return k * fat(k - 1)


n = 0
i = 0

n = int(input())
for i in range(1, n + 1):
    print(f"{i}! = {fat(i)}")
