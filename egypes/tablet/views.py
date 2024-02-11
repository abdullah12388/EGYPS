import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import *

# Create your views here.

def Welcome(request):
    return HttpResponseRedirect('/tablet/Nozzles/')

def Nozzles(request):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'nozzles',
                }
            )
        }
    )
    return render(request, 'Nozzles.html', {'room_name': 'broadcast'})

def NozzlesGas95UpApi(request):
    if request.GET:
        print(request.GET)
        nozzle_product = request.GET.get('nozzle')
        nozzle_unit = request.GET.get('unit')
        nozzle_amount = request.GET.get('amount')
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notification_broadcast",
            {
                'type': 'send_notification',
                'message': json.dumps(
                    {
                        'nozzle': nozzle_product,
                        'unit': nozzle_unit,
                        'amount': nozzle_amount,
                    }
                )
            }
        )
        return JsonResponse(data={'status': 'Done'}, safe=False)

def POS(request):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'pos',
                }
            )
        }
    )
    return render(request, 'POS.html', {'room_name': 'broadcast'})

def Prices(request):
    if request.GET:
        gas95 = request.GET.get('gas95', None)
        gas92 = request.GET.get('gas92', None)
        diesel = request.GET.get('diesel', None)
        cng = request.GET.get('cng', None)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notification_broadcast",
            {
                'type': 'send_notification',
                'message': json.dumps(
                    {
                        'type': 'prices',
                        'action': 'change',
                        'gas95': gas95,
                        'gas92': gas92,
                        'diesel': diesel,
                        'cng': cng,
                    }
                )
            }
        )
        Price.objects.create(
            gas95=gas95,
            gas92=gas92,
            diesel=diesel,
            cng=cng
        )
        return JsonResponse(data={'status': 'Done'}, safe=True)
    prices = Price.objects.all().last()
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'prices',
                    'action': 'open',
                }
            )
        }
    )
    context = {
        'room_name': 'broadcast',
        'gas95': prices.gas95,
        'gas92': prices.gas92,
        'diesel': prices.diesel,
        'cng': prices.cng,
    }
    return render(request, 'Prices.html', context)

def Tanks(request):
    if request.GET:
        capacity = request.GET.get('capacity', None)
        amount = request.GET.get('amount', None)
        product = request.GET.get('product', None)
        delivery = request.GET.get('delivery', None)
        action = request.GET.get('action', None)
        if action == 'details':
            tank = Tank.objects.get(product=product)
            tank.capacity = capacity
            tank.amount = amount
            tank.save()
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "notification_broadcast",
                {
                    'type': 'send_notification',
                    'message': json.dumps(
                        {
                            'type': 'tanks',
                            'action': 'change',
                            'location': 'details',
                            'product': product,
                            'capacity': capacity,
                            'amount': amount,
                        }
                    )
                }
            )
            return JsonResponse(data={'status': 'Done'}, safe=False)
        if action == 'delivery':
            tank = Tank.objects.get(product=product)
            delivery_obj = Delivery.objects.create(amount=delivery.split('%')[0])
            tank.delivery.add(delivery_obj)
            tank.amount = float(tank.amount) + float(delivery_obj.amount)
            tank.save()
            return JsonResponse(data={'status': 'Done'}, safe=False)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'tanks',
                    'action': 'open',
                }
            )
        }
    )
    tanks = Tank.objects.all()
    capacity95 = tanks.get(product=95).capacity
    amount95 = tanks.get(product=95).amount
    capacity92 = tanks.get(product=92).capacity
    amount92 = tanks.get(product=92).amount
    context = {
        'room_name': 'broadcast',
        'capacity95': capacity95,
        'amount95': amount95,
        'fuel95': 100-(((amount95)*100)/capacity95),
        'precentage95': format((((amount95)*100)/capacity95), '0.2f'),
        
        'capacity92': capacity92,
        'amount92': amount92,
        'fuel92': 100-(((amount92)*100)/capacity92),
        'precentage92': format((((amount92)*100)/capacity92), '0.2f'),
    }
    return render(request, 'Tanks.html', context)


def TankDeliverySocket(request):
    if request.GET:
        amount = request.GET.get('amount', None)
        product = request.GET.get('product', None)
        delivery = request.GET.get('delivery', None)
        action = request.GET.get('action', None)
        if action == 'delivery':
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "notification_broadcast",
                {
                    'type': 'send_notification',
                    'message': json.dumps(
                        {
                            'type': 'tanks',
                            'action': 'change',
                            'location': 'delivery',
                            'product': product,
                            'delivery': delivery,
                            'amount': amount,
                        }
                    )
                }
            )
        return JsonResponse(data={'status': 'Done'}, safe=False)

def Wetstock(request):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'wetstock',
                }
            )
        }
    )
    return render(request, 'Wetstock.html', {'room_name': 'broadcast'})

def Ads(request):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'ads',
                }
            )
        }
    )
    return render(request, 'Ads.html', {'room_name': 'broadcast'})