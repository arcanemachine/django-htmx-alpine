from django.urls import path

from . import views

app_name = 'tasks'

urlpatterns = [
    path('', views.task_list, name='tasks_root'),
    path('', views.task_list, name='task_list'),
    path('public/', views.task_list_public, name='task_list_public'),
    path('create/', views.task_create, name='task_create'),
    path('update/', views.task_update, name='task_update_no_id'),
    path('update/<int:task_id>/', views.task_update, name='task_update'),
    path('delete/', views.task_delete, name='task_delete_no_id'),
    path('delete/<int:task_id>/', views.task_delete, name='task_delete'),
    ]
