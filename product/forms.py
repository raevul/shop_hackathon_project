from django.forms import ModelForm, ValidationError
from .models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'descripntion', 'price', 'image', 'status']
        
    # def clean(self):
    #     slug = Product.slug
    #     if Product.objects.filter(slug=slug):
    #         raise ValidationError('Product with such name already exists!')
    #     return self.cleaned_data