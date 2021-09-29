from os.path import join as os_path_join

from .helpers import BASE_DIR

"""
This file is for assigning local settings without using environment variables,
or for settings that require Python-specific functionality and thus cannot use
environment variables.
"""

# important stuff
DEBUG = True
SECRET_KEY = 'your_secret_key'
WEATHER_API_KEY = 'your_weather_api_key'  # OpenWeatherMap API key

# static files - production server - basic config
STATIC_ROOT = os_path_join(BASE_DIR, 'staticfiles')
STATIC_URL = '/staticfiles/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]

# Note: these 3 lines will override the 3 identical variables listed above
# static files - development server - basic config
STATIC_ROOT = None
STATIC_URL = '/static/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]

# user analytics script, e.g. `<script src="analytics.js"></script>`
USER_ANALYTICS_SCRIPT = ''

# django-simple-captcha
CAPTCHA_FLITE_PATH = None  # audio captcha - flite binary path
