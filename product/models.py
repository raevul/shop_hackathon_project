from django.db import models
from django.urls import reverse
from category.models import Category


class Product(models.Model):
    CHOICES = (
        ('in stock', 'в наличии'),
        ('out of stock', 'нет в наличии')
    )
    category = models.ForeignKey(Category, related_name='categories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to='media/products', blank=True)
    status = models.CharField(max_length=20, choices=CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def save(self):
        self.slug = self.name.lower().replace(' ', '-') + str(self.created_at)[:11]
        return super().save()

    def get_absolute_url(self):
        return reverse('product:product-detail-url', kwargs={'product_slug': self.slug})

    def __str__(self):
        return self.name

