"""
    Django Rest Framework views for the API
"""
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from rest_framework_simplejwt.tokens import RefreshToken

from .models import PointOfInterest
from .serializers import CustomUserSerializer, PointOfInterestSerializer, UserLoginSerializer, UserRegistrationSerialzer

class PointOfInterestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows PointOfInterest to be viewed or edited.
    """
    queryset = PointOfInterest.objects.all()
    serializer_class = PointOfInterestSerializer

    def perform_update(self, serializer):
        poi = serializer.validated_data
        if poi['user'] != self.request.user:
            raise PermissionDenied("You do not have permission to edit this PointOfInterest")
        return super().perform_update(serializer)
    
    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this PointOfInterest")
        return super().perform_destroy(instance)

class UserRegistrationView(GenericAPIView):
    """
    API endpoint that allows a user to register
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerialzer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['tokens'] = {'refresh': str(token), 'access': str(token.access_token)}
        return Response(data=data, status=status.HTTP_201_CREATED)

class UserLoginView(GenericAPIView):
    """
    API endpoint that allows a user to login
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['tokens'] = {'refresh': str(token), 'access': str(token.access_token)}
        return Response(data=data, status=status.HTTP_200_OK)

class UserLogoutView(GenericAPIView):
    """
    API endpoint that allows a user to logout
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            token = request.data['refresh']
            token = RefreshToken(token)
            token.blacklist()
            request.user.auth_token.delete()
        except AttributeError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_205_RESET_CONTENT)

class UserInfoView(RetrieveAPIView):
    """
    API endpoint that allows a user to view their own information
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user