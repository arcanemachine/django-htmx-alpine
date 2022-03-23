#!/bin/bash

cd $(dirname "$0")

./manage.py makemigrations
./manage.py migrate
