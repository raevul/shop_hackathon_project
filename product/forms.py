from socket import fromshare
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'descripntion', 'price', 'image', 'status']