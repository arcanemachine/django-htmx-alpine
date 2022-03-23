#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

echo "Running 'entrypoint.sh'..."
echo "PROJECT_NAME_PYTHON is set to: '$PROJECT_NAME_PYTHON'"
echo "PROJECT_PORT_INTERNAL is set to: '$PROJECT_PORT_INTERNAL'"

# run basic setup
../docker/init.sh

# collect static files
echo "Collecting static files..."
python3 manage.py collectstatic --noinput

# run migrations
python3 manage.py makemigrations
python3 manage.py migrate

exec "$@"
