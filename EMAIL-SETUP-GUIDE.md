# 📧 Email Setup Guide for MoCell Contact Form

This guide will help you configure the contact form to receive emails from your website visitors.

---

## 🚀 Quick Start (Recommended: Web3Forms)

### ✅ Why Web3Forms?
- **FREE** up to 250 submissions/month
- **NO registration required** to start
- Setup in **2 minutes**
- Includes spam protection
- No coding needed

### 📝 Setup Steps:

#### Step 1: Get Your Access Key
1. Go to **https://web3forms.com**
2. Enter your email address (where you want to receive messages)
3. Click "Create Access Key"
4. Check your email inbox for the access key

#### Step 2: Add Access Key to Your Website
1. Open `index.html` in a text editor
2. Find line **519** (looks like this):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with the key from your email
4. Save the file

#### Step 3: Test It!
1. Open your website
2. Fill out the contact form
3. Click "Send Message"
4. Check your email inbox!

### ✨ That's It! You're Done!

---

## 🎯 Advanced Configuration (Web3Forms)

### Custom Subject Line
Already configured! Change line 520 in `index.html`:
```html
<input type="hidden" name="subject" value="Your Custom Subject Here">
```

### Redirect After Submission
Add this after line 521 in `index.html`:
```html
<input type="hidden" name="redirect" value="https://yourdomain.com/thank-you.html">
```

### Auto-Reply to Users
1. Log in to Web3Forms dashboard
2. Go to your form settings
3. Enable "Auto Reply"
4. Customize the auto-reply message

### Webhook Integration
Send form data to your own server:
```html
<input type="hidden" name="webhook" value="https://yourapi.com/webhook">
```

---

## 🔧 Alternative Option 1: EmailJS (More Features)

### Pros:
- 300 free emails/month
- Custom email templates
- Multiple email services (Gmail, Outlook, etc.)
- Auto-reply functionality
- Email analytics

### Setup Steps:

#### 1. Create Account
Go to **https://www.emailjs.com** and sign up

#### 2. Add Email Service
1. Go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the authorization steps
5. Save your **Service ID**

#### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Template Name:** `mocell_contact_form`

**Subject:** `New Contact from {{user_name}} - MoCell`

**Body:**
```
New Contact Form Submission

Name: {{user_name}}
Email: {{user_email}}
Company: {{company}}
Service: {{service}}

Message:
{{message}}

---
Submitted from MoCell Website
```

4. Save and note your **Template ID**

#### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

#### 5. Update Your Website
Replace the form code in `index.html` with the code from `contact-emailjs.html`:

```bash
# Copy the EmailJS version
cp contact-emailjs.html temp-form.txt
# Then manually copy the form code into index.html
```

Or manually:
1. Open `contact-emailjs.html`
2. Copy the form code (lines 45-115)
3. Replace the existing form in `index.html`
4. Update YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, and YOUR_TEMPLATE_ID

---

## 📮 Alternative Option 2: FormSpree (Simplest)

### Pros:
- 50 free submissions/month
- One-click setup
- No configuration needed
- Email notifications
- File uploads

### Setup Steps:

#### 1. Get Form Endpoint
Go to **https://formspree.io** and create account

#### 2. Create New Form
1. Click "New Form"
2. Name it "MoCell Contact"
3. Copy the form endpoint URL

#### 3. Update index.html
Change line 516 to:
```html
<form class="contact-form" id="contactForm" action="YOUR_FORMSPREE_URL" method="POST">
```

#### 4. Remove Web3Forms Fields
Delete lines 519-524 (the Web3Forms configuration)

#### 5. That's It!
Test your form and check FormSpree dashboard for submissions

---

## 🎨 Email Templates

### Professional Email Template
The file `email-template.html` contains a beautiful HTML email template with:
- Gradient header
- Structured contact information
- Action buttons
- Professional footer

**To use with EmailJS:**
1. Copy the content from `email-template.html`
2. Paste into EmailJS template editor
3. Replace {{variables}} with EmailJS syntax

### Auto-Reply Template
The file `email-template-autoreply.html` contains a thank-you email with:
- Confirmation message
- Next steps timeline
- Quick links
- Contact information

**To use:**
1. Set up auto-reply in your email service
2. Copy HTML from `email-template-autoreply.html`
3. Customize with your branding

---

## 🔒 Security Features

### Already Included:
✅ Honeypot spam protection (line 524 in index.html)
✅ Required field validation
✅ Email format validation
✅ HTTPS-only API calls

### Additional Protection:

#### Add reCAPTCHA (Web3Forms)
```html
<!-- Add before closing </form> tag -->
<div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
<input type="hidden" name="recaptcha_response" id="recaptchaResponse">
```

#### Rate Limiting
Web3Forms automatically limits to 1 submission per minute per IP

---

## 🐛 Troubleshooting

### Form Not Sending?

**Check 1: Access Key**
- Make sure you replaced `YOUR_ACCESS_KEY_HERE` with your actual key
- No extra spaces or quotes

**Check 2: Browser Console**
- Press F12 to open Developer Tools
- Check Console tab for errors
- Look for red error messages

**Check 3: Internet Connection**
- Form needs internet to submit
- Check if API is reachable

**Check 4: Spam Folder**
- Check your spam/junk folder
- Add noreply@web3forms.com to contacts

### Success Message Not Showing?

**Check JavaScript Console:**
```javascript
// Test if script is loaded
console.log('Form loaded:', document.getElementById('contactForm'));
```

**Verify formResult Element:**
Line 561 in index.html should exist

### Emails Going to Spam?

**Solutions:**
1. Add sender to safe list
2. Use custom domain (not Gmail)
3. Configure SPF/DKIM records
4. Use Web3Forms Pro for better deliverability

---

## 📊 Form Analytics

### Track Submissions with Google Analytics

Add this to your form submit handler in `script.js`:

```javascript
// After successful submission
if (window.gtag) {
    gtag('event', 'form_submission', {
        'event_category': 'Contact',
        'event_label': 'MoCell Contact Form'
    });
}
```

### Web3Forms Dashboard
- Login to web3forms.com
- View submission history
- Download as CSV
- Set up webhooks

---

## 🎯 Testing Checklist

Before going live, test:

- [ ] Form submits successfully
- [ ] Email arrives in inbox
- [ ] All form fields are captured
- [ ] Success message displays
- [ ] Error handling works
- [ ] Form resets after submission
- [ ] Spam protection active
- [ ] Mobile responsive
- [ ] Required fields validated
- [ ] Email format validated

---

## 💡 Pro Tips

### 1. Auto-Reply Template
Set up an auto-reply so users know you received their message:
- Use `email-template-autoreply.html`
- Customize with your brand colors
- Include next steps

### 2. Notification Settings
Configure multiple notification emails:
```html
<input type="hidden" name="email" value="sales@mocell.tech,support@mocell.tech">
```

### 3. Custom Success Page
Create `thank-you.html` for a better user experience

### 4. Add Phone Number Field
```html
<div class="form-group">
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" name="phone" placeholder="+1 (234) 567-890">
</div>
```

### 5. File Upload Support
Web3Forms supports file uploads:
```html
<div class="form-group">
    <label for="attachment">Attach File (Optional)</label>
    <input type="file" id="attachment" name="attachment">
</div>
```

---

## 📞 Need Help?

### Web3Forms Support
- Docs: https://docs.web3forms.com
- Email: support@web3forms.com

### EmailJS Support
- Docs: https://www.emailjs.com/docs/
- Forum: https://www.emailjs.com/forum/

### FormSpree Support
- Docs: https://help.formspree.io
- Email: support@formspree.io

---

## 🚀 Quick Reference

### Current Setup:
- **Form Location:** `index.html` lines 516-562
- **JavaScript:** `script.js` lines 111-235
- **Service:** Web3Forms (default)
- **Free Limit:** 250 submissions/month

### Files Included:
- ✅ `index.html` - Main website with integrated form
- ✅ `script.js` - Form handling JavaScript
- ✅ `contact-web3forms.html` - Web3Forms example
- ✅ `contact-emailjs.html` - EmailJS example
- ✅ `email-template.html` - Professional email template
- ✅ `email-template-autoreply.html` - Auto-reply template
- ✅ `EMAIL-SETUP-GUIDE.md` - This guide

---

## ✅ You're All Set!

Your contact form is ready to go. Just add your Web3Forms access key and start receiving messages!

**Next Steps:**
1. Get access key from web3forms.com
2. Add it to line 519 in index.html
3. Test the form
4. Start receiving leads!

**Questions?** Check the troubleshooting section above or reach out to the respective service's support team.

---

*Made with ❤️ for MoCell*
