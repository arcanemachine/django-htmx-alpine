#!/bin/bash

$DJANGO_BASE_DIR/manage.py makemigrations
$DJANGO_BASE_DIR/manage.py migrate
