from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # views
    path('about/', views.AboutTemplateView.as_view(), name='about'),
    path('get_weather/', views.get_weather, name='get_weather'),

    # apps
    path('captcha/', include('captcha.urls')),
    path('users/', include('users.urls')),
    path('', include('tasks.urls')),
]
