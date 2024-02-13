from django.urls import path
from .views import *

urlpatterns = [
    path('', Welcome, name='Welcome'),
    path('Nozzles/', Nozzles, name='Nozzles'),
    path('Nozzles/Up/Socket/', NozzlesUpSocket, name='NozzlesUpSocket'),
    path('Nozzles/Down/Socket/', NozzlesDownSocket, name='NozzlesDownSocket'),
    path('POS/', POS, name='POS'),
    path('POS/Socket/', POSSocket, name='POSSocket'),
    path('Prices/', Prices, name='Prices'),
    path('Tanks/', Tanks, name='Tanks'),
    path('Tanks/Delivery/Socket/', TankDeliverySocket, name='TankDeliverySocket'),
    path('Wetstock/', Wetstock, name='Wetstock'),
    path('Wetstock/Socket/', WetstockSocket, name='WetstockSocket'),
    path('Ads/', Ads, name='Ads'),
]
