from django.conf import settings


def helpers(request):
    return {'DEBUG': settings.DEBUG,
            'USER_ANALYTICS_SCRIPT': settings.USER_ANALYTICS_SCRIPT}
