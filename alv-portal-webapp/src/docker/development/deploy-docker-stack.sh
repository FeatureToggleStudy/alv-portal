#!/bin/bash

ENV_SLUG=$1

echo "Deploying docker stack 'alv-portal-$ENV_SLUG...'"

docker stack deploy --prune --with-registry-auth --compose-file ./docker-compose.yml alv-portal-$ENV_SLUG
