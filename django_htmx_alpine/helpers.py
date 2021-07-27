import os
from pathlib import Path
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
def get_setting(val, default=None, cast=str, show_warning=False):
    """
    Get setting from environment variable, local_config, or default.
    Settings are prioritized in the order given above.
    """
    env_result = None
    lc_result = None
    if os.environ.get(f'DJANGO_{val}'):
        # check environment variables
        env_result = os.environ[f'DJANGO_{val}']
    try:
        # check local_config.py
        from . import local_config  # noqa: 401
        lc_result = eval(f"local_config.{val}")
        if env_result:
            # if setting exists in environment variable and local_config.py,
            # then use the environment variable value
            print(f"\n{val} has been set in both environment variable and "
                  "local_config.py.\n"
                  f"Using environment variable value ({val} = {env_result})\n")
            return cast(env_result)
        else:
            return lc_result
    except (ImportError, AttributeError):
        if show_warning and not env_result:
            # show warning in the console
            if val == 'SECRET_KEY':
                print("\nWarning: You are using the default SECRET_KEY. "
                      "For security purposes, this is not recommended.\n")
            elif val == 'WEATHER_API_KEY':
                print("\nWarning: settings.WEATHER_API_KEY has not been set. "
                      "The HTMX weather demo will not work properly.\n")
            elif val == 'DEBUG':
                print(f"\nNote: You have not set a value for settings.{val}, "
                      f"so it has been set to a default value of {default}.\n")
        # return default value if env_result not found
        return cast(env_result) if env_result else default


def get_debug():
    try:
        from . import local_config
        return local_config.DEBUG
    except (ImportError, AttributeError):
        print("\nNote: You have not set a value for settings.DEBUG, so it "
              "has been set to True by default.\n")
        return True


def get_secret_key():
    try:
        from . import local_config
        return local_config.SECRET_KEY
    except (ImportError, AttributeError):
        print("\nWarning: You are using the default SECRET_KEY. "
              "For security purposes, this is not recommended.\n")
        return 'your_secret_key'


def get_static_root():
    try:
        from . import local_config
        return local_config.STATIC_ROOT
    except (ImportError, AttributeError):
        return None


def get_static_url():
    try:
        from . import local_config
        return local_config.STATIC_URL
    except (ImportError, AttributeError):
        return '/static/'


def get_staticfiles_dirs():
    try:
        from . import local_config
        return local_config.STATICFILES_DIRS
    except (ImportError, AttributeError):
        return [os.path.join(BASE_DIR, 'static')]


def get_user_analytics_script():
    try:
        from . import local_config
        return local_config.USER_ANALYTICS_SCRIPT
    except (ImportError, AttributeError):
        return ''


def get_captcha_flite_path():
    try:
        from . import local_config
        return local_config.CAPTCHA_FLITE_PATH
    except (ImportError, AttributeError):
        return None
