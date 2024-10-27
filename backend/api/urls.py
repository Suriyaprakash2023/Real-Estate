from django.contrib import admin
from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path('',IndexView.as_view(),name="index"),
    path('contact',ContactListCreateView.as_view(),name="contact"),
    path('user/',UserDetailView.as_view(),name="user"),
    path('sellers/', SellerDetailView.as_view(), name="sellers"),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('add_property/', AddPropertyView.as_view(), name='add_property'),
    path('my_properties/', UserPropertyView.as_view(), name='my_properties'),
    path('my_properties/<int:property_id>/', UserPropertyView.as_view(), name='my_properties_delete'),
    path('sold_properties/', SoldProperties.as_view(), name='sold_properties'),
    path('properties/', PropertyView.as_view(), name='properties'),
    path('property_details/<str:id>/', PropertyDetails.as_view(), name='property_details'),
    path('customer_request/', CustomerRequests.as_view(), name='customer_request'),
    path('recommended_property/', RecommendedProperty.as_view(), name='recommended_property'),
    path('guest_review/', GuestReview.as_view(), name='guest_review'),
    path('favorite_property/', FavoritePropertys.as_view(), name='favorite_property'),
    path('userdash_info/', UserdashInfo.as_view(), name='userdash_info'),
    path('favorite_property/<int:property_id>/', FavoritePropertys.as_view(), name='favorite_property_delete'),
    # for DELETE






]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

