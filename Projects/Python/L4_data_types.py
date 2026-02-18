#DATA Types Lesson from Youtube video with Dave Gray
import math


#literal assignment - string values
first = "James"
last = "Adams"

print(type(first))
print(type(first) == str) 
print(isinstance(first,str))

#constructor function
pizza = str("Pepperoni")
print(pizza)
print(type(pizza) == str)
print(isinstance(pizza,str))

#cast number to string
decade = str(1990)

#escaping special characters
sentence = 'I\'m a cool dude!\t \n' #\t is a tab and \n is a new line

#string methods
print(first)
print(first.lower()) #lowercase entire string
print(first.upper()) #uppercase string
print(first) #note that these functions don't change the actual value of the variable. Just return an altered version of it.

print(sentence.title()) #Proper case the string
print(sentence.replace("cool","awesome")) #replace the value 'cool' value in the sentence with 'awesome'
print(sentence) #note that even the replace function doesn't change the origin value of the sentence
print(len(sentence)) #print length of sentence

print(len(sentence.strip())) #string all white space
print(len(sentence.rstrip()))
print(len(sentence.lstrip()))

title= "menu".upper()
print(title.center(20, "="))
#outputs: ========MENU========

print("Coffee".ljust(16, ".") + "$1".rjust(4))
print("Muffin".ljust(16, ".") + "$2".rjust(4))
print("Cheesecake".ljust(16, ".") + "$4".rjust(4))

#string index values
print(first[0]) 
print(first[-1]) #Last value in string with -1... interesting
print(first[1:-1]) #Range does NOT include the final value of the range
print(first[1:]) #this will return the range including the final value

print(first.startswith("J"))
print(first.endswith("Z"))

#BOOLEANS
myVal = True #Capital T for true and F for false
x = bool(False)
print(type(x))

#NUMERIC DATA TYPES
#INT
price = 100
best_price = int(90)

#float
decimal_price = 100.00
print(type(decimal_price))

#complex type
compValue = 5+3j
print(type(compValue))
print(compValue.real)
print(compValue.imag)

#no longs, doubles, or uint


#Built in function for numbers
print(abs(price))

#MATH MODULE FUNCTIONS --Requires import of Math module at top of file
print(math.pi)
print(math.sqrt(144))

#CAST STRING TO NUMBER
zipcode = "10001"
zipVal = int(zipcode)
print(type(zipVal))

# ERROR IF YOU ATTEMPT TO CAST INCORRECT DATA!!!
#zipVal = int("New York City")
#print(zipVal)