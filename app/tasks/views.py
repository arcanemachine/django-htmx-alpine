import json
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404, render
from django.utils.translation import ugettext_lazy as _
from urllib.parse import unquote as urllib_parse_unquote

from .models import Task
from django_htmx_alpine import helpers as h, utility_views

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
        return utility_views.htmx_response_login_required(request)

    context = {}
    if request.POST.get('description'):
        new_task = Task.objects.create(
            user=request.user,
            description=request.POST['description'])
    else:
        return utility_views.htmx_response_content_unchanged(
            "Task description cannot be empty.")

    if request.POST.get('is_csr'):
        return HttpResponse(f"""
          <script>
            hDispatch('task-create-csr', {{
              id: {new_task.id},
              description: "{request.POST['description']}"
            }});
            hStatusMessageDisplay("Task created", 'success');
          </script>
        """)
    else:
        tasks = Task.objects.filter(user=request.user)
        context.update({'tasks': tasks})
        messages.success(request, _('Task created'))
        return h.render_with_messages(
            request, 'tasks/list_tasks.html', context)


@require_http_methods(['PUT'])
def task_update(request, task_id=None):
    context = {}

    if not task_id:
        parsed_params = h.get_parsed_params(request)
        task_id = int(parsed_params['id'])
    else:
        parsed_params = h.get_parsed_params(request)

    task = get_object_or_404(Task, id=task_id, user=request.user)

    updated_task_description = \
        urllib_parse_unquote(parsed_params.get('description', ''))
    updated_task_is_complete = \
        urllib_parse_unquote(parsed_params.get('is_complete', ''))
    is_csr = \
        urllib_parse_unquote(parsed_params.get('is_csr', ''))

    if updated_task_description \
            and updated_task_description != task.description:
        task.description = updated_task_description
        task.save()
    elif updated_task_is_complete:
        if updated_task_is_complete == 'true':
            task.is_complete = True
        elif updated_task_is_complete == 'false':
            task.is_complete = False
        task.save()

    if is_csr:
        return HttpResponse(f"""
          <script>
            hDispatch('task-update-csr', {{
              id: {task_id},
              description: "{updated_task_description}",
              is_complete: '{updated_task_is_complete}'
            }});
            hStatusMessageDisplay("Task updated", 'success');
          </script>
        """)
    else:
        messages.success(request, 'Task updated')
        context.update({'task': task})
        return h.render_with_messages(request, 'tasks/get_task.html', context)


@login_required
@require_http_methods(['DELETE'])
def task_delete(request, task_id=None):
    context = {}

    parsed_params = h.get_parsed_params(request)

    if not task_id:
        task_id = int(parsed_params.get('id'))

    task = get_object_or_404(Task, id=task_id, user=request.user)

    task.delete()

    if parsed_params.get('is_csr') == 'true':
        return HttpResponse(f"""
          <script>
            hDispatch('task-delete-csr', {{ id: {task_id}, }});
            hStatusMessageDisplay("Task deleted", 'success');
          </script>
        """)
    else:
        messages.success(request, 'Task deleted')
        tasks = Task.objects.filter(user=request.user)
        context.update({'tasks': tasks,
                        'task': task})
        return h.render_with_messages(
            request, 'tasks/list_tasks.html', context)
