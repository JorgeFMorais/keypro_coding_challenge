"""
    This file contains the models for the API. 
"""
from django.contrib.auth.models import AbstractUser
from django.contrib.gis.db import models as gis_models
from django.db import models


class CustomUser(AbstractUser):
    """ Model to represent a users"""
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["username"]

    email = models.EmailField(unique=True)


class PointOfInterest(models.Model):
    """ Model to represent a point of interest """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, related_name='points_of_interest', on_delete=models.CASCADE)
    point = gis_models.PointField()
