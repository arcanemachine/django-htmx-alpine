from os.path import join as os_path_join

from project_folder.helpers import BASE_DIR

"""
To generate a new SECRET_KEY, run these commands from django shell:

from django.core.management import utils
print(utils.get_random_secret_key())

"""

# important stuff
DEBUG = True
SECRET_KEY = 'your_secret_key'
WEATHER_API_KEY = 'your_weather_api_key'  # OpenWeatherMap API key

# static files - production server - basic config
STATIC_ROOT = os_path_join(BASE_DIR, 'staticfiles')
STATIC_URL = '/staticfiles/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]

# Note: these settings will override the 3 identical variables listed above
# static files - development server - basic config
STATIC_ROOT = None
STATIC_URL = '/static/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]

# user analytics - include full script, e.g <script src="script.js"></script>
USER_ANALYTICS_SCRIPT = ''

# django-simple-captcha
CAPTCHA_FLITE_PATH = None
