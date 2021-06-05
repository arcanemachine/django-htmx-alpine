from helpers import BASE_DIR
from os.path import join as os_path_join

"""
To generate a new SECRET_KEY, run these commands from django shell:

from django.core.management import utils
print(utils.get_random_secret_key())

"""

DEBUG = True
SECRET_KEY = 'your_secret_key'
WEATHER_API_KEY = 'your_weather_api_key'  # OpenWeatherMap API key

# static files - production server - basic config
STATIC_ROOT = os_path_join(BASE_DIR, 'staticfiles')
STATIC_URL = '/staticfiles/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]

# static files - development server - basic config
STATIC_ROOT = None
STATIC_URL = '/static/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]
