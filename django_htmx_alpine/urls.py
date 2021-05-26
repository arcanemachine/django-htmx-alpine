from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path('get_weather/', views.get_weather, name='get_weather'),
    path('admin/', admin.site.urls),
    path('captcha/', include('captcha.urls')),
    path('users/', include('users.urls')),
    path('', include('tasks.urls')),
]
