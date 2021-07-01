import json
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404, render
from django.utils.translation import ugettext_lazy as _
from urllib.parse import unquote as urllib_parse_unquote

from .models import Task
from project_folder import helpers as h, utility_views as uv

UserModel = get_user_model()


def task_list(request):
    if not request.user.is_authenticated:
        tasks = Task.objects.none()
    else:
        if request.GET.get('csr') == '1':
            task_lists = (Task.objects
                              .filter(user=request.user)
                              .select_related('user')
                              .prefetch_related('tasks')
                              .values('id', 'description', 'is_complete'))
            tasks = json.dumps(list(task_lists))
        else:
            tasks = Task.objects.filter(user=request.user)

    response = render(request, 'tasks/task_list.html', {'tasks': tasks})
    return response


def task_list_public(request):
    request.user = UserModel.objects.get(username='public')
    return task_list(request)


@require_http_methods(['POST'])
def task_create(request):
    if not request.user.is_authenticated:
        return uv.htmx_response_login_required(request)

    context = {}
    if request.POST.get('description'):
        Task.objects.create(
            user=request.user,
            description=request.POST['description'])
        context.update({'task_create_success': True})
        messages.success(request, _('Task created'))
    else:
        return uv.htmx_response_content_unchanged(
            "Task description cannot be empty.")

    tasks = Task.objects.filter(user=request.user)
    context.update({'tasks': tasks})

    return h.render_with_messages(request, 'tasks/list_tasks.html', context)


@require_http_methods(['PUT'])
def task_update(request, task_id=None):
    context = {}

    parsed_params = h.get_parsed_params(request)

    if not task_id:
        parsed_params = h.get_parsed_params(request)
        task_id = int(parsed_params['id'])

    task = get_object_or_404(Task, id=task_id, user=request.user)

    updated_task_description = \
        urllib_parse_unquote(parsed_params.get('description', ''))
    updated_task_is_complete = \
        urllib_parse_unquote(parsed_params.get('is_complete', ''))

    if updated_task_description \
            and updated_task_description != task.description:
        task.description = updated_task_description
        task.save()
        messages.success(request, 'Task updated')
    elif updated_task_is_complete:
        if updated_task_is_complete == 'true':
            task.is_complete = True
        elif updated_task_is_complete == 'false':
            task.is_complete = False
        task.save()
        messages.success(request, 'Task updated')

    context.update({'task': task})
    return h.render_with_messages(request, 'tasks/get_task.html', context)


@login_required
@require_http_methods(['DELETE'])
def task_delete(request, task_id=None):
    context = {}

    if not task_id:
        parsed_params = h.get_parsed_params(request)
        task_id = int(parsed_params['id'])

    task = get_object_or_404(Task, id=task_id, user=request.user)

    task.delete()
    messages.success(request, 'Task deleted')

    tasks = Task.objects.filter(user=request.user)
    context.update({'tasks': tasks,
                    'task': task})

    return h.render_with_messages(request, 'tasks/list_tasks.html', context)
