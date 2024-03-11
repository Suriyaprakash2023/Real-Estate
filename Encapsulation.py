##class encap:
##    def __init__(self,name,age,location):
##        self.name=name88888
##        self.__age=age
##        self._location=location
##    def printing(self):
##        print(self.name,self.__age,self._location)
##e=encap("surya",24,"chennai")
##e.printing()


#name Mangling Method:

##class encap:
##    def __init__(self,name,age,location):
##        self.name=name
##        self.__age=age
##        self._location=location
##e=encap("surya",24,"chennai")
##print(e._encap__age)

#encapsulation + overwriding
##class encap:
##    def __init__(self,name,age,location):
##        self.name=name
##        self.__age=age
##        self._location=location
##    def gettingpro(self):
##        print(self.__age)
##    def overwriting(self,age):
##        self.__age=age
##e=encap("surya",33,"cha")
##e.overwriting(24)
##e.gettingpro()

#class for @property decorator:

class student3:
    def __init__(self,rollno,name,age):
        self.rollno=rollno
        self._name=name
        self.__age=age

        @property
        def name(self):
            print(self._name)
        def name(self,name):
            self._name=name
        @name.setter
        @property
        def name(self):
            del self._name
s3=student3(20,"surya",24)
print(s3._name)
s3.name=76
print(s3.name)
del s3.name


































