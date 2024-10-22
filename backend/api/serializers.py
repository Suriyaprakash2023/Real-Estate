from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class ContactSerializer(serializers.ModelSerializer):
  class Meta:
    model = Contact
    exclude = ["created_at"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Custom_User
        fields = ('email', 'mobile_number', 'password')

    def create(self, validated_data):
        user = Custom_User.objects.create_user(
            email=validated_data['email'],
            mobile_number=validated_data['mobile_number'],
            password=validated_data['password'],
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        return data
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_User
        fields = ("mobile_number", "email","full_name")

class PropertiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Properties
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    profilePicture = serializers.ImageField(required=False)

    class Meta:
        model = Custom_User
        fields = ("mobile_number", "full_name", "profilePicture", "address", "city")

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs):
        user = self.context['request'].user
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        # Check if new passwords match
        if new_password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "New passwords do not match"})

        # Validate the new password against Django's built-in validators
        try:
            validate_password(new_password, user)
        except ValidationError as e:
            raise serializers.ValidationError({"new_password": e.messages})

        return attrs

class GetFavoritePropertySerializer(serializers.ModelSerializer):
    property = PropertiesSerializer(many=True, read_only=True)
    class Meta:
        model = FavoriteProperty
        fields = ['user','property']




class FavoritePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteProperty
        fields = ['user', 'property']

class GuestReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestReviews
        fields = ['name', 'email', 'message','rating', 'property','created_at']
        extra_kwargs = {
            'created_at': {'read_only': True}  # Make created_at read-only
        }

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['image1', 'image2', 'image3', 'image4', 'image5']



class PropertiesSerializer(serializers.ModelSerializer):
    # Images will be passed in as part of the request data
    image1 = serializers.ImageField(write_only=True, required=False)
    image2 = serializers.ImageField(write_only=True, required=False)
    image3 = serializers.ImageField(write_only=True, required=False)
    image4 = serializers.ImageField(write_only=True, required=False)
    image5 = serializers.ImageField(write_only=True, required=False)

    images = PropertyImageSerializer(many=True, read_only=True)
    seller = UserSerializer(read_only=True)
    reviews = GuestReviewSerializer(many=True, read_only=True)
    favorite_property = FavoritePropertySerializer(many=True, read_only=True)
    class Meta:
        model = Properties
        fields = ['id', 'title', 'description', 'price', 'address', 'city', 'state', 'zipCode', 'country','reviews',
                  'latitude', 'longitude', 'locations', 'propertyType', 'bedrooms', 'bathrooms', 'garages',
                  'totalSqft', 'propertySqft', 'yearBuilt', 'propertyStatus','virtual_tour_bg', 'virtual_tour_url',
                  'favorite_property','floorPlan','document1', 'document2', 'features', 'status', 'listed_date', 'taxes',
                  'financing_options','nearbySchool', 'nearbyUniversity', 'nearbyGrocery', 'nearbyMarket',
                  'nearbyHospital', 'nearbyMetro', 'nearbyGym', 'nearbyPark', 'seller', 'agent', 'soldBy', 'soldDate',
                  'images', 'image1', 'image2', 'image3', 'image4', 'image5',]

    def create(self, validated_data):
        image1 = validated_data.pop('image1', None)
        image2 = validated_data.pop('image2', None)
        image3 = validated_data.pop('image3', None)
        image4 = validated_data.pop('image4', None)
        image5 = validated_data.pop('image5', None)

        property_instance = Properties.objects.create(**validated_data)

        if image1 or image2 or image3 or image4 or image5:
            PropertyImage.objects.create(
                property=property_instance,
                image1=image1,
                image2=image2,
                image3=image3,
                image4=image4,
                image5=image5
            )

        return property_instance


class CustomerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerRequest
        fields = ['full_name','phone_number', 'email', 'message', 'property']


