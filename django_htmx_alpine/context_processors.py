from django.conf import settings
from project_folder import server_config


def helpers(request):
    return {'settings': settings,
            'server_config': server_config}
