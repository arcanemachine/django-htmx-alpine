# django-htmx-alpine 

This project is just a basic todo list.

However, it is made using a combination of [Django](https://www.djangoproject.com/), [Alpine.JS](https://openweathermap.org/api) and [HTMX](https://htmx.org/), and shows how you can get the reactivity of a frontend JS framework without sacrificing the benefits of your server-side framework (Session authentication, templating, etc).

A live demo can be seen [here](https://django-htmx-alpine.nicholasmoen.com/).

## Setup Instructions

- Create a virtualenv and install the required dependencies
  - Using [Poetry](https://python-poetry.org/docs/) (recommended):
    - Create a virtualenv and install the required dependencies
      - Dev/Testing environment: `poetry install`
      - Production environment: `poetry install --no-dev`
    - Activate the virtualenv
      - `poetry shell`
  - Using [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/):
    - Create a new virtualenv
      - `mkvirtualenv django-htmx-alpine`
    - Activate the virtualenv
      - `workon django-htmx-alpine` -or- `source ~/[your_virtualenv_dir]/bin/activate`
    - From the project's root folder (`django_htmx_alpine`), install the required dependencies
      - `pip install -r requirements.txt`
  - Running tests
    - From the project's root folder, run `npm install`.
    - To run unit tests, run `npm run jest`.
    - To run e2e tests, run `npm run cypress`.

- (optional) You can generate a new secret key from the Django shell (`manage.py shell`) and set it as the `SECRET_KEY` in `settings.py`:
`from django.core.management import utils
    print(utils.get_random_secret_key())`

- Run `manage.py migrate` to generate a database.
- Run `manage.py runserver` to start the development server

- If you want the HTMX weather demo to work, update `settings.WEATHER_API_KEY` with an API key from [OpenWeather](https://openweathermap.org/api) using the 'Current Weather Data' API.
