#!/bin/bash

DEPLOY_USER=$1
DEPLOY_HOST=$2
DEPLOY_KEY=$3
ENV_SLUG=$4

DEPLOY_SOURCE_DIR=online-services-deployment/target/docker
DEPLOY_DEST_DIR=/tmp/os-deployment
DEPLOY_KEY_DECRYPTED=deploy_key.dec

echo "Using deploy user: $DEPLOY_USER..."
echo "Using deploy host: $DEPLOY_HOST..."
echo "Using deploy key file: $DEPLOY_KEY..."
echo "Using env slug: $ENV_SLUG..."

echo "Decrypting deployment key..."
openssl aes-256-cbc -K $encrypted_8010cca7bd1e_key -iv $encrypted_8010cca7bd1e_iv -in $DEPLOY_KEY -out $DEPLOY_KEY_DECRYPTED -d
chmod 600 $DEPLOY_KEY_DECRYPTED

echo "Deploying the application..."
ssh -i $DEPLOY_KEY_DECRYPTED -o "StrictHostKeyChecking no" $DEPLOY_USER@$DEPLOY_HOST "rm -rf $DEPLOY_DEST_DIR && mkdir $DEPLOY_DEST_DIR"
scp -r -i $DEPLOY_KEY_DECRYPTED -o "StrictHostKeyChecking no" $DEPLOY_SOURCE_DIR/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_DEST_DIR
ssh -i $DEPLOY_KEY_DECRYPTED -o "StrictHostKeyChecking no" $DEPLOY_USER@$DEPLOY_HOST "chmod +x $DEPLOY_DEST_DIR/*.sh"
ssh -i $DEPLOY_KEY_DECRYPTED -o "StrictHostKeyChecking no" $DEPLOY_USER@$DEPLOY_HOST "cd $DEPLOY_DEST_DIR && ./deploy-docker-stack.sh $ENV_SLUG"
