from django.urls import path
from . import views
urlpatterns = [
    path('all/', views.product_list, name='product-list-url')
]
