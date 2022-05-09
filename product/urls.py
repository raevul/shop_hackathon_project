from django.urls import path
from . import views
app_name = 'product'
urlpatterns = [
    path('all/', views.product_list, name='product-list-url'),
    path('product/create/', views.CreateProduct.as_view(), name='create-product-url'),
    path('product/detail/<str:product_slug>/', views.product_detail, name='product-detail-url'),
]
