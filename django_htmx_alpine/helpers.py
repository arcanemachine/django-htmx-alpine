def get_formatted_html(response):
    from bs4 import BeautifulSoup
    return BeautifulSoup(
        response.content.decode('utf-8'), features='html.parser')


def get_parsed_params(request):
    params = request.body.decode('utf-8')
    parsed_params = dict([item.split('=') for item in params.split('&')])
    return parsed_params


def get_settings_debug():
    try:
        from project_folder import local_config as lc
        return lc.DEBUG
    except (ImportError, AttributeError):
        print("\nNote: You have not set a value for settings.DEBUG, so it "
              "has been set to True by default.\n")
        return True


def get_settings_secret_key():
    try:
        from project_folder import local_config as lc
        return lc.SECRET_KEY
    except (ImportError, AttributeError):
        print("\nWarning: You are using the default SECRET_KEY. "
              "For security purposes, this is not recommended.\n")
        return 'your_secret_key_890cVw348jhVr9433HLsc89283jHc98sd'


def get_settings_weather_api_key():
    try:
        from project_folder import local_config as lc
        return lc.WEATHER_API_KEY
    except (ImportError, AttributeError):
        print("\nWarning: settings.WEATHER_API_KEY has not been set. "
              "The HTMX weather demo will not work.\n")
        return 'your_weather_api_key'


def round_half_up(n, decimals=0):
    from math import floor as math_floor
    multiplier = 10 ** decimals
    return math_floor(n*multiplier + 0.5) / multiplier
