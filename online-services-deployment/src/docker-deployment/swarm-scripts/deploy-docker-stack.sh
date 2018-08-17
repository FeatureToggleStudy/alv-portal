#!/bin/bash

if [ $# -eq 0 ]; then
  ENV_SLUG=local
else
  ENV_SLUG=$1
fi

echo "Deploying docker stack 'os-$ENV_SLUG...'"

# deploy
env $(cat "./../conf/$ENV_SLUG.env" | xargs) docker stack deploy --prune --with-registry-auth --compose-file ./../docker-compose.yml os-$ENV_SLUG
