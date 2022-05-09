from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse
from .models import Comment
from django.conf import settings
from django.core.paginator import Paginator
from django.db.models import Q

class GetAllMixin:
    model_prod = None
    model_cat = None
    template = None
    def get(self, request, category_slug=None):
        obj_prod = self.model_prod.objects.all()
        obj_cat = self.model_cat.objects.all()

        if category_slug:
            category = get_object_or_404(obj_cat, slug=category_slug)
            obj_prod = category.products.all()

        search = request.GET.get('search', '')
        if search:
            obj_prod = obj_prod.filter(Q(name__icontains=search) |
                                    Q(description__icontains=search))

                
        paginator = Paginator(obj_prod, settings.PAGINATOR_NUM)
        page_number = request.GET.get('page')
        obj_prod = paginator.get_page(page_number)

        return render(request, self.template, {
            'products': obj_prod,
            'categories': obj_cat,
            })

class GetDetailMixin:
    model = None
    template = None
    comments = Comment.objects.all()
    def get(self, request, product_slug):
        product = get_object_or_404(self.model, slug=product_slug)
        return render(request, self.template, {'product':product, 'comments':self.comments})

    def post(self, request, product_slug):
        product = get_object_or_404(self.model, slug=product_slug)
        if request.POST.get('comment'):
            comment = Comment(title=request.POST.get('comment'), product_id=product.id)
            comment.save()
            return redirect(product.get_absolute_url())


class DeleteObjectMixin:
    model = None
    template_url = None
    def get(self, request, slug):
        obj = get_object_or_404(self.model, slug=slug)
        obj.delete()
        return redirect(self.template_url)
        