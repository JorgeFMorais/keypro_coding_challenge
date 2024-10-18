"""
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from api_app import views as api_views

router = routers.DefaultRouter()
router.register(r'poi', api_views.PointOfInterestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', api_views.UserLoginView.as_view(), name='login'),
    path('logout/', api_views.UserLogoutView.as_view(), name='logout'),
    path('register/', api_views.UserRegistrationView.as_view(), name='register'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh')
]
