#!/bin/bash

ARTIFACTORY_USERNAME=$1
ARTIFACTORY_PASSWORD=$2

echo "Using artifactory username: $ARTIFACTORY_USERNAME..."
echo "Using artifactory password: $ARTIFACTORY_PASSWORD..."

echo "Building and pushing the project docker image..."
./mvnw -pl alv-portal-webapp dockerfile:build dockerfile:push -Ddockerfile.username=${ARTIFACTORY_USERNAME} -Ddockerfile.password=${ARTIFACTORY_PASSWORD}

