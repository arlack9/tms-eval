# Generated by Django 4.2 on 2025-03-13 10:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Admins',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('middle_name', models.CharField(max_length=50)),
                ('dob', models.DateField()),
                ('present_status', models.CharField(choices=[('PR', 'PRESENT'), ('AB', 'ABSENT')], default='PR', max_length=20)),
                ('login_auth', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Employees',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('middle_name', models.CharField(max_length=50)),
                ('dob', models.DateField()),
                ('created_date', models.DateField()),
                ('present_status', models.CharField(choices=[('PR', 'PRESENT'), ('AB', 'ABSENT')], default='PR', max_length=20)),
                ('login_auth', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Managers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('middle_name', models.CharField(max_length=50)),
                ('dob', models.DateField()),
                ('present_status', models.CharField(choices=[('PR', 'PRESENT'), ('AB', 'ABSENT')], default='PR', max_length=20)),
                ('login_auth', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Travel_Requests',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_location', models.CharField(max_length=50)),
                ('to_location', models.CharField(max_length=50)),
                ('preferred_travel_mode', models.CharField(max_length=255)),
                ('lodging_required', models.SmallIntegerField()),
                ('additional_requests', models.CharField(max_length=255)),
                ('travel_purpose', models.CharField(max_length=255)),
                ('requested_date', models.DateField()),
                ('date_from', models.DateField()),
                ('date_to', models.DateField()),
                ('created_at', models.DateField()),
                ('updated_at', models.DateField()),
                ('request_status', models.CharField(choices=[('IP', 'IN-PROGRESS'), ('AP', 'APPROVED'), ('RJ', 'REQUEST REJECTED')], default='IP', max_length=20)),
                ('alive_status', models.CharField(choices=[('OP', 'OPEN'), ('CL', 'CLOSED')], default='OP', max_length=20)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app_tms.employees')),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app_tms.managers')),
            ],
        ),
        migrations.CreateModel(
            name='Notes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note_text', models.CharField(max_length=255)),
                ('note_by', models.CharField(choices=[('ADMIN', 'Admin'), ('MANAGER', 'Manager')], max_length=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('admin', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='app_tms.admins')),
                ('employee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='app_tms.employees')),
                ('manager', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='app_tms.managers')),
                ('request', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='app_tms.travel_requests')),
            ],
        ),
        migrations.CreateModel(
            name='Manager_Assignments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assigned_at', models.DateField()),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app_tms.employees')),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app_tms.managers')),
            ],
        ),
    ]
