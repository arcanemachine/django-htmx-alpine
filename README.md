# django-htmx-alpine 

This project is just a basic todo list.

However, it is made using a combination of [Django](https://www.djangoproject.com/), [Alpine.JS](https://openweathermap.org/api) and [HTMX](https://htmx.org/), and shows how you can get the reactivity of a frontend JS framework without sacrificing the benefits of your server-side framework (Session authentication, templating, etc).

## Setup Instructions

- Use [Poetry](https://python-poetry.org/docs/) to create a virtualenv and install the required dependencies
  - `poetry install`

- Activate the virtualenv
  - `poetry shell`

- You can generate a new secret key from the Django shell (`manage.py shell`) and set it as the `SECRET_KEY` in `settings.py`:
`from django.core.management import utils
    print(utils.get_random_secret_key())`

- Run `manage.py migrate` to generate a database.
- Run `manage.py runserver` to start the development server

- If you want the HTMX weather demo to work, update `settings.WEATHER_API_KEY` with an API key from [OpenWeather](https://openweathermap.org/api) using the 'Current Weather Data' API.
