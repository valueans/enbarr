# Generated by Django 2.2.26 on 2023-01-20 03:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0021_cards_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cards',
            old_name='status',
            new_name='active',
        ),
    ]
