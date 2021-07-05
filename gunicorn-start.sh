#/bin/bash

gunicorn -w 3 -b 0.0.0.0:8005 django_htmx_alpine.wsgi
