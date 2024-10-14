"""
    Django Rest Framework views for the API
"""

from django.contrib.auth.models import User

from rest_framework import permissions, viewsets

from api_app.models import PointOfInterest
from api_app.serializers import PointOfInterestSerializer, UserSerializer

class PointOfInterestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows PointOfInterest to be viewed or edited.
    """
    queryset = PointOfInterest.objects.all().order_by('-created_at')
    serializer_class = PointOfInterestSerializer
    # permission_classes = [permissions.IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
