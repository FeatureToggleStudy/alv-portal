#!/bin/bash

PROJECT_VERSION=$1
TRAVIS_BRANCH=$2
TRAVIS_BUILD_NUMBER=$3

echo "Using project version: $PROJECT_VERSION..."
echo "Using travis branch: $TRAVIS_BRANCH..."
echo "Using travis build number: $TRAVIS_BUILD_NUMBER..."

export BRANCH_VERSION_SUFFIX=$([ "$TRAVIS_BRANCH" == "master" ] && echo "" || echo "-${TRAVIS_BRANCH//\//-}")
export BUILD_VERSION=$PROJECT_VERSION-build-$TRAVIS_BUILD_NUMBER$BRANCH_VERSION_SUFFIX

# workaround: on a travis VM, it is required to load the nvm function before using nvm/node (maven build calls npm)
source ~/.nvm/nvm.sh

echo "Setting the project version (mvn and npm) to the version: $BUILD_VERSION.."
./mvnw initialize -DnewVersion=$BUILD_VERSION

echo "Building and deploying Maven artifacts..."
./mvnw deploy
