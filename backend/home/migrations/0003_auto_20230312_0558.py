# Generated by Django 2.2.28 on 2023-03-12 05:58

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20230224_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='horses',
            name='user_location',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, geography=True, null=True, srid=4326),
        ),
    ]