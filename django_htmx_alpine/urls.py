from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.project_root, name='project_root'),
    path('admin/', admin.site.urls),
    path('captcha/', include('captcha.urls')),
    path('tasks/', include('tasks.urls')),
    path('users/', include('users.urls')),
]
