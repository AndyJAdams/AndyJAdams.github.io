users = ['Bob', 'John', 'Sarah']

#print('Bob' in users)

#print(users[0])
#print(users[-1])

#print(users.index('Bob'))

#print(users[0:2])

#print(users[0:])

#print(len(users))

#users.append('Elsa')
#print(users)

users += ['Carl','Mark']
#print(users)

users.extend(['Jim','Sven'])
#print(users)

#TUPLES
mytuple = tuple(('Bob',13,False))
anotherTuple = (1,4,5,2,6)

print(mytuple)
print(type(anotherTuple))

(one,two,*hey) = anotherTuple