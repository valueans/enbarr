# Generated by Django 2.2.28 on 2023-02-24 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_one_deleted', models.BooleanField(default=False)),
                ('user_two_deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='DeletedConversationsId',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Messages', models.TextField(blank=True, max_length=2000, null=True)),
                ('channel', models.CharField(blank=True, max_length=100, null=True)),
                ('timetoken', models.CharField(blank=True, max_length=100, null=True)),
                ('sender', models.CharField(blank=True, max_length=100, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
