def get_formatted_html(response):
    from bs4 import BeautifulSoup
    return BeautifulSoup(
        response.content.decode('utf-8'), features='html.parser')


def get_parsed_params(request):
    params = request.body.decode('utf-8')
    parsed_params = dict([item.split('=') for item in params.split('&')])
    return parsed_params


def round_half_up(n, decimals=0):
    from math import floor as math_floor
    multiplier = 10 ** decimals
    return math_floor(n*multiplier + 0.5) / multiplier
