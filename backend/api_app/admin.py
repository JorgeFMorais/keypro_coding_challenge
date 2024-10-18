from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm
from .models import PointOfInterest, CustomUser

@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    model = CustomUser

# Register your models here.
admin.site.register(PointOfInterest)
