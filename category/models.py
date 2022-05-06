from django.db import models
from product.models import Product


class Category(models.Model):
    slug = models.SlugField(max_length=50)
    name = models.CharField(max_length=50)
    product_slug = models.ForeignKey(Product, related_name='products', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
