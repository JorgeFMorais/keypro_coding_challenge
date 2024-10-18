"""
    Serializers for the API
"""

from django.contrib.auth import authenticate

from rest_framework import serializers

from .models import CustomUser, PointOfInterest


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']

class UserRegistrationSerialzer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password1', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        return CustomUser.objects.create_user(password=password, **validated_data)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

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
