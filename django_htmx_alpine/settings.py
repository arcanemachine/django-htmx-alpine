from os.path import join as os_path_join
from pathlib import Path

from project_folder import helpers as h

BASE_DIR = Path(__file__).resolve().parent.parent

# set custom debug status here; default is True
DEBUG = None

if not DEBUG:
    DEBUG = h.get_settings_debug()

# set a custom SECRET_KEY here; default is 'default_secret_key'
SECRET_KEY = None

if not SECRET_KEY:
    SECRET_KEY = h.get_settings_secret_key()

# set OpenWeather API key here; default is 'your_weather_api_key'
WEATHER_API_KEY = None

if not WEATHER_API_KEY:
    WEATHER_API_KEY = h.get_settings_weather_api_key()


ALLOWED_HOSTS = ['*']

INSTALLED_APPS = ['django.contrib.admin', 'django.contrib.auth',
                  'django.contrib.contenttypes', 'django.contrib.sessions',
                  'django.contrib.messages', 'django.contrib.staticfiles',
                  # local
                  'tasks.apps.TasksConfig',
                  'users.apps.UsersConfig',
                  # third-party
                  'captcha']

MIDDLEWARE = ['django.middleware.security.SecurityMiddleware',
              'django.contrib.sessions.middleware.SessionMiddleware',
              'django.middleware.common.CommonMiddleware',
              'django.middleware.csrf.CsrfViewMiddleware',
              'django.contrib.auth.middleware.AuthenticationMiddleware',
              'django.contrib.messages.middleware.MessageMiddleware',
              'django.middleware.clickjacking.XFrameOptionsMiddleware']

ROOT_URLCONF = 'django_htmx_alpine.urls'

TEMPLATES = [{'BACKEND': 'django.template.backends.django.DjangoTemplates',
              'DIRS': ['templates'],
              'APP_DIRS': True,
              'OPTIONS': {
                  'context_processors': [
                      'django.template.context_processors.debug',
                      'django.template.context_processors.request',
                      'django.contrib.auth.context_processors.auth',
                      'django.contrib.messages.context_processors.messages']}}]

WSGI_APPLICATION = 'django_htmx_alpine.wsgi.application'

DATABASES = {'default': {
                 'ENGINE': 'django.db.backends.sqlite3',
                 'NAME': BASE_DIR / 'db.sqlite3'}}

PW_VALIDATION_PREFIX = 'django.contrib.auth.password_validation'
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': f'{PW_VALIDATION_PREFIX}.UserAttributeSimilarityValidator'},
    {'NAME': f'{PW_VALIDATION_PREFIX}.MinimumLengthValidator'},
    {'NAME': f'{PW_VALIDATION_PREFIX}.CommonPasswordValidator'},
    {'NAME': f'{PW_VALIDATION_PREFIX}.NumericPasswordValidator'}]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = USE_L10N = USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# auth
LOGIN_URL = 'users:login'
LOGIN_REDIRECT_URL = 'tasks:task_list'
LOGOUT_REDIRECT_URL = 'tasks:task_list'

# captcha
CAPTCHA_CHALLENGE_FUNCT = 'captcha.helpers.random_char_challenge'
CAPTCHA_LENGTH = 5
CAPTCHA_NOISE_FUNCTIONS = ('captcha.helpers.noise_dots',)
CAPTCHA_LETTER_ROTATION = (-15, 20)
CAPTCHA_TIMEOUT = 3
CAPTCHA_TEST_MODE = DEBUG  # enable captcha test mode if DEBUG == True

# static
STATIC_URL = '/static/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]
STATIC_ROOT = None

