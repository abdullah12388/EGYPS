from datetime import datetime
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
    transactions = Transaction.objects.all().order_by('-id')
    t_total = 0
    for t in transactions:
        t_total += t.total
    context = {
        'room_name': 'broadcast',
        
        'gas95': prices.gas95,
        'gas92': prices.gas92,
        'diesel': prices.diesel,
        'cng': prices.cng,
        
        'amount95': format(tanks.get(product=95).amount, '0.2f'),
        'precentage95': format(((tanks.get(product=95).amount*100)/tanks.get(product=95).capacity), '0.2f'),
        
        'amount92': format(tanks.get(product=92).amount, '0.2f'),
        'precentage92': format(((tanks.get(product=92).amount*100)/tanks.get(product=92).capacity), '0.2f'),
        
        'transactions': transactions.filter(status=False),
        't_count': transactions.count(),
        't_total': t_total,
        'pos_datetime': datetime.now(),
    }
    return render(request, 'Home.html', context)
