# Generated by Django 2.2.26 on 2023-01-20 06:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0032_auto_20230120_0615'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersearchsave',
            old_name='location_i',
            new_name='location_id',
        ),
    ]