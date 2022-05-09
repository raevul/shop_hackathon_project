from urllib import request
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import View
from .models import Category, Product, Comment
from .utils import DeleteObjectMixin, GetAllMixin, GetDetailMixin
from .forms import CommentForm, ProductForm

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

class DeleteProduct(DeleteObjectMixin, View):
    model = Product

class DeleteComment(View):
    def get(self, request, comment_slug):
        comment = get_object_or_404(Comment, slug=comment_slug)
        comment.delete()
        return redirect(comment.product.get_absolute_url())

class UpdateComment(View):
    def get(self, request, comment_slug):
        comment = get_object_or_404(Comment, slug=comment_slug)
        comment_form = CommentForm(instance=comment)
        return render(request, 'shop/update_comment.html', {'form':comment_form})
    
    def post(self, request, comment_slug):
        comment = get_object_or_404(Comment, slug=comment_slug)
        comment_form = CommentForm(request.POST, instance=comment)
        if comment_form.is_valid():
            update_comment = comment_form.save()
            return redirect(comment.product.get_absolute_url())
