# run these commands from django shell to generate new secret key:
# from django.core.management import utils
# print(utils.get_random_secret_key())
SECRET_KEY = '_z45zkzpqrv^x&x88^8+)c=k#oujctymo0o_**(828ixo$m6eq'

# db - set these if using postgres or other non-sqlite3 database
# to generate a secure database password, execute `openssl rand -base64 64`
DATABASE_USER = 'project_admin'
DATABASE_PASSWORD = \
    'ufA5SDqbAuVLrcB3QsWiccy0rR8lG67R5xfPQkv8A6hmxtInY//K6l3+JNbXm/0R'

# OpenWeatherMap API key
WEATHER_API_KEY = 'your_api_key'
