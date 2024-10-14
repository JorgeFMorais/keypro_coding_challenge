"""
    This file is used to configure the app name for the Django admin panel.
"""
from django.apps import AppConfig


class ApiAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api_app"
