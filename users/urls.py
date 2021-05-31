from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path('',
         views.users_root,
         name='users_root'),
    path('get-csrf-token/',
         views.get_csrf_token,
         name='get_csrf_token'),
    path('register/',
         views.UserRegisterView.as_view(),
         name='register'),
    path('login/',
         views.UserLoginView.as_view(),
         name='login'),
    path('logout/',
         views.UserLogoutView.as_view(),
         name='logout'),
]
