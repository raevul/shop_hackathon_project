from django.urls import path
from . import views
urlpatterns = [
    path('all/', views.product_list, name='product-list-url'),
    path('all/<str:category_slug>/', views.product_list, name='product-list-url'),
]
