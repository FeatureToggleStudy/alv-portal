#!/bin/bash

if [ $# -eq 0 ]; then
  ENV_SLUG=local
else
  ENV_SLUG=$1
fi

echo "Undeploying docker stack 'os-$ENV_SLUG...'"

docker stack remove os-$ENV_SLUG
