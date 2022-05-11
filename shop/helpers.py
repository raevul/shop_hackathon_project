from django.shortcuts import get_object_or_404
from .models import Category


def product_sort(request, products, category_slug=None):

    is_sort_asc = request.GET.get('price')
    is_sort_desc = request.GET.get('-price')
    if category_slug:
        category = get_object_or_404(
                                    Category,
                                    slug=category_slug
        )
        products = products.filter(category=category)
    if is_sort_asc:
        products = products.order_by('price')
    elif is_sort_desc:
        products = products.order_by('-price')
    return products
