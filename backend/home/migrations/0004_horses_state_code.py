# Generated by Django 2.2.28 on 2023-06-13 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_auto_20230312_0558'),
    ]

    operations = [
        migrations.AddField(
            model_name='horses',
            name='state_code',
            field=models.CharField(blank=True, max_length=2, null=True),
        ),
    ]
