from decimal import Decimal
from django.conf import settings
from .models import Product


class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def add_or_update(self, product, quantity=1, update_quantity=False):
        product_slug = product.slug
        if product_slug not in self.cart:
            self.cart[product_slug] = {'quantity': 0,
                                       'price': str(product.price)}
            if update_quantity:
                self.cart[product_slug]['quantity'] = quantity
            else:
                self.cart[product_slug]['quantity'] += int(quantity)
            self.save()




