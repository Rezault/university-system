# Generated by Django 5.1.6 on 2025-04-04 12:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grade',
            name='cohort',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='university.cohort'),
        ),
        migrations.AlterField(
            model_name='grade',
            name='module',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='university.module'),
        ),
        migrations.AlterField(
            model_name='grade',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='university.student'),
        ),
    ]
