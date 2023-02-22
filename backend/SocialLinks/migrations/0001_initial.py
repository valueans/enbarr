# Generated by Django 2.2.28 on 2023-02-22 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SocialLinks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facebook', models.CharField(blank=True, max_length=1000, null=True)),
                ('instagram', models.CharField(blank=True, max_length=1000, null=True)),
                ('twitter', models.CharField(blank=True, max_length=1000, null=True)),
                ('linkedIn', models.CharField(blank=True, max_length=1000, null=True)),
            ],
            options={
                'verbose_name_plural': 'Social Media Platform Links',
            },
        ),
    ]
