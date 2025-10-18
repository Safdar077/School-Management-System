from django.db import models

# Create your models here.
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

class Admission(models.Model):
    full_name = models.CharField(max_length=100)
    middle_initial = models.CharField(max_length=10, blank=True)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    nationality = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='photos/')

class Payment(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.amount} - {self.status}"