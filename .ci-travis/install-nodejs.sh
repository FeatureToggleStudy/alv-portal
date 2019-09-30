#!/bin/bash

NODE_VERSION=$1

echo "Using nodejs version: $NODE_VERSION..."

# clean out default nvm and install the latest
rm -rf ~/.nvm
git clone https://github.com/creationix/nvm.git ~/.nvm

# workaround: on a travis VM, it is required to load the nvm function before using nvm/node
source ~/.nvm/nvm.sh

echo "Installing nodejs..."
nvm install $NODE_VERSION

echo "Setting installed nodejs version as system default..."
nvm alias default $NODE_VERSION
