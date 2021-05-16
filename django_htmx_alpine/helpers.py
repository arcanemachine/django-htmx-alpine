def get_parsed_params(request):
    params = request.body.decode('utf-8')
    parsed_params = dict([item.split('=') for item in params.split('&')])
    return parsed_params
