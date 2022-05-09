from django.forms import ModelForm
from .models import Product, Comment
class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['category', 'name', 'price', 'image', 'description', 'stock']

class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['title',]