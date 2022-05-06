from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'image', 'status')
    list_display_links = ('name', )
    prepopulated_fields = {"slug": ("name", 'price')}


admin.site.register(Product, ProductAdmin)
