# ##########FUNCTIONS############
# def hello():
#     print("Hello World!")

# hello()

# def sum(num1, num2):
#     print(num1+num2)

# sum(3,28)

#set default values for parameters and return value
def sum(num1 = 0,num2 = 42):
    if type(num1) != int or type(num2) != int:
        return #returns None (meaning NOTHING / NULL)
    else:
        return num1+num2

# print(sum())

def multiple_params(*args):
    print(args)
    print(type(args))
    for x in args:
        print(type(x))

name = ["Dave","Sarah","John"]
# multiple_params(name)

# multiple_params("Dave","John","Carl")

def mult_name_items(**kwargs):
    #kwargs = key-word arguments
    print(kwargs)
    print(type(kwargs))

mult_name_items(first = "Dave", last = "Grohl")