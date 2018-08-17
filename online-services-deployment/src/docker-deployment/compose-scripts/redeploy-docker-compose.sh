#!/bin/bash

if [ $# -eq 0 ]; then
  ENV_SLUG=local
else
  ENV_SLUG=$1
fi

# undeploy
./undeploy-docker-compose.sh $ENV_SLUG

# deploy
./deploy-docker-compose.sh $ENV_SLUG
