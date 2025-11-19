#!/bin/bash

# Mo-Cell Production Deployment Script
# This script deploys the Mo-Cell application with Docker and SSL

set -e

echo "======================================"
echo "Mo-Cell Production Deployment"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="mocell.rw"
EMAIL="admin@mocell.rw"  # Change this to your email for Let's Encrypt notifications
PROJECT_DIR="/var/www/mocell"
GITHUB_REPO="https://github.com/Aadiel1/mo-cell.git"

echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl start docker
    systemctl enable docker
    rm get-docker.sh
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Installing...${NC}"
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

echo -e "${GREEN}Docker and Docker Compose are installed.${NC}"

echo -e "${YELLOW}Step 2: Stopping and removing existing deployment...${NC}"

# Stop and remove existing containers
if [ -d "$PROJECT_DIR" ]; then
    cd $PROJECT_DIR
    docker-compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true
    cd ..
    rm -rf $PROJECT_DIR
fi

echo -e "${GREEN}Cleaned up existing deployment.${NC}"

echo -e "${YELLOW}Step 3: Cloning project from GitHub...${NC}"

# Clone the repository
git clone $GITHUB_REPO $PROJECT_DIR
cd $PROJECT_DIR

echo -e "${GREEN}Project cloned successfully.${NC}"

echo -e "${YELLOW}Step 4: Setting up environment...${NC}"

# Copy .env.example to .env if not exists
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}Please update .env file with your configuration${NC}"
fi

echo -e "${YELLOW}Step 5: Creating directories for SSL...${NC}"

# Create necessary directories
mkdir -p certbot/conf
mkdir -p certbot/www
mkdir -p certbot/dhparam
mkdir -p logs

echo -e "${GREEN}Directories created.${NC}"

echo -e "${YELLOW}Step 6: Generating DH parameters (this may take a few minutes)...${NC}"

# Generate DH parameters if not exists
if [ ! -f certbot/dhparam/dhparam.pem ]; then
    openssl dhparam -out certbot/dhparam/dhparam.pem 2048
fi

echo -e "${GREEN}DH parameters generated.${NC}"

echo -e "${YELLOW}Step 7: Starting containers without SSL for initial setup...${NC}"

# Create a temporary nginx config without SSL for Let's Encrypt verification
cat > nginx.temp.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name mocell.rw www.mocell.rw;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            proxy_pass http://mocell-app:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
EOF

# Temporarily use the temp config
cp nginx.prod.conf nginx.prod.conf.backup
cp nginx.temp.conf nginx.prod.conf

# Start containers
docker-compose -f docker-compose.prod.yml up -d nginx mocell-app

sleep 5

echo -e "${GREEN}Containers started.${NC}"

echo -e "${YELLOW}Step 8: Obtaining SSL certificate from Let's Encrypt...${NC}"

# Get SSL certificate
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

if [ $? -eq 0 ]; then
    echo -e "${GREEN}SSL certificate obtained successfully!${NC}"

    # Restore the production nginx config with SSL
    cp nginx.prod.conf.backup nginx.prod.conf
    rm nginx.prod.conf.backup nginx.temp.conf

    # Restart nginx with SSL config
    docker-compose -f docker-compose.prod.yml restart nginx

    # Start certbot for auto-renewal
    docker-compose -f docker-compose.prod.yml up -d certbot

    echo -e "${GREEN}SSL configured and auto-renewal enabled!${NC}"
else
    echo -e "${RED}Failed to obtain SSL certificate. Please check DNS settings.${NC}"
    echo -e "${YELLOW}Make sure $DOMAIN and www.$DOMAIN point to this server.${NC}"
    cp nginx.prod.conf.backup nginx.prod.conf
    rm nginx.prod.conf.backup nginx.temp.conf
fi

echo -e "${YELLOW}Step 9: Verifying deployment...${NC}"

# Show running containers
docker-compose -f docker-compose.prod.yml ps

echo ""
echo -e "${GREEN}======================================"
echo "Deployment Complete!"
echo "======================================${NC}"
echo ""
echo "Your site should be accessible at:"
echo "  - http://$DOMAIN (redirects to HTTPS)"
echo "  - https://$DOMAIN"
echo "  - https://www.$DOMAIN"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  - Restart: docker-compose -f docker-compose.prod.yml restart"
echo "  - Stop: docker-compose -f docker-compose.prod.yml down"
echo "  - Update from GitHub: git pull && docker-compose -f docker-compose.prod.yml up -d --build"
echo ""
