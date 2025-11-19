#!/bin/bash

# Let's Encrypt SSL Certificate Setup Script
# Run this before starting the production deployment

set -e

# Configuration
DOMAIN="mocell.rw"
EMAIL="admin@mocell.rw"  # Change to your email
STAGING=0  # Set to 1 for testing, 0 for production

echo "Initializing Let's Encrypt for $DOMAIN..."

# Create directories
mkdir -p certbot/conf
mkdir -p certbot/www
mkdir -p certbot/dhparam

# Download recommended TLS parameters
if [ ! -f "certbot/conf/options-ssl-nginx.conf" ]; then
    echo "Downloading recommended TLS parameters..."
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > certbot/conf/options-ssl-nginx.conf
fi

if [ ! -f "certbot/conf/ssl-dhparams.pem" ]; then
    echo "Downloading recommended DH parameters..."
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > certbot/conf/ssl-dhparams.pem
fi

# Generate DH parameters
if [ ! -f "certbot/dhparam/dhparam.pem" ]; then
    echo "Generating DH parameters (this will take a few minutes)..."
    openssl dhparam -out certbot/dhparam/dhparam.pem 2048
fi

echo "Creating dummy certificate for $DOMAIN..."
path="/etc/letsencrypt/live/$DOMAIN"
docker-compose -f docker-compose.prod.yml run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:2048 -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot

echo "Starting nginx..."
docker-compose -f docker-compose.prod.yml up --force-recreate -d nginx

echo "Deleting dummy certificate for $DOMAIN..."
docker-compose -f docker-compose.prod.yml run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$DOMAIN && \
  rm -Rf /etc/letsencrypt/archive/$DOMAIN && \
  rm -Rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

echo "Requesting Let's Encrypt certificate for $DOMAIN..."

# Select appropriate email arg
case "$EMAIL" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $EMAIL" ;;
esac

# Enable staging mode if needed
if [ $STAGING != "0" ]; then staging_arg="--staging"; fi

docker-compose -f docker-compose.prod.yml run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal" certbot

echo "Reloading nginx..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "Done! Your SSL certificate has been installed."
