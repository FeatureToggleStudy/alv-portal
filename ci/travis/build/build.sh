#!/bin/bash

PROJECT_VERSION=$1
TRAVIS_BRANCH=$2
TRAVIS_BUILD_NUMBER=$3
ARTIFACTORY_USERNAME=$4
ARTIFACTORY_PASSWORD=$5

echo "Using project version: $PROJECT_VERSION..."
echo "Using travis branch: $TRAVIS_BRANCH..."
echo "Using travis build number: $TRAVIS_BUILD_NUMBER..."
echo "Using artifactory username: $ARTIFACTORY_USERNAME..."
echo "Using artifactory password: $ARTIFACTORY_PASSWORD..."

export BRANCH_VERSION_SUFFIX=$([ "$TRAVIS_BRANCH" == "master" ] && echo "" || echo "-${TRAVIS_BRANCH//\//-}")
export BUILD_VERSION=$PROJECT_VERSION-build-$TRAVIS_BUILD_NUMBER$BRANCH_VERSION_SUFFIX

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
