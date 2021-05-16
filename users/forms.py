from captcha.fields import CaptchaField
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

UserModel = get_user_model()


class NewUserCreationForm(UserCreationForm):
    captcha = CaptchaField(label="CAPTCHA")
    # captcha = CaptchaField(
    #     label="CAPTCHA", help_text=c.FORM_FIELD_CAPTCHA_HELP_TEXT)

    class Meta:
        model = UserModel
        fields = UserCreationForm.Meta.fields + ('email',)

    def clean_username(self):
        return self.data['username'].lower()


class UserAuthenticationForm(AuthenticationForm):
    captcha = CaptchaField()

    def clean_username(self):
        return self.data['username'].lower()
