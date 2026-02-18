##Dictionaries
band = {
    "vocals": "Plant",
    "guitar": "Page"
}

band2 = dict(vocals="Plant",guitar = "Page")

#print(band)
#print(band2)
#print(len(band))
#print(type(band))

##Access items in dictionary
#print(band["vocals"])
#print(band.get("guitar"))

##list all keys
#print(band.keys())

##list values
#print(band.values())

##print key-value pairs as tuples
#print(band.items())

##verify if key exists
#print("guitar" in band)
#print("cowbell" in band)

##Change values in dictionary
#band["vocals"] = "Morrison"
#band.update({"guitar","Townsend"})

##Add pair to dict
#band.update({"bass": "JPJ"})

##Remove items 
#band.pop("bass")
#print(band)
#band.popitem() #removes last item

##Delete clear items
#del band["guitar"]
#print(band)

##Empty entire band
#band2.clear()
#del band2

##Copy dict
#band2 = band #creates a reference not a new space in memory - Don't do this.
#band2 = band.copy() #proper way to generate a copy!
##Use dict constructor to copy dict
#band3 = dict(band)

##Nested dictionaries
# member1 = {
#     "Name" : "James",
#     "Instrument": "Cowbell"
# }

# member2 = {
#     "Name" : "Grohl",
#     "Instrument": "Guitar"
# }

# band = {
#     "Member1" : member1,
#     "Member2" : member2
# }

# #Go deeper to get values
# print(band["Member1"]["Name"])


#####SETS########

nums = {1,2,3,4}
nums2 = set((1,2,3,4))

# print(nums)
# print(nums2)
# print(type(nums))
# print(len(nums))

# #no duplicates are allowed
# nums3 = {1,2,2,4}
# print(nums3)
# #FYI - True is a duplicate of 1, and False a duplicate of 0

#Check if value is in set
#print(2 in nums)
#but you cannot refer to an element in the set with index or key

#Add new element to set
#nums.add(5)

# #Add elements from one set to another
# nums.update(nums2)
# print(nums)
#you can use update with lists, tuples, and dictionaries as well

# #Merge two sets to create new set
# one = {1,2,3}
# two = {4,5,6}
# newSet = one.union(two)
# print(newSet)

# one = {1,2,3}
# two = {2,3,6}
# #Keep duplicates from
# one.intersection_update(two)
# print(one)

# one = {1,2,3}
# two = {2,5,1}
# #Keep only the unique values (no duplicates)
# one.symmetric_difference_update(two)
# print(one)