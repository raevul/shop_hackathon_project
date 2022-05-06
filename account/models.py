from django.db import models


class User(models.Model):
    slug = models.SlugField(max_length=50, primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=12, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
