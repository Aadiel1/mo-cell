# 🚀 Node.js Email Server Setup Guide

## Quick Start (5 Minutes)

Your website is configured to use a Node.js backend with your Gmail SMTP credentials.

### ✅ Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Your Gmail credentials (already configured!)

---

## 📦 Installation

### Step 1: Install Dependencies

Open terminal in the `mo-cell` directory and run:

```bash
cd /Users/adx/Documents/mo-cell
npm install
```

This will install:
- `express` - Web framework
- `nodemailer` - Email sending
- `cors` - Cross-origin requests
- `body-parser` - Parse form data
- `dotenv` - Environment variables

---

## 🚀 Running the Server

### Development Mode

```bash
npm start
```

Or with auto-reload:

```bash
npm run dev
```

You should see:

```
╔════════════════════════════════════════╗
║   MoCell Contact Form Server          ║
║   Status: RUNNING ✅                   ║
╠════════════════════════════════════════╣
║   Port: 3000                          ║
║   URL: http://localhost:3000           ║
║   API: http://localhost:3000/api/contact
║   Health: http://localhost:3000/api/health
╠════════════════════════════════════════╣
║   SMTP: smtp.gmail.com                ║
║   Email: sadhaffi@gmail.com           ║
╚════════════════════════════════════════╝
```

### Step 2: Test the Server

Open a new terminal and test:

```bash
# Health check
curl http://localhost:3000/api/health

# Or open in browser
open http://localhost:3000
```

---

## 📧 Email Configuration

### Your Gmail Settings (Already Configured!)

✅ **Email:** sadhaffi@gmail.com
✅ **SMTP Host:** smtp.gmail.com
✅ **Port:** 587
✅ **Security:** TLS
✅ **App Password:** sowxpzrrlujewury

**Location:** `server.js` lines 18-25

### ⚠️ Important: Gmail App Password

The password `sowxpzrrlujewury` is a Gmail App Password, NOT your regular password.

**If you need to generate a new one:**

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification (if not enabled)
3. Click "App passwords"
4. Generate new password for "Mail"
5. Copy the 16-character password
6. Replace in `server.js` line 24

---

## 🧪 Testing the Contact Form

### Method 1: Use the Website

1. Make sure server is running (`npm start`)
2. Open http://localhost:3000
3. Scroll to contact form
4. Fill it out and submit
5. Check your email: sadhaffi@gmail.com

### Method 2: Test with cURL

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "service": "Software Development",
    "message": "This is a test message"
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you within 24 hours."
}
```

### Method 3: Test with Browser

Open browser console (F12) and run:

```javascript
fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Co',
        service: 'Software Development',
        message: 'Test message'
    })
})
.then(r => r.json())
.then(d => console.log(d));
```

---

## 📨 What Emails Are Sent?

### 1. Admin Email (to you: sadhaffi@gmail.com)

Beautiful HTML email with:
- Contact person details
- Service interested in
- Project message
- Reply button

### 2. Auto-Reply Email (to the user)

Professional thank-you email with:
- Confirmation message
- Next steps timeline
- Your contact info
- Professional branding

---

## 🔧 Customization

### Change Email Templates

Edit `server.js` functions:

**Admin Email:** Line 34 - `getAdminEmailTemplate()`
**Auto-Reply:** Line 123 - `getAutoReplyTemplate()`

### Change Port

Line 12 in `server.js`:

```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your port
```

### Add Multiple Recipients

Line 238 in `server.js`:

```javascript
to: 'email1@mocell.tech, email2@mocell.tech',
```

### Disable Auto-Reply

Comment out lines 253-266 in `server.js`:

```javascript
// await transporter.sendMail(autoReplyMailOptions);
```

### Add Attachments Support

Add to the form:

```html
<input type="file" name="attachment" id="attachment">
```

And in `server.js`:

```javascript
const upload = multer({ dest: 'uploads/' });
app.post('/api/contact', upload.single('attachment'), async (req, res) => {
    // Handle file upload
});
```

---

## 🌐 Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Create app
heroku create mocell-website

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Open
heroku open
```

### Option 2: DigitalOcean

1. Create Droplet (Ubuntu 22.04)
2. SSH into server
3. Install Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. Upload files:

```bash
scp -r /Users/adx/Documents/mo-cell root@your-ip:/var/www/
```

5. Install PM2 and run:

```bash
npm install -g pm2
cd /var/www/mo-cell
npm install
pm2 start server.js --name mocell
pm2 save
pm2 startup
```

### Option 3: Vercel (Serverless)

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

Deploy:

```bash
npm install -g vercel
vercel
```

### Option 4: VPS with Nginx

Install Nginx:

```bash
sudo apt install nginx
```

Create Nginx config `/etc/nginx/sites-available/mocell`:

```nginx
server {
    listen 80;
    server_name mocell.tech www.mocell.tech;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and start:

```bash
sudo ln -s /etc/nginx/sites-available/mocell /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 Security Best Practices

### 1. Use Environment Variables

Create `.env` file:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=sadhaffi@gmail.com
EMAIL_PASS=sowxpzrrlujewury
NODE_ENV=production
```

Update `server.js`:

```javascript
require('dotenv').config();

const SMTP_CONFIG = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};
```

Add to `.gitignore`:

```
.env
node_modules/
```

### 2. Add Rate Limiting

Install:

```bash
npm install express-rate-limit
```

Add to `server.js`:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // 5 requests per window
});

app.post('/api/contact', limiter, async (req, res) => {
    // Your code
});
```

### 3. Add HTTPS (Production)

Use Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mocell.tech -d www.mocell.tech
```

---

## 🐛 Troubleshooting

### Server Won't Start

**Error:** `Port 3000 already in use`

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Emails Not Sending

**Check Gmail credentials:**

```bash
# Test SMTP connection
node -e "
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sadhaffi@gmail.com',
        pass: 'sowxpzrrlujewury'
    }
});
transport.verify().then(console.log).catch(console.error);
"
```

**Common Issues:**

1. ❌ Using regular password instead of App Password
2. ❌ 2-Step Verification not enabled
3. ❌ Less secure app access disabled
4. ❌ Wrong SMTP port

### CORS Errors

If deploying to different domain, update `server.js`:

```javascript
app.use(cors({
    origin: ['https://mocell.tech', 'https://www.mocell.tech'],
    credentials: true
}));
```

### Form Not Submitting

**Check browser console (F12):**

- Network tab for failed requests
- Console tab for errors
- Make sure server is running

**Test API directly:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","service":"Test","message":"Test"}'
```

---

## 📊 Monitoring & Logs

### View Server Logs

```bash
# Console output
npm start

# Or with PM2
pm2 logs mocell
```

### Check Email Sending Status

Server logs show:

```
✅ Email sent successfully from John Doe (john@example.com)
```

Or errors:

```
❌ Error sending email: [error details]
```

### Add Email Logging

Create `logs` directory and add to `server.js`:

```javascript
const fs = require('fs');
const logStream = fs.createWriteStream('logs/emails.log', {flags: 'a'});

// After successful email
logStream.write(`${new Date().toISOString()} - Email from ${name} (${email})\n`);
```

---

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Start server
npm start

# Start with auto-reload
npm run dev

# Test health check
curl http://localhost:3000/api/health

# Test contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","service":"Testing","message":"Hi"}'

# View running processes
lsof -i :3000

# Stop server (Ctrl+C or)
kill -9 $(lsof -ti:3000)
```

---

## ✅ Final Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts successfully
- [ ] Health check works
- [ ] Test email sends
- [ ] Auto-reply works
- [ ] Form submits from website
- [ ] Emails arrive in inbox
- [ ] Email templates look good
- [ ] Ready for deployment!

---

## 💡 Pro Tips

1. **Test locally first** before deploying
2. **Use PM2** for production (auto-restart)
3. **Set up monitoring** (UptimeRobot, Pingdom)
4. **Enable HTTPS** always in production
5. **Backup** your `.env` file
6. **Monitor** email quota
7. **Keep** Node.js and packages updated

---

## 📞 Need Help?

Server issues? Check:
- Node.js version: `node --version`
- npm version: `npm --version`
- Server logs for errors
- Gmail account security settings

---

**You're all set! 🎉**

Start the server with `npm start` and test the contact form!

*Made with ❤️ for MoCell*
