#!/bin/bash

cd $(dirname "$0")

stty sane  # prevent garbled text over ssh
python3 manage.py runserver 0.0.0.0:8007
