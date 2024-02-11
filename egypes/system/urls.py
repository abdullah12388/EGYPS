from django.urls import path
from .views import *
# from django.views.static import serve

urlpatterns = [
    path('', Home, name='home'),
]
