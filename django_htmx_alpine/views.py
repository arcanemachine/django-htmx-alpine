from django.http import HttpResponseRedirect
from django.urls import reverse


def project_root(request):
    return HttpResponseRedirect(reverse('tasks:task_list'))
