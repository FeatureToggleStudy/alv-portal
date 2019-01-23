#!/bin/bash

ARTIFACTORY_USERNAME=$1
ARTIFACTORY_PASSWORD=$2

echo "Using artifactory username: $ARTIFACTORY_USERNAME..."
echo "Using artifactory password: $ARTIFACTORY_PASSWORD..."

# workaround: on a travis VM, it is required to load the nvm function before using nvm/node (maven build calls npm)
source ~/.nvm/nvm.sh

echo "Building and deploying Maven and docker artifacts..."
./mvnw deploy -Pdocker -Ddockerfile.username=${ARTIFACTORY_USERNAME} -Ddockerfile.password=${ARTIFACTORY_PASSWORD};

