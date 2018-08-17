#!/bin/bash

if [ $# -eq 0 ]; then
  ENV_SLUG=local
else
  ENV_SLUG=$1
fi

# undeploy
./undeploy-docker-stack.sh $ENV_SLUG

sleep 10

# deploy
./deploy-docker-stack.sh $ENV_SLUG
