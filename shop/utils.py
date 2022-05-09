from django.shortcuts import render


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
            test = self.model_cat.objects.get(slug=category_slug)
            obj_prod = test.products.all()

        search = request.GET.get('search', '')
        if search:
            obj_prod = obj_prod.filter(Q(name__icontains=search) |
                                    Q(description__icontains=search))

        return render(request, self.template, {
            'products': obj_prod,
            'categories': obj_cat,
            })

class GetDetailMixin:
    model = None
    template = None
    def get(self, request, product_slug):
        obj = self.model.objects.get(slug=product_slug)
        return render(request, self.template, {'product':obj})