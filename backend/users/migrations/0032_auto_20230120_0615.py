# Generated by Django 2.2.26 on 2023-01-20 06:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0031_auto_20230120_0444'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersearchsave',
            old_name='breed',
            new_name='breed_id',
        ),
        migrations.RenameField(
            model_name='usersearchsave',
            old_name='color',
            new_name='color_id',
        ),
        migrations.RenameField(
            model_name='usersearchsave',
            old_name='discipline',
            new_name='discipline_id',
        ),
        migrations.RenameField(
            model_name='usersearchsave',
            old_name='location',
            new_name='location_i',
        ),
        migrations.RenameField(
            model_name='usersearchsave',
            old_name='temperament',
            new_name='temperament_id',
        ),
    ]