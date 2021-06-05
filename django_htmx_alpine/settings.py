from project_folder import helpers as h

BASE_DIR = h.BASE_DIR


# *********************** BEGIN local config *********************** #

# This section contains some values that may differ between servers.
#
# The default values are set to allow for easy deployment. They may be
# overridden in project_folder/local_config.py (an example template is
# available in local_settings.default.py). You may also override the
# settings directly below. However, setting them in local_config.py will
# prevent any sensitive/server-specific information from getting into the
# repo, with no additional effort required on your part.

# important stuff
DEBUG = h.get_debug()                        # default: True
SECRET_KEY = h.get_secret_key()              # default: 'your_secret_key'
WEATHER_API_KEY = h.get_weather_api_key()    # default: 'your_weather_api_key'

# static files
STATIC_ROOT = h.get_static_root()
STATIC_URL = h.get_static_url()
STATICFILES_DIRS = h.get_staticfiles_dirs()

# *********************** END local config *********************** #


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
