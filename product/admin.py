from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'price', 'image', 'status')
    list_display_links = ('title', )


admin.site.register(Product, ProductAdmin)
