from captcha import helpers as captcha_helpers, models as captcha_models
from django.contrib import messages
from django.conf import settings
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import login as auth_login, logout as auth_logout, \
    get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.views.decorators.cache import never_cache
# from django.views.decorators.http import require_http_methods
from django.views.generic import CreateView, DeleteView, DetailView
from django.urls import reverse, reverse_lazy
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext_lazy as _

from . import forms

UserModel = get_user_model()


def users_root(request):
    return HttpResponseRedirect(reverse('users:user_detail_me'))


class UserRegisterView(CreateView):
    form_class = forms.NewUserCreationForm
    template_name = 'users/register.html'
    success_url = reverse_lazy(settings.LOGIN_URL)

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.success_url)
        return super().dispatch(request, *args, **kwargs)


class UserLoginView(LoginView):
    form_class = forms.UserAuthenticationForm
    template_name = 'placeholder.html'

    def dispatch(self, request, *args, **kwargs):
        if request.method == 'GET':
            # generate captcha
            captcha_key = captcha_models.CaptchaStore.pick()
            captcha_img_url = captcha_helpers.captcha_image_url(captcha_key)
            context = {'captcha_key': captcha_key,
                       'captcha_img_url': captcha_img_url}
            return render(request, 'users/login.html', context)
        return super().dispatch(request, *args, **kwargs)

    def form_invalid(self, form):
        form_errors = \
            ', <br> '.join([''.join(val) for val in form.errors.values()]) \
            .replace('. ', '. <br> ')
        context = {'form_errors': form_errors}
        return render(self.request, 'users/login_fail.html', context)

    def form_valid(self, form):
        auth_login(self.request, form.get_user())
        return render(self.request, 'users/login_success.html')


class UserLogoutView(LogoutView):
    success_message = _("You are now logged out.")

    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        messages.success(self.request, self.success_message)
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            response = HttpResponse()
            response.status_code = 401
            return response
        elif request.user.is_authenticated:
            auth_logout(request)
            response = HttpResponse()
            response.status_code = 200
            return response


class UserDetailMeView(LoginRequiredMixin, DetailView):
    template_name = 'users/user_detail_me.html'

    def get_object(self):
        return self.request.user


class UserDeleteView(LoginRequiredMixin, DeleteView):
    template_name = 'users/user_delete.html'

    def get_object(self):
        return self.request.user
