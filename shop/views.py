from django.shortcuts import get_object_or_404, redirect, render
from .models import Category, Product, Comment
from .utils import DeleteObjectMixin, GetAllMixin, GetDetailMixin, get_product_or_comment, RegisterOrLoginMixin
from .forms import CommentForm, ProductForm, RegistrationForm, LoginForm
from django.contrib.auth.views import LoginView
from django.views.generic import View, CreateView
from django.contrib.auth import logout


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
    def get(self, request, obj_id):
        product = get_product_or_comment(Product, obj_id)
        product_form = ProductForm(instance=product)
        return render(request, 'shop/update_product.html', {'form':product_form, 'product': product})

    def post(self, request, obj_id):
        product = get_product_or_comment(Product, obj_id)
        product_form = ProductForm(request.POST, request.FILES, instance=product)
        if product_form.is_valid():
            update_product = product_form.save()
            return redirect(update_product.get_absolute_url())
        return render(request, 'shop/update_product.html', {'form': product_form, 'product': product})


class DeleteProduct(DeleteObjectMixin, View):
    model = Product
    template_url = 'shop:index-url'


class DeleteComment(DeleteObjectMixin, View):
    model = Comment


class UpdateComment(View):
    def get(self, request, obj_id):
        comment = get_product_or_comment(Comment, obj_id)
        comment_form = CommentForm(instance=comment)
        return render(request, 'shop/update_comment.html', {'form':comment_form})
    
    def post(self, request, obj_id):
        comment = get_product_or_comment(Comment, obj_id)
        comment_form = CommentForm(request.POST, instance=comment)
        if comment_form.is_valid():
            comment_form.save()
            return redirect(comment.product.get_absolute_url())


class Register(RegisterOrLoginMixin, CreateView):
    form_class = RegistrationForm
    template_name = 'shop/register.html'
    register_or_login_form = 'registration_form'
    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('shop:index-url')


class Login(RegisterOrLoginMixin, LoginView):
    form_class = LoginForm
    template_name = 'shop/login.html'
    register_or_login_form = 'login_form'


def logout_user(request):
    logout(request)
    return redirect('shop:index-url')


def profile(request):
    return render(request, 'shop/profile.html')
