#!/bin/bash

BUILD_VERSION=$1
TRAVIS_BRANCH=$2
ARTIFACTORY_USERNAME=$3
ARTIFACTORY_PASSWORD=$4

echo "Using build version: $BUILD_VERSION..."
echo "Using artifactory username: $ARTIFACTORY_USERNAME..."
echo "Using artifactory password: $ARTIFACTORY_PASSWORD..."

# workaround: on a travis VM, it is required to load the nvm function before using nvm/node (maven build calls npm)
source ~/.nvm/nvm.sh

echo "Setting the project version (mvn and npm) to the version: $BUILD_VERSION.."
./mvnw initialize -DnewVersion=$BUILD_VERSION

echo "Building and deploying Maven artifacts..."
if [ "$TRAVIS_BRANCH" == "master" ];
then
  ./mvnw deploy -Pdocker -Powasp-dependency-check -Ddockerfile.username=${ARTIFACTORY_USERNAME} -Ddockerfile.password=${ARTIFACTORY_PASSWORD};
else
  ./mvnw package;
fi
