from django.db import models


class Task(models.Model):
    description = models.CharField(max_length=127, null=True)
    is_complete = models.BooleanField(default=False)
