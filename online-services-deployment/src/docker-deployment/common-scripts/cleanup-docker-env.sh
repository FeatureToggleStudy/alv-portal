#!/bin/bash

echo "Cleaning up all docker resources related to 'online-services' ..."

docker system prune -f -a --filter "label=ch.admin.seco.onlineservices.app=online-services-web"
