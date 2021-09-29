#!/usr/bin/bash

stty sane  # prevent garbled text over ssh
python $DJANGO_BASE_DIR/manage.py runserver 0.0.0.0:8005
