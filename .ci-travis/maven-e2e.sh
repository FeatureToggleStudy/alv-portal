#!/usr/bin/env bash

# workaround: on a travis VM, it is required to load the nvm function before using nvm/node (maven build calls npm)
source ~/.nvm/nvm.sh
echo "Running integration-tests..."
./mvnw integration-test
