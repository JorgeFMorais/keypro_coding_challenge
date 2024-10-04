from django.contrib.auth.models import User

from rest_framework import serializers

from api.models import PointOfInterest

class PointOfInterestSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the PointOfInterest model """
    class Meta:
        model = PointOfInterest
        fields = ['name', 'description', 'point', 'created_at']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the User model """
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']
