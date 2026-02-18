def add_one(num):
    if num >= 9:
        return num+1
    total = num+1
    print(total)

    return add_one(total)

#print(add_one(0))


value = "y"
count = 0

while value:
    count += 1
    print(count)
    if count == 5:
        break;
    else:
        value = 0
        continue
