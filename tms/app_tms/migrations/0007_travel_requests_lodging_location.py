# Generated by Django 4.2 on 2025-03-20 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_tms', '0006_remove_travel_requests_requested_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='travel_requests',
            name='lodging_location',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
