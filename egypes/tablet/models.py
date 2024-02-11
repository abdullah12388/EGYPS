from django.db import models

# Create your models here.

class Price(models.Model):
    gas95 = models.FloatField(default=0.0)
    gas92 = models.FloatField(default=0.0)
    diesel = models.FloatField(default=0.0)
    cng = models.FloatField(default=0.0)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    
class Delivery(models.Model):
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Sale(models.Model):
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    
class Tank(models.Model):
    product = models.CharField(max_length=256)
    capacity = models.FloatField()
    amount = models.FloatField()
    delivery = models.ManyToManyField(Delivery, blank=True, null=True, related_name='TanksDelivery')
    sale = models.ManyToManyField(Sale, blank=True, null=True, related_name='TanksSale')
    timestamp = models.DateTimeField(auto_now_add=True)