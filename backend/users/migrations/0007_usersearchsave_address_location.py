# Generated by Django 2.2.28 on 2023-07-07 20:41

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20230510_2211'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersearchsave',
            name='address_location',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, geography=True, null=True, srid=4326),
        ),
    ]
