from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # views
    path('', views.AboutTemplateView.as_view(), name='about'),
    path('get_weather/', views.get_weather, name='get_weather'),
    path('utility/user-is-authenticated/',
         views.user_is_authenticated,
         name="user_is_authenticated"),

    # apps
    path('captcha/', include('captcha.urls')),
    path('users/', include('users.urls')),
    path('tasks/', include('tasks.urls')),
]
