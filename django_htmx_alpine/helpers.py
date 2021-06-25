from pathlib import Path
from os.path import join as os_path_join
from django.shortcuts import render

BASE_DIR = Path(__file__).resolve().parent.parent


def render_with_messages(request, template, context):
    messages_response = render(request, 'messages.html', context)
    response = render(request, template, context)
    response.content += messages_response.content
    return response


# misc
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


# settings
def get_debug():
    try:
        from project_folder import local_config
        return local_config.DEBUG
    except (ImportError, AttributeError):
        print("\nNote: You have not set a value for settings.DEBUG, so it "
              "has been set to True by default.\n")
        return True


def get_secret_key():
    try:
        from project_folder import local_config
        return local_config.SECRET_KEY
    except (ImportError, AttributeError):
        print("\nWarning: You are using the default SECRET_KEY. "
              "For security purposes, this is not recommended.\n")
        return 'your_secret_key'


def get_weather_api_key():
    try:
        from project_folder import local_config
        return local_config.WEATHER_API_KEY
    except (ImportError, AttributeError):
        print("\nWarning: settings.WEATHER_API_KEY has not been set. "
              "The HTMX weather demo will not work properly.\n")
        return 'your_weather_api_key'


def get_static_root():
    try:
        from project_folder import local_config
        return local_config.STATIC_ROOT
    except (ImportError, AttributeError):
        return None


def get_static_url():
    try:
        from project_folder import local_config
        return local_config.STATIC_URL
    except (ImportError, AttributeError):
        return '/static/'


def get_staticfiles_dirs():
    try:
        from project_folder import local_config
        return local_config.STATICFILES_DIRS
    except (ImportError, AttributeError):
        return [os_path_join(BASE_DIR, 'static')]


def get_user_analytics_script():
    try:
        from project_folder import local_config
        return local_config.USER_ANALYTICS_SCRIPT
    except (ImportError, AttributeError):
        return ''


def get_captcha_flite_path():
    try:
        from project_folder import local_config
        return local_config.CAPTCHA_FLITE_PATH
    except (ImportError, AttributeError):
        return None
