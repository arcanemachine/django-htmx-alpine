from bs4 import BeautifulSoup as BS  # noqa
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404, render
from urllib.parse import unquote as urllib_parse_unquote

from .models import Task


def task_list(request):
    tasks = Task.objects.all()
    response = render(request, 'tasks/task_list.html', {'tasks': tasks})
    return response


@require_http_methods(['POST'])
def task_create(request):
    if request.POST.get('description', None):
        task = Task.objects.create(description=request.POST['description'])
    else:
        response = HttpResponse()
        response.status_code = 400
        return response

    tasks = Task.objects.all()
    context = {
        'task': task,
        'task_count': tasks.count()}
    return render(request, 'tasks/get_task.html', context)


@require_http_methods(['PUT'])
def task_update(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    params = request.body.decode('utf-8')
    parsed_params = dict([item.split('=') for item in params.split('&')])

    updated_task_description = \
        urllib_parse_unquote(parsed_params.get('description', ''))
    updated_task_is_complete = \
        urllib_parse_unquote(parsed_params.get('is_complete', ''))

    if updated_task_description \
            and updated_task_description != task.description:
        task.description = updated_task_description
        task.save()
    elif updated_task_is_complete:
        if updated_task_is_complete == 'true':
            task.is_complete = True
            task.save()
        elif updated_task_is_complete == 'false':
            task.is_complete = False
            task.save()
    else:
        response = HttpResponse()
        response.status_code = 400
        return response

    context = {'task': task}
    response = render(request, 'tasks/get_task.html', context)
    return response


@require_http_methods(['DELETE'])
def task_delete(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.delete()
    return HttpResponse('')
    context = {
        'tasks': Task.objects.all(),
        'task_count': Task.objects.count()}
    return render(request, 'tasks/list_task.html', context)
