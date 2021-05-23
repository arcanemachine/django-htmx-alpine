from captcha import helpers as captcha_helpers, models as captcha_models
from django.contrib import messages
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import authenticate, login as auth_login, \
    get_user_model
from django.http import HttpResponseRedirect  # , HttpResponse
from django.shortcuts import render
from django.views.decorators.cache import never_cache
from django.views.generic import CreateView
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext_lazy as _

from . import forms

UserModel = get_user_model()


def get_form_errors(form):
    for key, values in form.errors.items():
        for value in values:
            # if key == '__all__':
            #     return value
            # elif key == 'password1' or key == 'password2':
            #     return f"Password: {value}"
            # else:
            return f"{value}"


def users_root(request):
    return HttpResponseRedirect(reverse('users:user_detail_me'))


class UserRegisterView(CreateView):
    form_class = forms.NewUserCreationForm
    template_name = 'users/register.html'

    def dispatch(self, request, *args, **kwargs):
        if request.method == 'GET':
            # generate captcha
            captcha_key = captcha_models.CaptchaStore.pick()
            captcha_img_url = captcha_helpers.captcha_image_url(captcha_key)
            context = {'captcha_key': captcha_key,
                       'captcha_img_url': captcha_img_url}
            return render(request, self.template_name, context)
        return super().dispatch(request, *args, **kwargs)

    def form_invalid(self, form):
        form_errors = get_form_errors(form)

        context = {'register_fail': True,
                   'form_errors': form_errors}
        return render(self.request, self.template_name, context)

    def form_valid(self, form):
        context = {'register_success': True}

        # do not process form if honeypot field filled
        if form.cleaned_data.get('name', None):
            return render(self.request, self.template_name, context)

        self.object = form.save()
        self.object.save()

        messages.success(
            self.request,
            _("Registration successful. You have been logged in."))
        new_user = authenticate(username=form.cleaned_data['username'],
                                password=form.cleaned_data['password1'])
        auth_login(self.request, new_user)
        return render(self.request, self.template_name, context)


class UserLoginView(LoginView):
    form_class = forms.UserAuthenticationForm
    template_name = 'users/login.html'

    def dispatch(self, request, *args, **kwargs):
        if request.method == 'GET':
            # generate captcha
            captcha_key = captcha_models.CaptchaStore.pick()
            captcha_img_url = captcha_helpers.captcha_image_url(captcha_key)
            context = {'captcha_key': captcha_key,
                       'captcha_img_url': captcha_img_url}
            return render(request, self.template_name, context)
        return super().dispatch(request, *args, **kwargs)

    def form_invalid(self, form):
        form_errors = get_form_errors(form)
        context = {'login_fail': True,
                   'form_errors': form_errors}
        return render(self.request, self.template_name, context)

    def form_valid(self, form):
        auth_login(self.request, form.get_user())
        messages.success(self.request, _('You are now logged in.'))
        context = {'login_success': True}
        return render(self.request, self.template_name, context)


class UserLogoutView(LogoutView):
    success_message = _("You have been logged out.")

    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        messages.success(self.request, self.success_message)
        return super().dispatch(request, *args, **kwargs)
