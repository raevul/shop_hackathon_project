from urllib import request
from django.shortcuts import redirect, render
from django.views.generic import View
from .models import Category, Product
from .utils import GetAllMixin, GetDetailMixin
from .forms import ProductForm


from django.core.paginator import Paginator
from django.db.models import Q
from django.conf import settings

# Create your views here.
class Index(GetAllMixin, View):
    model_prod = Product
    model_cat = Category
    template = 'shop/index.html'

class DetailProduct(GetDetailMixin, View):
    model = Product
    template = 'shop/detail_product.html'

class CreateProduct(View):
    def get(self, request):
        product_form = ProductForm()
        return render(request, 'shop/create_product.html', {'form':product_form})

    def post(self, request):
        product_form = ProductForm(request.POST, request.FILES)
        if product_form.is_valid():
            product = product_form.save()
            return redirect(product.get_absolute_url())
        return render(request, 'shop/create_product.html', {'form': product_form})

class UpdateProduct(View):
    def get(self, request, product_slug):
        product = Product.objects.get(slug=product_slug)
        product_form = ProductForm(instance=product)
        return render(request, 'shop/update_product.html', {'form':product_form, 'product': product})

    def post(self, request, product_slug):
        product = Product.objects.get(slug=product_slug)
        product_form = ProductForm(request.POST, request.FILES, instance=product)
        if product_form.is_valid():
            update_product = product_form.save()
            return redirect(update_product.get_absolute_url())
        ...

class DeleteProduct(View):
    def get(self, request, product_slug):
        product = Product.objects.get(slug=product_slug)
        product.delete()
        return redirect('shop:index-url')



def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.all()

    if category_slug:
        category = Category.objects.get(slug=category_slug)
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
