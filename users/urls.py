from django.contrib.auth import views as auth_views
from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path('',
         views.users_root,
         name='users_root'),
    path('register/',
         views.UserRegisterView.as_view(),
         name='register'),
    path('login/',
         # views.login,
         views.UserLoginView.as_view(),
         name='login'),
    path('logout/',
         views.UserLogoutView.as_view(),
         name='logout'),
    path('me/',
         views.UserDetailMeView.as_view(),
         name='user_detail_me'),
    path('me/settings/password/',
         auth_views.PasswordChangeView.as_view(
             template_name='users/password_change_form.html'),
         name='password_change'),
    path('me/delete-account/',
         views.UserDeleteView.as_view(),
         name='user_delete'),
]
