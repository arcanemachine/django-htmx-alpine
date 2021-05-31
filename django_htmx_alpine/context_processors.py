from project_folder import server_config


def helpers(request):
    return {'server_config': server_config}
