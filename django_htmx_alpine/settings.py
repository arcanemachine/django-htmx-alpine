from project_folder import keys, server_config

BASE_DIR = server_config.BASE_DIR

SECRET_KEY = keys.SECRET_KEY
DEBUG = server_config.DEBUG

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
TIME_ZONE = server_config.TIME_ZONE
USE_I18N = USE_L10N = USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# auth
LOGIN_URL = 'users:login'
LOGIN_REDIRECT_URL = 'project_root'
LOGOUT_REDIRECT_URL = 'project_root'

# captcha
CAPTCHA_CHALLENGE_FUNCT = 'captcha.helpers.random_char_challenge'
CAPTCHA_LENGTH = 5
CAPTCHA_NOISE_FUNCTIONS = ('captcha.helpers.noise_dots',)
CAPTCHA_LETTER_ROTATION = (-15, 20)
CAPTCHA_TIMEOUT = 3
CAPTCHA_TEST_MODE = DEBUG  # enable captcha test mode if DEBUG == True

# static
STATIC_URL = server_config.STATIC_URL
STATICFILES_DIRS = server_config.STATICFILES_DIRS
STATIC_ROOT = server_config.STATIC_ROOT
