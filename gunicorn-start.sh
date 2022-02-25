#!/bin/bash

gunicorn -w 1 -b 127.0.0.1:8005 django_htmx_alpine.wsgi
