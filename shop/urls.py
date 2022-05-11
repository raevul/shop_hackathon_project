from django.urls import path
from .views import *

app_name = 'shop'

urlpatterns = [
    path('', Index.as_view(), name='index-url'),
    path('create/', CreateProduct.as_view(), name='create-product-url'),
    path('sing-up/', Register.as_view(), name='register-url'),
    path('login/', Login.as_view(), name='login-url'),
    path('logout/', logout_user, name='logout-url'),
    path('profile/', profile, name='profile-url'),
    path('<slug:category_slug>/', Index.as_view(), name='category-url'),
    path('<category_slug>/', Index.as_view(), name='products-ordering'),
    path('product/<int:obj_id>/', DetailProduct.as_view(), name='detail-product-url'),
    path('product/update/<int:obj_id>/', UpdateProduct.as_view(), name='update-product-url'),
    path('product/delete/<int:obj_id>/', DeleteProduct.as_view(), name='delete-product-url'),
    path('comment/delete/<int:obj_id>/', DeleteComment.as_view(), name='delete-comment-url'),
    path('comment/update/<int:obj_id>/', UpdateComment.as_view(), name='update-comment-url'),
]
