from django.contrib import admin
from .models import Product, Category


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'image', 'status')
    list_display_links = ('name', )
    prepopulated_fields = {"slug": ("name", 'price')}


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    list_display_links = ('name', )


admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
