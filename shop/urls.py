from django.urls import path
from .views import *
app_name = 'shop'
urlpatterns = [
    path('', Index.as_view(), name='index-url'),
    path('create/', CreateProduct.as_view(), name='create-product-url'),
    path('<slug:category_slug>/', Index.as_view(), name='category-url'),
    path('product/<slug:product_slug>/', DetailProduct.as_view(), name='detail-product-url'),
    path('update/<slug:product_slug>/', UpdateProduct.as_view(), name='update-product-url'),
    path('delete/<slug:product_slug>/', DeleteProduct.as_view(), name='delete-product-url'),
]