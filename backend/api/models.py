from django.db import models
import random
import string
from datetime import datetime

from django.contrib.auth.models import Group, AbstractUser
from django.db import models, connection
from math import radians, sin, cos, sqrt, atan2
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import BaseUserManager



class AlphaNumericFieldfive(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs["max_length"] = 5  # Set fixed max_length for alphanumeric field
        super().__init__(*args, **kwargs)

    @staticmethod
    def generate_alphanumeric():
        alphanumeric = "".join(
            random.choices(string.ascii_letters + string.digits, k=5)
        )
        return alphanumeric.upper()


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class Custom_User(AbstractUser):
    objects = CustomUserManager()

    # Fields as per your Firestore structure
    username = None
    last_name = None

    email = models.EmailField(_("email address"), unique=True)
    full_name = models.CharField(max_length=255, null=True, blank=True)
    mobile_number = models.CharField(max_length=15, null=True, blank=True)
    referral_code = AlphaNumericFieldfive(unique=True, null=True, blank=True)
    profilePicture = models.ImageField(upload_to='profile_picture/', blank=True, null=True)
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    # def __str__(self):
    #     return self.email

    def save(self, *args, **kwargs):
        if not self.referral_code:
            self.referral_code = AlphaNumericFieldfive.generate_alphanumeric()
            while Custom_User.objects.filter(
                referral_code=self.referral_code
            ).exists():
                self.referral_code = AlphaNumericFieldfive.generate_alphanumeric()
        super(Custom_User, self).save(*args, **kwargs)


groups = [
    "Admin",
    "Agents",
    "User",
    "Seller"
    
]

from django.db.models.signals import post_migrate
from django.dispatch import receiver


@receiver(post_migrate)
def create_groups(sender, **kwargs):
    with connection.cursor() as cursor:
        table_names = connection.introspection.table_names(cursor)
        if "auth_group" in table_names:
            for group_name in groups:
                Group.objects.get_or_create(name=group_name)
        else:
            print("auth_group table does not exist, skipping group creation.")





class Agents(models.Model):
    user = models.ForeignKey(Custom_User, verbose_name=_("agent"), on_delete=models.CASCADE)
    licenseNumber = AlphaNumericFieldfive(unique=True, null=True, blank=True)

    def current_properties(self):
        return self.properties.filter(status='available').count()

    # Method to count properties sold by the agent
    def properties_sold(self):
        return self.sold_properties.count()


class Contact(models.Model):
    name = models.CharField(max_length=100,null=True,blank=True)
    email = models.EmailField(null=True,blank=True)
    mobile_number = models.CharField(max_length=15,blank=True,null=True)
    message = models.TextField(null=True,blank=True)
    subject = models.CharField(max_length=200,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True,blank=True)


class Properties(models.Model):

    title = models.CharField(max_length=255,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    address = models.CharField(max_length=255,null=True, blank=True)
    city = models.CharField(max_length=100,null=True, blank=True)
    state = models.CharField(max_length=100,null=True, blank=True)
    zipCode = models.CharField(max_length=20,null=True, blank=True)
    country = models.CharField(max_length=100,null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    locations = models.CharField(max_length=50,blank=True, null=True)
    propertyType = models.CharField(max_length=50, null=True, blank=True)
    bedrooms = models.PositiveIntegerField(null=True, blank=True)
    bathrooms = models.PositiveIntegerField(null=True, blank=True)
    garages = models.PositiveIntegerField(null=True, blank=True)
    totalSqft = models.PositiveIntegerField(null=True, blank=True)
    propertySqft = models.PositiveIntegerField(null=True, blank=True)
    yearBuilt = models.CharField(max_length=50,blank=True, null=True)
    propertyStatus = models.CharField(max_length=50, null=True, blank=True)
    virtual_tour_url = models.CharField(max_length=50, null=True, blank=True)
    virtual_tour_bg = models.ImageField(upload_to='virtual_tour_bg/',null=True, blank=True)
    # images = models.JSONField(default=list, null=True, blank=True)  # List of image URLs
    floorPlan = models.ImageField(upload_to='floorplans/',null=True, blank=True)
    document1 = models.FileField(upload_to='documents/',null=True, blank=True)
    document2 = models.FileField(upload_to='documents/',null=True, blank=True )
    features = models.JSONField(default=list, null=True, blank=True)  # List of features

    status = models.CharField(max_length=20, default='Available', null=True, blank=True)  # e.g., Available, Under Contract, Sold
    listed_date = models.DateField(auto_now_add=True, null=True, blank=True)
    taxes = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    financing_options = models.JSONField(default=list)  # List of financing options
    nearbySchool = models.CharField(max_length=10, blank=True, null=True)
    nearbyUniversity = models.CharField(max_length=10, blank=True, null=True)
    nearbyGrocery = models.CharField(max_length=10, blank=True, null=True)
    nearbyMarket = models.CharField(max_length=10, blank=True, null=True)
    nearbyHospital = models.CharField(max_length=10, blank=True, null=True)
    nearbyMetro = models.CharField(max_length=10, blank=True, null=True)
    nearbyGym = models.CharField(max_length=10, blank=True, null=True)
    nearbyPark = models.CharField(max_length=10, blank=True, null=True)

    seller = models.ForeignKey(Custom_User, related_name='properties', on_delete=models.CASCADE, null=True, blank=True)

    agent = models.ForeignKey('Agents', related_name='properties', on_delete=models.CASCADE, null=True, blank=True)  # Current handling agent
    soldBy = models.ForeignKey('Agents', related_name='sold_properties', on_delete=models.SET_NULL, null=True, blank=True)  # Agent who sold the property

     # Timestamps
    soldDate = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return self.title

    @staticmethod
    def get_nearby_properties(lat, lon, radius=5, limit=3):
        R = 6371.0  # Radius of the Earth in kilometers
        properties_with_distance = []

        for property in Properties.objects.all():
            # Haversine formula
            lat1 = radians(lat)
            lon1 = radians(lon)
            lat2 = radians(property.latitude)
            lon2 = radians(property.longitude)

            dlon = lon2 - lon1
            dlat = lat2 - lat1

            a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
            c = 2 * atan2(sqrt(a), sqrt(1 - a))
            distance = R * c  # Distance in kilometers

            properties_with_distance.append((property, distance))

        # Sort properties by distance and limit to the specified number
        nearest_properties = sorted(properties_with_distance, key=lambda x: x[1])[:limit]

        return [prop[0] for prop in nearest_properties]


class PropertyImage(models.Model):
    property = models.ForeignKey(Properties, related_name='images', on_delete=models.CASCADE)
    image1 = models.ImageField(upload_to='property_images/', null=True, blank=True)
    image2 = models.ImageField(upload_to='property_images/', null=True, blank=True)
    image3 = models.ImageField(upload_to='property_images/', null=True, blank=True)
    image4 = models.ImageField(upload_to='property_images/', null=True, blank=True)
    image5 = models.ImageField(upload_to='property_images/', null=True, blank=True)


class CustomerRequest(models.Model):
    property = models.ForeignKey(Properties, related_name='customer_requests', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.full_name+ " - " + self.property.title

class GuestReviews(models.Model):
    property = models.ForeignKey(Properties, related_name='reviews', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    rating = models.PositiveIntegerField(default=0,null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.property.title + " - " + self.name


class FavoriteProperty(models.Model):
    user = models.ForeignKey(Custom_User, on_delete=models.CASCADE, related_name='favorite_properties')
    property = models.ForeignKey(Properties, on_delete=models.CASCADE, related_name='favorited_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'property')  # To ensure a property is favorited only once by a user

    def __str__(self):
        return {self.user.full_name} + " - " + {self.property.title}