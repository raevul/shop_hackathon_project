from django.contrib.auth.views import LoginView
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views.generic import View, CreateView
from django.contrib.auth import logout

from .models import Category, Product
from .utils import GetAllMixin, GetDetailMixin
from .forms import ProductForm, RegistrationForm, LoginForm


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


class DeleteProduct(View):
    def get(self, request, product_slug):
        product = Product.objects.get(slug=product_slug)
        product.delete()
        return redirect('shop:index-url')


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
