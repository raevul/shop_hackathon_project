from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Product
from django.conf import settings


def product_list(request):
    products = Product.objects.all()

    paginator = Paginator(products, settings.PAGINATOR_NUM)
    page_number = request.GET.get('page')
    products = paginator.get_page(page_number)

    return render(request, 'product/product_list.html', {'products': products})
