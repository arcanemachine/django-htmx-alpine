"""
Run these commands from django shell to generate a new SECRET_KEY:

from django.core.management import utils
print(utils.get_random_secret_key())

"""

DEBUG = True
SECRET_KEY = 'your_secret_key'

# OpenWeatherMap API key
WEATHER_API_KEY = 'your_weather_api_key'
