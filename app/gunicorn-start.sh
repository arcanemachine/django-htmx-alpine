#!/bin/bash

cd $(dirname "$0")

gunicorn -w 1 -b 0.0.0.0:8007 django_htmx_alpine.wsgi
