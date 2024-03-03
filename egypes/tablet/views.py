from datetime import datetime
import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import *
import pyautogui
# Create your views here.

def Welcome(request):
    return HttpResponseRedirect('/tablet/Nozzles/')

def Nozzles(request):
    prices = Price.objects.last()
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'nozzles',
                    'action': 'open',
                }
            )
        }
    )
    context = {
        'room_name': 'broadcast',
        'gas95': prices.gas95,
        'gas92': prices.gas92,
    }
    return render(request, 'Nozzles.html', context)

def NozzlesUpSocket(request):
    if request.GET:
        # print(request.GET)
        product = request.GET.get('product', None)
        total = request.GET.get('total', None)
        amount = request.GET.get('amount', None)
        unit = request.GET.get('unit', None)
        status = request.GET.get('status', None)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notification_broadcast",
            {
                'type': 'send_notification',
                'message': json.dumps(
                    {
                        'type': 'nozzles',
                        'action': 'change',
                        'product': product,
                        'total': total,
                        'amount': amount,
                        'unit': unit,
                        'status': status,
                    }
                )
            }
        )
        return JsonResponse(data={'status': 'Done'}, safe=False)

def NozzlesDownSocket(request):
    if request.GET:
        # print(request.GET)
        product = request.GET.get('product', None)
        total = request.GET.get('total', None)
        amount = request.GET.get('amount', None)
        unit = request.GET.get('unit', None)
        status = request.GET.get('status', None)
        # create sale
        sale_obj = Sale.objects.create(amount=amount)
        # minus the tank amount
        tank_obj = Tank.objects.get(product=product)
        tank_obj.sale.add(sale_obj)
        tank_obj.amount = float(tank_obj.amount) - float(amount)
        tank_obj.save()
        # create transaction
        transaction_obj = Transaction.objects.create(
            product = int(product),
            total = float(total),
            amount = float(amount),
            unit = float(unit),
            sale = sale_obj,
            status=False,
        )
        
        # send data on socket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notification_broadcast",
            {
                'type': 'send_notification',
                'message': json.dumps(
                    {
                        'type': 'nozzles',
                        'action': 'change',
                        'product': product,
                        'total': total,
                        'amount': amount,
                        'unit': unit,
                        'status': status,
                        
                        'transaction_id': transaction_obj.id,
                        'sale_id': sale_obj.id,
                        'transaction_date': date_formatter(transaction_obj.date),
                        'transaction_time': time_formatter(transaction_obj.time),
                    }
                )
            }
        )
        return JsonResponse(data={'status': 'Done'}, safe=False)


def date_formatter(date):
    formatted_date = date.strftime("%m-%d-%Y")
    return formatted_date

def time_formatter(time):
    formatted_time = time.strftime("%I:%M %p")
    return formatted_time

def POS(request):
    if request.GET:
        pay_tid = request.GET.get('pay_tid', None)
        transaction = Transaction.objects.get(id=pay_tid)
        transaction.status = True
        transaction.save()
        return  JsonResponse(data={'status': 'Done'}, safe=False)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps(
                {
                    'type': 'pos',
                    'action': 'open',
                }
            )
        }
    )
    transactions = Transaction.objects.all().order_by('-id')
    t_total = 0
    for t in transactions:
        t_total += t.total
    context = {
        'room_name': 'broadcast',
        'transactions': transactions.filter(status=False),
        't_count': transactions.count(),
        't_total': t_total,
        'pos_datetime': datetime.now(),
    }
    # print(transactions.count(), t_total)
    return render(request, 'POS.html', context)

def POSSocket(request):
    if request.GET:
        # print(request.GET)
        current = request.GET.get('current', None)
        dist = request.GET.get('dist', None)
        tid = request.GET.get('tid', None)
        pay_tid = request.GET.get('pay_tid', None)
        if tid:
            transaction = Transaction.objects.get(id=int(tid))
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "notification_broadcast",
                {
                    'type': 'send_notification',
                    'message': json.dumps(
                        {
                            'type': 'pos',
                            'action': 'change',
                            'current': current,
                            'dist': dist,
                            
                            't_id': tid,
                            't_product': transaction.product,
                            't_total': transaction.total,
                            't_amount': transaction.amount,
                        }
                    )
                }
            )
        elif pay_tid:
            transaction = Transaction.objects.get(id=int(pay_tid))
            transaction.status = True
            transaction.save()
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "notification_broadcast",
                {
                    'type': 'send_notification',
                    'message': json.dumps(
                        {
                            'type': 'pos',
                            'action': 'change',
                            'current': current,
                            'dist': dist,
                            
                            'pay_tid': pay_tid,
                            'pay_product': transaction.product,
                            'pay_total': transaction.total,
                            'pay_amount': transaction.amount,
                            'pay_unit': transaction.unit,
                        }
                    )
                }
            )
        else:
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "notification_broadcast",
                {
                    'type': 'send_notification',
                    'message': json.dumps(
                        {
                            'type': 'pos',
                            'action': 'change',
                            'current': current,
                            'dist': dist,
                        }
                    )
                }
            )
        return JsonResponse(data={'status': 'Done'}, safe=False)

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
        'amount95': format(amount95, '0.2f'),
        'fuel95': 100-(((amount95)*100)/capacity95) if capacity95 != 0 else 100,
        'precentage95': format((((amount95)*100)/capacity95), '0.2f') if capacity95 != 0 else 100,
        
        'capacity92': capacity92,
        'amount92': format(amount92, '0.2f'),
        'fuel92': 100-(((amount92)*100)/capacity92) if capacity92 != 0 else 100,
        'precentage92': format((((amount92)*100)/capacity92), '0.2f') if capacity92 != 0 else 100,
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

def WetstockSocket(request):
    if request.GET:
        # print(request.GET)
        popup = request.GET.get('popup', None)
        group = request.GET.get('group', None)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notification_broadcast",
            {
                'type': 'send_notification',
                'message': json.dumps(
                    {
                        'type': 'wetstock',
                        'popup': popup,
                        'group': group,
                    }
                )
            }
        )
        return JsonResponse(data={'status': 'Done'}, safe=False)


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

def ReportView(request):
    pyautogui.hotkey('ctrl', 'tab')
    # pyautogui.press('f11')
    # pyautogui.press('f11')
    # return render(request, 'Ads.html', {})
    return HttpResponseRedirect('http://192.168.1.85:224/pypass/')