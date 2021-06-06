from django.conf import settings


def helpers(request):
    return {'USER_ANALYTICS_SCRIPT': settings.USER_ANALYTICS_SCRIPT}
