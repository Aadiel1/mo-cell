# 🚀 MoCell Production Deployment Guide

Complete guide to deploy MoCell website to production using Docker.

---

## 📋 Prerequisites

- Docker installed (version 20.10+)
- Docker Compose installed (version 1.29+)
- Domain name configured (mocell.tech)
- Gmail App Password for email functionality

---

## 🔧 Quick Start - Local Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your actual credentials
nano .env
```

### 3. Test Locally
```bash
npm start
```

Visit: http://localhost:3000

---

## 🐳 Docker Deployment

### Option 1: Docker Only (Simple)

**Build the image:**
```bash
docker build -t mocell-website:latest .
```

**Run the container:**
```bash
docker run -d \
  --name mocell-app \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  mocell-website:latest
```

**Check logs:**
```bash
docker logs -f mocell-app
```

**Stop the container:**
```bash
docker stop mocell-app
docker rm mocell-app
```

---

### Option 2: Docker Compose (Recommended)

**Start all services:**
```bash
docker-compose up -d
```

**Check status:**
```bash
docker-compose ps
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop all services:**
```bash
docker-compose down
```

**Rebuild after changes:**
```bash
docker-compose up -d --build
```

---

## 🌐 Production Deployment Steps

### 1. Prepare the Server

**Update system:**
```bash
sudo apt update && sudo apt upgrade -y
```

**Install Docker:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**Install Docker Compose:**
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

---

### 2. Clone and Configure

**Clone repository:**
```bash
git clone https://github.com/yourusername/mocell-website.git
cd mocell-website
```

**Configure environment:**
```bash
cp .env.example .env
nano .env
```

**Important environment variables:**
```bash
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=sadhaffi@gmail.com
EMAIL_HOST_PASSWORD=your-app-password-here

CORS_ORIGIN=https://mocell.tech
```

---

### 3. Deploy with Docker Compose

**Start services:**
```bash
docker-compose up -d
```

**Verify deployment:**
```bash
# Check if containers are running
docker-compose ps

# Check logs
docker-compose logs -f mocell-app

# Test health endpoint
curl http://localhost:3000/api/health
```

---

## 🔒 SSL/HTTPS Setup (Production)

### Using Nginx + Let's Encrypt

**1. Update nginx.conf:**
Uncomment the SSL server block in `nginx.conf`

**2. Install Certbot:**
```bash
sudo apt install certbot python3-certbot-nginx -y
```

**3. Get SSL certificate:**
```bash
sudo certbot --nginx -d mocell.tech -d www.mocell.tech
```

**4. Enable Nginx in docker-compose.yml:**
Uncomment the nginx service section

**5. Restart services:**
```bash
docker-compose down
docker-compose up -d
```

---

## 📊 Monitoring & Maintenance

### Health Checks

**Application health:**
```bash
curl http://localhost:3000/api/health
```

**Expected response:**
```json
{
  "status": "OK",
  "message": "MoCell Contact API is running",
  "smtp": {
    "host": "smtp.gmail.com",
    "port": 587,
    "user": "sadhaffi@gmail.com"
  }
}
```

---

### View Logs

**Application logs:**
```bash
docker-compose logs -f mocell-app
```

**Nginx logs (if enabled):**
```bash
docker-compose logs -f nginx
```

**Last 100 lines:**
```bash
docker-compose logs --tail=100 mocell-app
```

---

### Update Deployment

**1. Pull latest changes:**
```bash
git pull origin main
```

**2. Rebuild and restart:**
```bash
docker-compose down
docker-compose up -d --build
```

**3. Clean up old images:**
```bash
docker image prune -f
```

---

## 🔄 Backup & Restore

### Backup Environment File
```bash
# Backup
cp .env .env.backup.$(date +%Y%m%d)

# Restore
cp .env.backup.20240101 .env
```

---

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs for errors
docker-compose logs mocell-app

# Check container status
docker-compose ps

# Restart container
docker-compose restart mocell-app
```

---

### Email not sending
```bash
# Check SMTP configuration in .env
cat .env | grep EMAIL

# Test SMTP connection
docker-compose exec mocell-app node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD
  }
});
transporter.verify().then(console.log).catch(console.error);
"
```

---

### Port already in use
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or change port in .env
PORT=3001
```

---

### Permission denied
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Fix docker permissions
sudo usermod -aG docker $USER
newgrp docker
```

---

## 📈 Performance Optimization

### Enable Nginx Caching

Add to nginx.conf:
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g;

location / {
    proxy_cache my_cache;
    proxy_cache_valid 200 1h;
    # ... other proxy settings
}
```

---

### Enable Gzip Compression

Already configured in nginx.conf for:
- HTML, CSS, JavaScript
- JSON, XML
- Font files

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit .env to git
- ✅ Use strong passwords
- ✅ Rotate credentials regularly
- ✅ Use Gmail App Passwords

### 2. Docker Security
- ✅ Run as non-root user (already configured)
- ✅ Use multi-stage builds (already configured)
- ✅ Keep images updated
- ✅ Scan for vulnerabilities

### 3. Nginx Security
- ✅ SSL/TLS encryption
- ✅ Security headers (already configured)
- ✅ Rate limiting for API endpoints
- ✅ Hide server version

---

## 📝 Deployment Checklist

Before going live:

- [ ] Update .env with production credentials
- [ ] Configure domain DNS to point to server
- [ ] Set up SSL certificates
- [ ] Test contact form functionality
- [ ] Test all pages (/, /404.html, /thank-you.html)
- [ ] Update Google Analytics ID
- [ ] Enable nginx in docker-compose.yml
- [ ] Set up monitoring/alerts
- [ ] Create backup strategy
- [ ] Document server access credentials
- [ ] Test email delivery
- [ ] Check mobile responsiveness
- [ ] Run security scan
- [ ] Test load time (<3s)

---

## 🌍 DNS Configuration

Point your domain to your server:

**A Records:**
```
mocell.tech       →  YOUR_SERVER_IP
www.mocell.tech   →  YOUR_SERVER_IP
```

**Verify DNS:**
```bash
dig mocell.tech +short
nslookup mocell.tech
```

---

## 📞 Support

**Questions or issues?**

- Email: hello@mocell.tech
- Phone: +250 788 224 511
- Location: Kigali, Rwanda

---

## 🎉 Success!

Once deployed, your site will be available at:
- **HTTP:** http://mocell.tech
- **HTTPS:** https://mocell.tech (after SSL setup)
- **Health Check:** http://mocell.tech/api/health

---

**Made in Rwanda with ❤️**

**Version:** 1.0
**Last Updated:** 2024
