from django.db import models
from django.urls import reverse
<<<<<<< HEAD
from category.models import Category
=======
>>>>>>> 01127bee196fdcea3d0b5333cfd4579a095d009d


class Product(models.Model):
    CHOICES = (
        ('in stock', 'в наличии'),
        ('out of stock', 'нет в наличии')
    )
    category = models.ForeignKey('Category', related_name='categories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to='media/products', blank=True)
    status = models.CharField(max_length=20, choices=CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
<<<<<<< HEAD
        ordering = ('name',)
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def save(self):
        self.slug = self.name.lower().replace(' ', '-') + str(self.created_at)[:11]
        return super().save()

    def get_absolute_url(self):
        return reverse('product:product-detail-url', kwargs={'product_slug': self.slug})
=======
        ordering = ['-created_at']
>>>>>>> 01127bee196fdcea3d0b5333cfd4579a095d009d

    def __str__(self):
        return self.name

<<<<<<< HEAD
=======

class Category(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('product-list-url', args=[self.slug, ])
>>>>>>> 01127bee196fdcea3d0b5333cfd4579a095d009d
