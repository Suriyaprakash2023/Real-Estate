from django.core.files.storage import FileSystemStorage
from django.db import transaction
from django.shortcuts import render
from rest_framework.exceptions import NotFound
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import *
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.
from rest_framework.permissions import AllowAny, IsAuthenticated


class IndexView(APIView):
    def get(self,request):
        return Response({"message": "Welcome to the API"}, status=status.HTTP_200_OK)

class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def post(self,request, *args, **kwargs):
        print("register view")
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
       
        return Response({"message":"ERROR"},serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token = RefreshToken.for_user(user)

            user_groups = user.groups.all()
            groups = None
            if user_groups.filter(name='Seller').exists():
                groups = "Seller"
            elif user.is_superuser:
                groups = "Admin"
            print(user_groups,"is_user.groups")
            user_serializer = UserSerializer(user)
            data = user_serializer.data
            data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
            data["groups"] = groups
            return Response(data, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")
        print(refresh_token,"refresh_token")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # Set the new password
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()

            return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        user = Custom_User.objects.get(email=request.user)
        print(user.profilePicture,"user.profilePicture")
        profile_picture = request.FILES.get('profilePicture')
        if profile_picture is None:
            user.full_name = data['full_name']
            user.mobile_number = data['mobile_number']
            user.city = data['city']
            user.address = data['address']
            user.save()
            return Response(UserSerializer(user).data,status=status.HTTP_200_OK)
        else:
            user.full_name = data['full_name']
            user.mobile_number = data['mobile_number']
            user.city = data['city']
            user.address = data['address']
            user.profilePicture = data['profilePicture']
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

class SellerAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        sellers = Custom_User.objects.filter(groups__name='Seller')

        serializer = SellerSerializer(sellers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        data = request.data
        user = Custom_User.objects.get(email=data['email'])
        user.available = False
        user.save()
        return Response({"message": "User group updated successfully"}, status=status.HTTP_200_OK)

class SellerDetailsAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, id):
        seller_id = Custom_User.objects.get(id=id)
        seller =SellerSerializer(seller_id)
        properties = Properties.objects.filter(seller=seller_id, status='Available').prefetch_related('images')
        properties = PropertiesSerializer(properties,many=True)

        return Response({"properties":properties.data,"seller":seller.data} , status=status.HTTP_200_OK)

    def patch(self, request, id):
        data = request.data
        user = Custom_User.objects.get(id=id)
        user.available = False
        user.save()
        return Response({"message": "User group updated successfully"}, status=status.HTTP_200_OK)


class AddPropertyView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = request.data
        data['seller'] = request.user.id
        print(data['propertyStatus'],"data")
        serializer = PropertiesSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors,"serializer.errors")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPropertyView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        seller = Custom_User.objects.get(email=request.user)
        properties = Properties.objects.filter(seller=seller,status='Available').prefetch_related('images')
        serializer = PropertiesSerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print(request.data,"request.data")
        # Implement the logic for updating the property here
        try:
            user = Custom_User.objects.filter(email=request.user)
            property = Properties.objects.get(id=data['propertyId'])
            # property.soldBy = request.user
            property.status = 'Sold'
            property.soldDate= datetime.now()
            property.save()
            return Response({"message": "Property Sold Successfully.."},status=status.HTTP_200_OK)

        except Properties.DoesNotExist:
            return Response({"error": "Property not found."}, status=status.HTTP_404_NOT_FOUND)

class SoldProperties(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        properties = Properties.objects.filter(status='Sold').prefetch_related('images')
        serializer = PropertiesSerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PropertyView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        properties = Properties.objects.filter(status='Available').prefetch_related('images')
        serializer = PropertiesSerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, property_id):
        property = Properties.objects.get(id=property_id)
        property.delete()
        return Response({"message": "Property deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class PropertyDetails(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, id):
        property = Properties.objects.get(id=id)
        serializer = PropertiesSerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        property = Properties.objects.get(id=id)
        data = request.data
        serializer = PropertiesSerializer(property, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class CustomerRequests(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        current_seller = request.user
        seller_properties = Properties.objects.filter(seller=current_seller)

        current_requests = CustomerRequest.objects.filter(property__in=seller_properties)
        serializer = GetCustomerRequestSerializer(current_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CustomerRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors,"serializer.errors")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecommendedProperty(generics.ListAPIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data
        latitude = data['latitude']
        longitude = data['longitude']
        print(data,"data")
        if request.user.is_authenticated:
            try:
                user = Custom_User.objects.get(email=request.user.email)
                properties = Properties.objects.filter(city=user.city,status='Available')
                serializer = PropertiesSerializer(properties, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Custom_User.DoesNotExist:
                raise NotFound("User not found.")
        elif latitude != None and longitude != None:
            nearby_props = Properties.get_nearby_properties(lat=latitude, lon=longitude,radius=5, limit=3)
            if nearby_props:
                print(nearby_props,"nearby_props")
                serializer = PropertiesSerializer(nearby_props, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:

            properties = Properties.objects.all().order_by('-listed_date')[:3]
            print(properties,"properties")
            serializer = PropertiesSerializer(properties, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

class GuestReview(generics.CreateAPIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        property_id = request.query_params.get('property')

        if property_id is not None:
            print(property_id, "property")
            print(request.query_params, "request.query_params")
            reviews = GuestReviews.objects.filter(property=property_id)
            serializer = GuestReviewSerializer(reviews, many=True)
            print(serializer.data, "serializer.data")
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                seller_instance = Custom_User.objects.get(email=request.user)
                seller_properties_reviews = GuestReviews.objects.filter(property__seller=seller_instance)
                serializer = GetGuestReviewSerializer(seller_properties_reviews, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Custom_User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        data = request.data
        print(data,"data")
        serializer = GuestReviewSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FavoritePropertys(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        favorite_properties = FavoriteProperty.objects.filter(user=user)

        # Create a list of property details
        properties = [favorite_property.property for favorite_property in favorite_properties]

        # Serialize the properties
        serializer = PropertiesSerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data,"request.data['property']")
        user = Custom_User.objects.get(email=request.user)
        property = Properties.objects.get(id=request.data['propertyId'])
        if FavoriteProperty.objects.filter(user=user,property=property).exists():
            print("Property already in favorites")
            return Response({"message": "Property already in favorites"}, status=status.HTTP_200_OK)
        else:
            serializer = FavoritePropertySerializer(data={"user": user.id, "property": property.id})
            serializer.is_valid()
            print(serializer.errors, "serializer.errors")
            serializer.save()
            print(serializer.errors,"serializer.errors")
        return Response({"message": "Property added to favorites"}, status=status.HTTP_201_CREATED)

    def delete(self, request,property_id):
        user = request.user
        # property_id = request.data.get("property_id")
        print(user, "user")
        print(property_id, "property_id")
        try:
            print(property_id,"property_id")
            favorite_property = FavoriteProperty.objects.get(user=user, property__id=property_id)
            favorite_property.delete()
            return Response({"message": "Property removed from favorites"}, status=status.HTTP_204_NO_CONTENT)
        except FavoriteProperty.DoesNotExist:
            return Response({"message": "Property not found in favorites"}, status=status.HTTP_404_NOT_FOUND)

class UserdashInfo(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = Custom_User.objects.get(email=request.user)
        properties = Properties.objects.filter(seller=user)
        total_properties = properties.count()
        total_sold = properties.filter(status='Sold').count()
        total_available = properties.filter(status='Available').count()
        total_reviews = GuestReviews.objects.filter(property__seller=user).count()
        total_favorite = FavoriteProperty.objects.filter(user=user).count()
        return Response({"total_properties": total_properties, "total_sold": total_sold, "total_available": total_available,
                         "total_reviews": total_reviews, "total_favorite": total_favorite}, status=status.HTTP_200_OK)


class AdmindashInfo(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):

        properties = Properties.objects.all()
        total_properties = properties.count()
        total_sold = properties.filter(status='Sold').count()
        total_available = properties.filter(status='Available').count()
        total_reviews = GuestReviews.objects.all().count()
        total_sellers = Custom_User.objects.filter(groups__name='Seller').count()

        return Response({"total_properties": total_properties, "total_sold": total_sold, "total_available": total_available,
                         "total_reviews": total_reviews, "total_sellers": total_sellers}, status=status.HTTP_200_OK)