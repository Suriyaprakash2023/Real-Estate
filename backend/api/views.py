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
    

class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny)
    queryset = Custom_User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(token),"access": str(token.access_token)}
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.is_valid(raise_exception=True)

            # Get the user instance instead of validated data
            user = serializer.user

            # Now you can pass the user instance to the RefreshToken
            token = RefreshToken.for_user(user)

            # Serialize the user object
            user_serializer = UserSerializer(user)
            data = user_serializer.data

            data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}

            return Response(data, status=status.HTTP_200_OK)

        else:
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
        properties = Properties.objects.filter(seller=seller).prefetch_related('images')
        serializer = PropertiesSerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PropertyView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        properties = Properties.objects.all().prefetch_related('images')
        serializer = PropertiesSerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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

    def delete(self, request, id):
        property = Properties.objects.get(id=id)
        property.delete()
        return Response({"message": "Property deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class CustomerRequest(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        requests = CustomerRequest.objects.all()
        serializer = CustomerRequestSerializer(requests, many=True)
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
                properties = Properties.objects.filter(city=user.city)
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
        print(request.query_params['property'],"request.query_params")
        reviews = GuestReviews.objects.filter(property=request.query_params['property'])
        serializer = GuestReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print(data,"data")
        serializer = GuestReviewSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FavoritePropertys(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = Custom_User.objects.get(email=request.user)
        properties = Properties.objects.filter(favorites=user)
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

    def delete(self, request):
        user = Custom_User.objects.get(email=request.user)
        property = Properties.objects.get(id=request.data['property'])
        user.favorites.remove(property)
        return Response({"message": "Property removed from favorites"}, status=status.HTTP_204_NO_CONTENT)