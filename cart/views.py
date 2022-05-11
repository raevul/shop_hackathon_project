from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods

from shop.models import Product
from .helpers import Cart
from .forms import CartAddProductForm


@require_http_methods(['POST'])
def cart_add(request, product_slug):
    cart = Cart(request)
    product = get_object_or_404(Product, slug=product_slug)
    form = CartAddProductForm(request.POST)
    if form.is_valid():
        cleaned_data = form.cleaned_data
        cart.add_or_update(
            product=product,
            quantity=cleaned_data['quantity'],
            update_quantity=cleaned_data['update']
        )
    return redirect('cart:cart-detail')


def cart_remove(request, product_slug):
    cart = Cart(request)
    product = get_object_or_404(Product, slug=product_slug)
    cart.remove(product)
    return redirect('cart:cart-detail')


def cart_detail(request):
    cart = Cart(request)
    return render(request, 'cart_detail.html', {'cart': cart})
