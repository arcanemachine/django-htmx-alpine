from django.contrib import admin
from django.urls import include, path

from . import views, utility_views as uv

urlpatterns = [
    path('admin/', admin.site.urls),

    # views
    path('', views.AboutTemplateView.as_view(), name='about'),
    path('get_weather/', uv.get_weather, name='get_weather'),

    # utility views
    path('utility/breakpoint/', uv.debugger, name='debugger'),
    path('utility/get-csrf-token/', uv.get_csrf_token, name='get_csrf_token'),
    path('utility/user-is-authenticated/',
         uv.user_is_authenticated,
         name="user_is_authenticated"),

    # apps
    path('captcha/', include('captcha.urls')),
    path('users/', include('users.urls')),
    path('tasks/', include('tasks.urls')),
]
