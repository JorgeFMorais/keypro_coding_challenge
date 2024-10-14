"""
    Serializers for the API
"""

from django.contrib.auth.models import User

from rest_framework import serializers

from api_app.models import PointOfInterest

class PointOfInterestSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the PointOfInterest model """
    lat = serializers.SerializerMethodField()
    lon = serializers.SerializerMethodField()

    class Meta:
        model = PointOfInterest
        fields = ['id', 'name', 'description', 'lat', 'lon', 'created_at']

    def get_lat(self, obj):
        return obj.point.y  # Latitude is stored as y in PointField

    def get_lon(self, obj):
        return obj.point.x  # Longitude is stored as x in PointField

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the User model """
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']
