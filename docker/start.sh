#!/bin/bash

cd /app

if [ $# -eq 0 ]; then
    echo "Usage: start.sh [PROCESS_TYPE](server/beat/worker/flower)"
    exit 1
fi

PROCESS_TYPE=$1

# set server environment
if [ "${SERVER_ENVIRONMENT:0:3}" == "dev" ]; then
  export SERVER_ENVIRONMENT=dev
elif [ "${SERVER_ENVIRONMENT:0:4}" == "test" ]; then
  export SERVER_ENVIRONMENT=test
elif [ "${SERVER_ENVIRONMENT:0:4}" == "prod" ]; then
  export SERVER_ENVIRONMENT=prod
else
  echo "*** SERVER_ENVIRONMENT must *begin* with one of: dev, test, prod ***"
  exit 1
fi
echo "Using SERVER_ENVIRONMENT: '$SERVER_ENVIRONMENT'"

if [ "$PROCESS_TYPE" = "server" ]; then
  if [ "$SERVER_ENVIRONMENT" = "dev" ]; then
    exec python3 manage.py runserver 0.0.0.0:$PROJECT_PORT_INTERNAL
  elif [ "$SERVER_ENVIRONMENT" = "test" ] || [ "$SERVER_ENVIRONMENT" = "prod" ]; then
    exec gunicorn \
      --bind 0.0.0.0:$PROJECT_PORT_INTERNAL \
      --workers 1 \
      --log-level DEBUG \
      --access-logfile "-" \
      --error-logfile "-" \
      $PROJECT_NAME_PYTHON.wsgi
  else
    echo "*** SERVER_ENVIRONMENT must begin with one of: dev, test, prod ***"
    exit 1
  fi
elif [ "$PROCESS_TYPE" = "beat" ]; then
  exec celery \
    --app dockerapp.celery_app \
    beat \
    --loglevel INFO \
    --scheduler django_celery_beat.schedulers:DatabaseScheduler
elif [ "$PROCESS_TYPE" = "flower" ]; then
  exec celery \
    --app dockerapp.celery_app \
    flower \
    --basic_auth="${CELERY_FLOWER_USER}:${CELERY_FLOWER_PASSWORD}" \
    --loglevel INFO
elif [ "$PROCESS_TYPE" = "worker" ]; then
  exec celery \
    --app dockerapp.celery_app \
    worker \
    --loglevel INFO
fi
