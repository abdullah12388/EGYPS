# Generated by Django 4.2.5 on 2024-02-10 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gas95', models.FloatField()),
                ('gas92', models.FloatField()),
                ('diesel', models.FloatField()),
                ('cng', models.FloatField()),
            ],
        ),
    ]
