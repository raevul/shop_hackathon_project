from django.urls import path
from . import views
app_name = 'product'
urlpatterns = [
    path('all/', views.product_list, name='product-list-url'),
<<<<<<< HEAD
    path('product/create/', views.CreateProduct.as_view(), name='create-product-url'),
    path('product/detail/<str:product_slug>/', views.product_detail, name='product-detail-url'),
=======
    path('all/<str:category_slug>/', views.product_list, name='product-list-url'),
>>>>>>> 01127bee196fdcea3d0b5333cfd4579a095d009d
]
