from tabnanny import verbose
from django.db import models
from django.urls import reverse


class Product(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/%y/%m/%d', blank=True)
    description = models.TextField(blank=True)
    stock = models.CharField(max_length=20, choices=(('in stock', 'в наличии'), ('out of stock', 'нет в наличии')))
    category = models.ForeignKey('Category', on_delete=models.PROTECT, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-created_at', )
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def get_absolute_url(self):
        return reverse('shop:detail-product-url', kwargs={'product_slug': self.slug})

    def save(self):
        self.slug = self.name.lower().replace(' ', '-')
        return super().save()


class Category(models.Model):
    name = models.CharField(max_length=70, db_index=True)
    slug = models.SlugField(max_length=70, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def get_absolute_url(self):
        return reverse('shop:category-url', kwargs={'category_slug':self.slug})


class Comment(models.Model):
    title = models.TextField()
    slug = models.SlugField(max_length=200, unique=True)
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self):
        self.slug = self.title[:30:2].replace(' ', '-')
        return super().save()

    class Meta:
        ordering = ('-created_at', )
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
