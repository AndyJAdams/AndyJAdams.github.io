import random
from enum import Enum

class RPS(Enum):
    ROCK = 1
    PAPER = 2
    SCISSORS = 3

print('')

while True:
    player_choice = input("Enter...\n1 for rock\n2 for paper\n or\n3 for scissors:\n\n")
    try:
        number = int(player_choice)
        cpuChoice = random.choice("123")

        if number == 1 or number == 2 or number == 3:
            cpu = int(cpuChoice)
            print("You chose " + str(RPS(number)).replace("RPS.","") + ".")
            print("CPU chose " + str(RPS(cpu)).replace("RPS.","") + ".")
            
            if number == 1 and cpu == 3:
                print("You win!")
            elif number == 2 and cpu == 1:
                print("You win!")
            elif number == 3 and cpu == 2:
                print("You win!")
            elif number == cpu:
                print("It's a tie")
            else:
                print("CPU wins.")
            
            break # Exit the loop if the condition to stop is met
    except ValueError:
        print("Invalid input. Please enter a number.")