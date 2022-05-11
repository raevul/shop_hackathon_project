from django.contrib import admin
from .models import Product, Category, Comment
# Register your models here.


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name', )}


admin.site.register(Product)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Comment)
