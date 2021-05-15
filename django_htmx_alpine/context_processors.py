from django_jsonsaver import server_config


def constants(request):
    return {'SERVER_CONFIG': server_config,
            'PROJECT_NAME': server_config.PROJECT_NAME,
            'BACKEND_SERVER_URL': server_config.BACKEND_SERVER_URL}
