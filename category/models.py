from django.db import models


class Category(models.Model):
    slug = models.SlugField(max_length=50)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
