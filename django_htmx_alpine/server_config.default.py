from os.path import join as os_path_join
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = True

SERVER_TYPE = 'dev'
SERVER_URL = 'http://192.168.1.120:8000'

# i18n
TIME_ZONE = 'UTC'

# static
STATIC_URL = '/static/'
STATICFILES_DIRS = [os_path_join(BASE_DIR, 'static')]
STATIC_ROOT = None
