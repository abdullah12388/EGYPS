from django.urls import path
from .views import *

urlpatterns = [
    path('', Welcome, name='Welcome'),
    path('Nozzles/', Nozzles, name='Nozzles'),
    path('Nozzles/Gas95/Up/', NozzlesGas95UpApi, name='NozzlesGas95UpApi'),
    path('POS/', POS, name='POS'),
    path('Prices/', Prices, name='Prices'),
    path('Tanks/', Tanks, name='Tanks'),
    path('Tanks/Delivery/Socket/', TankDeliverySocket, name='TankDeliverySocket'),
    path('Wetstock/', Wetstock, name='Wetstock'),
    path('Ads/', Ads, name='Ads'),
]
