# Generated by Django 2.2.28 on 2023-04-21 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20230413_2327'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='one_signal_play_id',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]