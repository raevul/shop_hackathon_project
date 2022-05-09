from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from .models import Product
from .forms import ProductForm
from category.models import Category


def product_list(request):
    products = Product.objects.all()
    categories = Category.objects.all()
    return render(request, 'product/product_list.html', {'products': products, 'categories': categories})

def product_detail(request, slug):
    product = Product.objects.get(slug=slug)
    return render(request, 'product/product_detail.html', {'product': product})

class CreateProduct(View):
    def Get(self, request):
        form = ProductForm()
        return render(request, 'product:create_product.html', {'form': form})