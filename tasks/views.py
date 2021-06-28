from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404, render
from django.utils.translation import ugettext_lazy as _
from urllib.parse import unquote as urllib_parse_unquote

from .models import Task
from project_folder import helpers as h


def dummy_view(request):
    response = HttpResponse()
    return response


def response_content_unchanged(request, message='content unchanged'):
    response = HttpResponse(message)
    response.status_code = 204  # HTMX does not change content if 304 returned
    return response


def response_not_authorized(request):
    return response_content_unchanged(
        request, "You are not authorized to perform this action.")


def response_login_required(request):
    return response_content_unchanged(
        request, "You must login before you can perform this action.")


def task_list(request):
    if not request.user.is_authenticated:
        tasks = Task.objects.none()
    else:
        tasks = Task.objects.filter(user=request.user)
    response = render(request, 'tasks/task_list.html', {'tasks': tasks})
    return response


@require_http_methods(['POST'])
def task_create(request):
    context = {}
    if not request.user.is_authenticated:
        return login_required(request)
    if request.POST.get('description'):
        Task.objects.create(
            user=request.user,
            description=request.POST['description'])
        context.update({'task_create_success': True})
        messages.success(request, _('Task created'))
    else:
        return response_content_unchanged

    tasks = Task.objects.filter(user=request.user)
    context.update({'tasks': tasks})

    return h.render_with_messages(request, 'tasks/list_tasks.html', context)


@require_http_methods(['PUT'])
def task_update(request, task_id):
    if not request.user.is_authenticated:
        return response_login_required(request)

    context = {}
    task = get_object_or_404(Task, id=task_id, user=request.user)

    parsed_params = h.get_parsed_params(request)

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
def task_delete(request, task_id):
    if not request.user.is_authenticated:
        return response_login_required(request)

    context = {}
    task = get_object_or_404(Task, id=task_id, user=request.user)
    task.delete()
    messages.success(request, 'Task deleted')

    tasks = Task.objects.filter(user=request.user)
    context.update({'tasks': tasks,
                    'task': task})

    return h.render_with_messages(request, 'tasks/list_tasks.html', context)
