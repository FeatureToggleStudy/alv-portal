#!/bin/bash

DOCKER_STACK_SUFFIX=$1

docker stack remove os-$DOCKER_STACK_SUFFIX

sleep 10

docker stack deploy --prune --with-registry-auth --compose-file docker-compose.yml os-$DOCKER_STACK_SUFFIX
