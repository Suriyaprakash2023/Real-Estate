class student:
    def stdinfo(self):
        self.name=input("Enter student name:")
        self.rollno=int(input("Enter roll number:"))
    def display1(self):
        print("Student name:",self.name,"student rollnumber is:",self.rollno)
class BSCstudent(student):
    def getmark1(self):
        student.stdinfo(self)
        student.display1(self)
        self.p=int(input("enter physics mark:"))
        self.c=int(input("enter chemistry mark:"))
        self.m=int(input("enter maths mark:"))
    def display2(self):
        print("Mark is Subject",self.p,",",self.c,",",self.m)
class BAstudent(student):
    def getmark2(self):
        student.stdinfo(self)
        student.display1(self)
        self.e=int(input("enter english mark:"))
        self.g=int(input("enter geograohy mark:"))
        self.h=int(input("enter history mark:"))
    def display2(self):
        print("Mark is Subject",self.e,",",self.g,",",self.h)
print("enter BSC student Details")
bsc=BSCstudent()
bsc.getmark1()
bsc.display2()
print("enter BA student Details")
ba=BAstudent()
ba.getmark2()
ba.display2()
