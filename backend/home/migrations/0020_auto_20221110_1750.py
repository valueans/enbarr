# Generated by Django 2.2.28 on 2022-11-10 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0019_auto_20221104_0945"),
    ]

    operations = [
        migrations.RenameField(
            model_name="horses",
            old_name="temprament",
            new_name="temperament",
        ),
    ]
