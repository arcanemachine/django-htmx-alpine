import json
import requests
from django.conf import settings
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_http_methods

from . import helpers as h


def dummy_view(request):
    response = HttpResponse()
    return response


def debugger(request):
    if request.user.is_authenticated and request.user.username == 'admin':
        breakpoint()
    return HttpResponse()


# weather
@require_http_methods(['POST'])
def get_weather(request):
    # get data from form
    city = request.POST.get('city')
    units = request.POST.get('units')

    # if the city name is blank, simulate HTTP response code 400 (Bad Request)
    if not city:
        return HttpResponse("Error 400: The city name cannot be blank.")

    # build weather API url
    api_key = settings.WEATHER_API_KEY
    weather_api_url = 'https://api.openweathermap.org/data/2.5/weather'
    url = f'{weather_api_url}?q={city}&appid={api_key}&units={units}'

    # get response from weather API server
    api_response = requests.get(url)
    if api_response.status_code == 200:
        data = api_response.json()
        data = data['main']
        temperature = h.round_half_up(data['temp'], 1)
        units = 'Fahrenheit' if units == 'imperial' else 'Celsius'
        return HttpResponse(
            f'The temperature in {city} is {temperature} degrees {units}.')
    else:
        if api_response.text:
            django_response = HttpResponse(
                f"Error {api_response.status_code}: "
                f"{json.loads(api_response.text)['message']}")
            # django_response.status_code = api_response.status_code
            return django_response
        else:
            return HttpResponse(
                f'We could not find the temperature for {city}.')


# misc
def get_csrf_token(request):
    return HttpResponse(get_token(request))


def user_is_authenticated(request):
    return HttpResponse('true' if request.user.is_authenticated else 'false')


# htmx
def htmx_response_content_unchanged(request, message='Content unchanged'):
    response = HttpResponse()
    response.status_code = 204  # HTMX does not change content if 304 returned
    response.reason_phrase = message
    return response


def htmx_response_not_authorized(request):
    return htmx_response_content_unchanged(
        request, "You are not authorized to perform this action.")


def htmx_response_login_required(request):
    return htmx_response_content_unchanged(
        request, "You must login before you can perform this action.")

