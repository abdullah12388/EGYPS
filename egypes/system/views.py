import json
import os
from django.shortcuts import render
from tablet.models import *
from django.http import JsonResponse, HttpResponseRedirect
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Create your views here.

def Home(request):
    prices = Price.objects.all().last()
    tanks = Tank.objects.all()
    context = {
        'room_name': 'broadcast',
        
        'gas95': prices.gas95,
        'gas92': prices.gas92,
        'diesel': prices.diesel,
        'cng': prices.cng,
        
        'amount95': tanks.get(product=95).amount,
        'precentage95': format(((tanks.get(product=95).amount*100)/tanks.get(product=95).capacity), '0.2f'),
        
        'amount92': tanks.get(product=92).amount,
        'precentage92': format(((tanks.get(product=92).amount*100)/tanks.get(product=92).capacity), '0.2f'),
    }
    return render(request, 'Home.html', context)
