# Generated by Django 2.2.28 on 2023-01-27 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("chat", "0003_auto_20221124_1345"),
    ]

    operations = [
        migrations.AddField(
            model_name="messages",
            name="Messages",
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]