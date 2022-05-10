from django.shortcuts import get_object_or_404, redirect, render
from .models import Category, Product, Comment
from .utils import DeleteObjectMixin, GetAllMixin, GetDetailMixin
from .forms import CommentForm, ProductForm, RegistrationForm, LoginForm, CartAddProductForm
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views.generic import View, CreateView
from django.contrib.auth import logout
from django.views.decorators.http import require_http_methods
from .helpers import Cart


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
        return render(request, 'shop/create_product.html', {'form': product_form})

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
        return render(request, 'shop/update_product.html', {'form': product_form, 'product': product})


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

class Register(CreateView):
    form_class = RegistrationForm
    template_name = 'shop/register.html'
    success_url = reverse_lazy('shop:index-url')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['registration_form'] = self.get_form(self.get_form_class())
        return context

    def get_success_url(self):
        return reverse_lazy('shop:profile-url')


class Login(LoginView):
    form_class = LoginForm
    template_name = 'shop/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['login_form'] = self.get_form(self.get_form_class())
        return context

    def get_success_url(self):
        return reverse_lazy('shop:index-url')


def logout_user(request):
    logout(request)
    return redirect('shop:index-url')


def profile(request):
    return render(request, 'shop/profile.html')


@require_http_methods(['POST'])
def cart_add(request, product_slug):
    cart = Cart(request)
    product = get_object_or_404(Product, slug=product_slug)
    form = CartAddProductForm(request.POST)
    if form.is_valid():
        clean_data = form.cleaned_data
        cart.add_or_update(
            product=product,
            quantity=clean_data['quantity'],
            update_quantity=clean_data['update']
        )
    return redirect('shop:cart-detail-url')


def cart_remove(request, product_slug):
    cart = Cart(request)
    product = get_object_or_404(Product, slug=product_slug)
    cart.remove(product)
    return redirect('shop:cart-detail-url')


def cart_detail(request):
    cart = Cart(request)
    for item in cart:
        item['update_quantity_form'] = CartAddProductForm(initial={'quantity': item['quantity'],
                                                                   'update': True})
    return render(request, 'shop/cart_detail.html', {'cart': cart})
