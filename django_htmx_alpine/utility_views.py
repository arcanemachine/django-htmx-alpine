from django.http import HttpResponse
from django.middleware.csrf import get_token


def dummy_view(request):
    response = HttpResponse()
    return response


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


def get_csrf_token(request):
    return HttpResponse(get_token(request))


def user_is_authenticated(request):
    return HttpResponse('true' if request.user.is_authenticated else 'false')
