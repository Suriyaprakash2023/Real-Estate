##class branch1:
##    def __init__(self,branchname1,branchcode1):
##        self.bn1=branchname1
##        self.bc1=branchcode1
##    def printing1(self):
##        print("The branch name is",self.bn1,"its code",self.bc1)
##class branch2:
##    def __init__(self,branchname2,branchcode2):
##        self.bn2=branchname2
##        self.bc2=branchcode2
##    def printing2(self):
##        print("The branch name is",self.bn2,"its code",self.bc2)
##class headquaters(branch1,branch2):
##    def __init__(self,branchname1,branchcode1,branchname2,branchcode2,headquatername): 
##        self.hdq=headquatername
##        branch1.__init__(self,branchname1,branchcode1)
##        branch1.printing1(self)
##        branch2.__init__(self,branchname2,branchcode2)
##        branch2.printing2(self)
##    def final(self):
##        print("the headquaters name is ",self.hdq)
##obj=headquaters("chennai",24,"bangeloure",35,"hydrabad")
##obj.final()

"""--------------------------------------------------------------------------------------------------------------------------------------------"""
class father:
    def __init__(self,f_name,f_age,f_location):
        self.f_name=f_name
        self.f_age=f_age
        self.f_location=f_location
    def display1(self):
        print("Father name is",self.f_name,"he age is",self.f_age,"he location is",self.f_location)
class mother:
    def __init__(self,m_name,m_age,m_location):
        self.m_name=m_name
        self.m_age=m_age
        self.m_location=m_location
    def display2(self):
        print("Father name is",self.m_name,"he age is",self.m_age,"he location is",self.m_location)
class child(father,mother):
    def __init__(self,f_name,f_age,f_location,m_name,m_age,m_location,c_name,c_age,c_location):
        father.__init__(self,f_name,f_age,f_location)
        father.display1(self)
        mother.__init__(self,m_name,m_age,m_location)
        mother.display2(self)
        self.c_name=c_name
        self.c_age=c_age
        self.c_location=c_location
    def display3(self):
            print("child name is",self.c_name,"he age is",self.c_age,"he location is",self.c_location)
f_name=input("enter father name:")
f_age=int(input("enter father age:"))
f_location=input("enter father location:")
m_name=input("enter mother name:")
m_age=int(input("enter mother age:"))
m_location=input("enter mother location:")
c_name=input("enter child name:")
c_age=int(input("enter child age:"))
c_location=input("enter child location:")
obj=child(f_name,f_age,f_location,m_name,m_age,m_location,c_name,c_age,c_location)
obj.display3()





















































        
