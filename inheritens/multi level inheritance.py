class primary:
    def __init__(self,name,mark1):
            self.n=name
            self.m1=mark1
    def display1(self):
            print("Name is",self.n,"Mark is",self.m1)
class secondary:
        def __init__(self,name,mark1,mark2):
            primary.__init__(self,name,mark1)
            primary.display1(self)
            self.m2=mark2
        def display2(self):
             print("Name is",self.n,"Mark is",self.m2)
class degree(secondary):
        def __init__(self,name,mark1,mark2,mark3):
                secondary.__init__(self,name,mark1,mark2)
                secondary.display2(self)
                self.m3=mark3
        def final(self):
              print("Name is",self.n,"Mark is",self.m3)
obj=degree("s",87,90,95)
obj.final()
    
        
        
