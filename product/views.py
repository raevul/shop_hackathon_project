from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.db.models import Q

from .models import Product, Category
from django.conf import settings


def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.all()

    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)

    search = request.GET.get('search', '')
    if search:
        products = products.filter(Q(name__icontains=search) |
                                   Q(description__icontains=search))

    paginator = Paginator(products, settings.PAGINATOR_NUM)
    page_number = request.GET.get('page')
    products = paginator.get_page(page_number)

    context = {
        'products': products,
        'categories': categories,
        'category': category,
    }

    return render(request, 'product/product_list.html', context)
