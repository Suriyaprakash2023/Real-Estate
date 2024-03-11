class parent:
    def __init__(self,p_name,p_age,p_location):
        self.p_name=p_name
        self.p_age=p_age
        self.p_location=p_location
    def parentinfo(self):
         print("name=",self.p_name \n "age="self.p_age,\n"location=",self.p_location)
class child(parent):
    def __init__(self,p_name,p_age,p_location,c_name,c_age,c_location):
        parent.__init__(self,p_name,p_age,p_location)
        parent.parentinfo(self)
        self.c_name=c_name
        self.c_age=c_age
        self.c_location=c_location
    def childinfo(self):
        print("name="self.c_name,\n " age=",self.c_age ,\n  "location=",self.c_location)
p_name=input("enter your parent name")
p_age=int(input("enter your parent age"))
p_location=input("enter your parent location")
c_name=input("enter your child name")
c_age=int(input("enter your child age"))
c_location=input("enter your child location")
s=child(p_name,p_age,p_location,c_name,c_age,c_location)
s.childinfo()
