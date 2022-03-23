import os

"""
This file is for assigning local settings without using environment variables,
or for settings that require Python-specific functionality and thus cannot use
environment variables.
"""

# important stuff
DEBUG = False
ALLOWED_HOSTS = ['django-htmx-alpine.test.moendigitalservices.com']

WEATHER_API_KEY = os.environ.get('WEATHER_API_KEY', 'add_weather_key_to_local_config')  # OpenWeatherMap API key  # noqa: E501

# user analytics script, e.g. `<script src="analytics.js"></script>`
USER_ANALYTICS_SCRIPT = ''

# django-simple-captcha
CAPTCHA_FLITE_PATH = None  # audio captcha - flite binary path
