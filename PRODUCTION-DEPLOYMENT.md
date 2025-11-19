# Production Deployment Guide for Mo-Cell

This guide covers deploying the Mo-Cell application to your production server with Docker, Nginx, and Let's Encrypt SSL.

## Prerequisites

- Ubuntu/Debian server with root access
- Domain name (mocell.rw) pointing to your server IP
- Server IP: 10.10.118.164
- Open ports: 80 (HTTP), 443 (HTTPS)

## Quick Deployment

### Option 1: Automated Deployment (Recommended)

Run this single command on your server:

```bash
curl -fsSL https://raw.githubusercontent.com/Aadiel1/mo-cell/main/deploy.sh | bash
```

### Option 2: Manual Deployment

1. **Connect to your server:**
   ```bash
   ssh root@10.10.118.164
   ```

2. **Clone the repository:**
   ```bash
   cd /var/www
   git clone https://github.com/Aadiel1/mo-cell.git mocell
   cd mocell
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   nano .env  # Update with your configuration
   ```

4. **Run the deployment script:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## What the Deployment Does

1. ✅ Installs Docker and Docker Compose if needed
2. ✅ Removes any existing deployment
3. ✅ Clones the latest code from GitHub
4. ✅ Sets up SSL certificates with Let's Encrypt
5. ✅ Configures automatic SSL renewal
6. ✅ Starts all containers with proper configuration
7. ✅ Configures Nginx as reverse proxy with SSL

## SSL Certificate Setup

The deployment script automatically obtains and configures SSL certificates from Let's Encrypt.

**Important:** Make sure your DNS is configured before running the deployment:
- `mocell.rw` → 10.10.118.164
- `www.mocell.rw` → 10.10.118.164

### Manual SSL Setup (if needed)

If you need to set up SSL manually:

```bash
chmod +x init-letsencrypt.sh
./init-letsencrypt.sh
```

## Environment Configuration

Update the `.env` file with your configuration:

```env
# Email Service Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@mocell.rw
SMTP_TO=info@mocell.rw

# Application
NODE_ENV=production
PORT=3000
```

## Docker Commands

### View logs:
```bash
cd /var/www/mocell
docker-compose -f docker-compose.prod.yml logs -f
```

### View specific service logs:
```bash
docker-compose -f docker-compose.prod.yml logs -f mocell-app
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Restart services:
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Stop all services:
```bash
docker-compose -f docker-compose.prod.yml down
```

### Start all services:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Rebuild and restart:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## Updating the Application

To update your application from GitHub:

```bash
cd /var/www/mocell
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```

## SSL Certificate Renewal

SSL certificates are automatically renewed by the certbot container. You can manually renew with:

```bash
docker-compose -f docker-compose.prod.yml run --rm certbot renew
docker-compose -f docker-compose.prod.yml restart nginx
```

## Monitoring

### Check container status:
```bash
docker-compose -f docker-compose.prod.yml ps
```

### Check Nginx configuration:
```bash
docker-compose -f docker-compose.prod.yml exec nginx nginx -t
```

### View resource usage:
```bash
docker stats
```

## Firewall Configuration

Make sure these ports are open:

```bash
# UFW (Ubuntu Firewall)
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH
ufw enable
```

## Troubleshooting

### SSL Certificate Issues

If SSL certificate generation fails:

1. Verify DNS is pointing to your server:
   ```bash
   dig mocell.rw
   dig www.mocell.rw
   ```

2. Check if port 80 is accessible:
   ```bash
   curl -I http://mocell.rw
   ```

3. Try manual certificate setup:
   ```bash
   ./init-letsencrypt.sh
   ```

### Container Issues

If containers won't start:

1. Check logs:
   ```bash
   docker-compose -f docker-compose.prod.yml logs
   ```

2. Check Docker status:
   ```bash
   systemctl status docker
   ```

3. Restart Docker:
   ```bash
   systemctl restart docker
   ```

### Application Issues

If the app isn't accessible:

1. Check if containers are running:
   ```bash
   docker ps
   ```

2. Check application logs:
   ```bash
   docker-compose -f docker-compose.prod.yml logs mocell-app
   ```

3. Test the app directly:
   ```bash
   curl http://localhost:3000
   ```

## Security Best Practices

1. **Update .env file** - Never commit secrets to Git
2. **Enable firewall** - Only allow necessary ports
3. **Regular updates** - Keep Docker and containers updated
4. **Monitor logs** - Check logs regularly for issues
5. **Backup** - Regular backups of data and configuration

## File Structure

```
/var/www/mocell/
├── docker-compose.prod.yml    # Production Docker configuration
├── nginx.prod.conf             # Nginx configuration with SSL
├── deploy.sh                   # Automated deployment script
├── init-letsencrypt.sh         # SSL setup script
├── .env                        # Environment variables
├── certbot/                    # SSL certificates
│   ├── conf/                   # Let's Encrypt config
│   ├── www/                    # ACME challenge
│   └── dhparam/                # DH parameters
└── logs/                       # Application logs
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/Aadiel1/mo-cell/issues
- Email: info@mocell.rw

## Accessing Your Site

After successful deployment, your site will be available at:
- https://mocell.rw
- https://www.mocell.rw

HTTP traffic is automatically redirected to HTTPS.
