#/bin/bash

gunicorn -w 1 -b 0.0.0.0:8005 django_htmx_alpine.wsgi
