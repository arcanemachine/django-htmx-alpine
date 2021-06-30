import json
import requests
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView

from project_folder import helpers as h


class AboutTemplateView(TemplateView):
    template_name = 'about.html'


@require_http_methods(['POST'])
def get_weather(request):
    # get data from form
    city = request.POST.get('city')
    units = request.POST.get('units')

    # build weather api url
    api_key = settings.WEATHER_API_KEY
    weather_api_url = 'https://api.openweathermap.org/data/2.5/weather'
    url = f'{weather_api_url}?q={city}&appid={api_key}&units={units}'

    # get response
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        data = data['main']
        temperature = h.round_half_up(data['temp'], 1)
        units = 'Fahrenheit' if units == 'imperial' else 'Celsius'
        return HttpResponse(
            f'The temperature in {city} is {temperature} degrees {units}.')
    else:
        if response.text:
            return HttpResponse(f"Error {response.status_code}: "
                                f"{json.loads(response.text)['message']}")
        else:
            return HttpResponse(
                f'We could not find the temperature for {city}.')
