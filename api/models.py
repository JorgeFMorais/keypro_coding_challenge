from django.contrib.auth.models import User
from django.contrib.gis.db import models as gis_models
from django.db import models

# Create your models here.
class PointOfInterest(models.Model):
    """ Model to represent a point of interest """
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name='points_of_interest', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    point = gis_models.PointField()
    created_at = models.DateTimeField(auto_now_add=True)
