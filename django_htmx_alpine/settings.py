from project_folder import helpers as h

BASE_DIR = h.BASE_DIR


# *********************** BEGIN local config *********************** #
"""
This section contains some values that may differ between servers,
or sensitive content that you don't want committed to source control.

The default values are set to allow for easy deployment.

They may be overridden, and will be checked in the following order:
    - By using an environment variable that starts with 'DJANGO_'.
        - e.g. 'DJANGO_SECRET_KEY'
    - In project_folder/local_config.py
        - An example template may be copied over from local_settings.default.py
    - If setting exists in both environment variable and local_config.py,
      then the environment variable will be used.
    - You may also override the settings directly below.
        - However, setting them in local_config.py will prevent any
          sensitive/server-specific information from getting into the repo,
          with no additional effort required on your part.
"""


SHOW_WARNING = True  # set False to disable default config warnings on console

# important stuff
DEBUG = h.get_debug()  # default: True
SECRET_KEY = h.get_secret_key()  # default: 'your_secret_key'
WEATHER_API_KEY = h.get_setting(  # required for htmx weather demo
    'WEATHER_API_KEY', 'your_weather_key', str, SHOW_WARNING)

# static files
STATIC_ROOT = h.get_static_root()  # default: None
STATIC_URL = h.get_static_url()  # default: '/static/'
STATICFILES_DIRS = \
    h.get_staticfiles_dirs()  # default: [os_path_join(BASE_DIR, 'static')]

# analytics
USER_ANALYTICS_SCRIPT = h.get_user_analytics_script()  # default: ''

# django-simple-captcha
CAPTCHA_FLITE_PATH = h.get_captcha_flite_path()  # default: None

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
                      'django.contrib.messages.context_processors.messages',
                      'project_folder.context_processors.helpers']}}]

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
