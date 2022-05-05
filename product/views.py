from django.shortcuts import render
from django.http import HttpResponse


def product_list(request):
    return render(request, 'product/product_list.html', {'products': 'product test'})
