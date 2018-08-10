#!/bin/bash

URL=$1

echo "Downloading 'wait-for-it' script..."
wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
chmod +x ./wait-for-it.sh

echo "Checking application health..."
./wait-for-it.sh -t 60 $URL -- echo "Online Services App is UP!"

