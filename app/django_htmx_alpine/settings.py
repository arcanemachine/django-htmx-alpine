import os

from . import helpers as h, keys, local_config


BASE_DIR = h.BASE_DIR

SECRET_KEY = os.environ.get('SECRET_KEY', None)
WEATHER_API_KEY = keys.WEATHER_API_KEY
USER_ANALYTICS_SCRIPT = keys.USER_ANALYTICS_SCRIPT

DEBUG = local_config.DEBUG  # default: True
ALLOWED_HOSTS = local_config.ALLOWED_HOSTS


# *********************** BEGIN local config *********************** #
"""
This section contains some values that may differ between servers,
or sensitive content that you don't want committed to source control.

The default values are set to allow for easy deployment.

They may be overridden, and will be checked in the following order:
    - By using an environment variable that starts with 'DJANGO_'.
        - e.g. 'DJANGO_SECRET_KEY'
    - In django_htmx_alpine/local_config.py
        - An example template may be copied over from local_config.default.py
    - If setting exists in both environment variable and local_config.py,
      then the environment variable will be used.
    - You may also override the settings directly below.
        - However, setting them in local_config.py will prevent any
          sensitive/server-specific information from getting into the repo,
          with no additional effort required on your part.
"""


SHOW_WARNING = True  # set False to disable default config warnings on console

# important stuff

# analytics
USER_ANALYTICS_SCRIPT = h.get_user_analytics_script()  # default: ''

# *********************** END local config *********************** #


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
                      'django.contrib.messages.context_processors.messages',
                      'django_htmx_alpine.context_processors.helpers']}}]

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

# static files
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATIC_URL = '/staticfiles/'
STATICFILES_DIRS = [BASE_DIR / 'static']

# captcha
CAPTCHA_CHALLENGE_FUNCT = 'captcha.helpers.random_char_challenge'
# CAPTCHA_FLITE_PATH = '~/.local/bin/flite'  # audio captcha - flite binary path  # noqa: E501
CAPTCHA_FLITE_PATH = None
CAPTCHA_LENGTH = 5
CAPTCHA_NOISE_FUNCTIONS = ('captcha.helpers.noise_dots',)
CAPTCHA_LETTER_ROTATION = (-15, 20)
CAPTCHA_TIMEOUT = 3
CAPTCHA_TEST_MODE = DEBUG  # enable captcha test mode if DEBUG == True
