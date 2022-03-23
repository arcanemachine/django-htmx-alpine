#!/bin/bash

if [ "$PROJECT_NAME_PYTHON" == "" ]; then
  echo "*** WARNING: PROJECT_NAME_PYTHON not set. ***"
fi

echo "Running 'init.sh'..."

cd $(dirname "$0")/../app
app_path=$(pwd)

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

# ensure keys.py exists
$app_path/../docker/generate-keys

# use proper server_config_file
cd $PROJECT_NAME_PYTHON
base_config_path="local_config.py"
current_config_path="local_config.$SERVER_ENVIRONMENT.py"

echo "Symlinking '$SERVER_ENVIRONMENT' config file to '$base_config_path'"
ln -sf $current_config_path $base_config_path
