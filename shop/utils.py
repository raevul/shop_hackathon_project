from django.contrib.auth import login
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse, reverse_lazy
from .models import Category, Comment
from django.conf import settings
from django.core.paginator import Paginator
from django.db.models import Q

from .models import Product
from .helpers import product_sort


class GetAllMixin:
    template = None
    def get(self, request, category_slug=None):
        category = None
        obj_prod = self.model_prod.objects.all()
        obj_cat = self.model_cat.objects.all()

        if category_slug:
            category = get_object_or_404(obj_cat, slug=category_slug)
            obj_prod = category.products.filter(category=category)
        obj_prod = product_sort(request, obj_prod, category_slug)
        search = request.GET.get('search', '')
        if search:
            obj_prod = Product.objects.filter(Q(name__icontains=search) |
                                              Q(description__icontains=search))

        paginator = Paginator(obj_prod, settings.PAGINATOR_NUM)
        page_number = request.GET.get('page')
        obj_prod = paginator.get_page(page_number)

        return render(request, self.template, {
            'products': obj_prod,
            'categories': obj_cat,
            'category': category,
            })


class GetDetailMixin:
    def get(self, request, obj_id):
        product = get_product_or_comment(self.model, obj_id)
        categories = Category.objects.all()
        return render(request, self.template, {'product':product, 'categories': categories})

    def post(self, request, obj_id):
        product = get_product_or_comment(self.model, obj_id)
        if request.POST.get('comment'):
            comment = Comment(title=request.POST.get('comment'), product_id=product.id)
            comment.save()
            return redirect(product.get_absolute_url())


class DeleteObjectMixin:
    model = None
    template_url = None
    def get(self, request, obj_id):
        obj = get_product_or_comment(self.model, obj_id)
        obj.delete()
        if self.template_url:
            return redirect(self.template_url)
        return redirect(obj.product.get_absolute_url())


class RegisterOrLoginMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['registration_form'] = self.get_form(self.get_form_class())
        return context


    def get_success_url(self):
        return reverse_lazy('shop:index-url')


def get_product_or_comment(model, obj_id):
    obj = get_object_or_404(model, id=obj_id)
    return obj
