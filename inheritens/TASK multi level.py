class flipcard:
    def __init__(self,mobile,shirt):
        self.mob=mobile
        self.shirt=shirt
    def view1(self):
        print("Your purchase things in flipcard is:",self.mob,"&",self.shirt)
class amazon(flipcard):
    def __init__(self,laptop,bag):
        self.laptop=laptop
        self.bag=bag
    def view2(self):
        print("Your purchase things in amazon is:",self.laptop,"&",self.bag)
class total(amazon):
    def  __init__(self,mobile,shirt,laptop,bag,product):
            flipcard.__init__(self,mobile,shirt)
            flipcard.view1(self)
            amazon.__init__(self,laptop,bag)
            amazon.view2(self)
            self.p=product
    def final(self):
        print("your total product is:",self.p)
obj=total("nokia","tshirt","dell","laptopbag",4)
obj.final()
