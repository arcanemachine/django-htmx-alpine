#!/bin/bash

stty sane  # prevent garbled text over ssh

if [ $DJANGO_SERVER_PORT ]
then
  python $DJANGO_BASE_DIR/manage.py runserver 0.0.0.0:$DJANGO_SERVER_PORT
else
  echo "DJANGO_SERVER_PORT not specified. Using port 8005..."
  python $DJANGO_BASE_DIR/manage.py runserver 0.0.0.0:8005
fi
