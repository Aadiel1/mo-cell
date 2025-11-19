/**
 * MoCell Contact Form - Node.js Express Server with Gmail SMTP
 *
 * Setup:
 * 1. npm install express nodemailer cors dotenv body-parser
 * 2. node server.js
 * 3. Server runs on http://localhost:3000
 */

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// Gmail SMTP Configuration (from environment variables)
const SMTP_CONFIG = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD
    }
};

// Create reusable transporter
const transporter = nodemailer.createTransport(SMTP_CONFIG);

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ SMTP connection error:', error);
    } else {
        console.log('✅ SMTP server is ready to take messages');
    }
});

// Email templates
const getAdminEmailTemplate = (name, email, company, service, message) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding: 15px; background: #f7fafc; border-radius: 8px; }
        .label { font-size: 12px; color: #718096; text-transform: uppercase; font-weight: 600; margin-bottom: 5px; }
        .value { font-size: 16px; color: #1a202c; margin-top: 5px; }
        .message-box { background: #f7fafc; padding: 20px; border-left: 4px solid #4facfe; border-radius: 8px; }
        .footer { background: #f7fafc; padding: 20px; text-align: center; color: #718096; font-size: 12px; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 16px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; margin: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🎯 New Contact Inquiry</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">MoCell Website Contact Form</p>
        </div>

        <div class="content">
            <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-left: 4px solid #667eea; padding: 15px; margin-bottom: 25px; border-radius: 8px;">
                <p style="margin: 0; color: #667eea; font-weight: 600; font-size: 14px;">⚡ ACTION REQUIRED: New lead from your website</p>
            </div>

            <div class="field">
                <div class="label">👤 NAME</div>
                <div class="value">${name}</div>
            </div>

            <div class="field">
                <div class="label">✉️ EMAIL</div>
                <div class="value"><a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 600;">${email}</a></div>
            </div>

            <div class="field">
                <div class="label">🏢 COMPANY</div>
                <div class="value">${company || 'Not provided'}</div>
            </div>

            <div class="field">
                <div class="label">🎯 SERVICE INTERESTED</div>
                <div class="value"><span style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">${service}</span></div>
            </div>

            <h3 style="margin: 30px 0 15px 0; color: #1a202c; font-size: 18px;">📝 Project Details</h3>
            <div class="message-box">
                <p style="margin: 0; color: #4a5568; white-space: pre-wrap; line-height: 1.7;">${message}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}" class="button">📧 Reply via Email</a>
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0 0 10px 0;">Submitted on <strong>${currentDate}</strong> at <strong>${currentTime}</strong></p>
            <p style="margin: 0; color: #a0aec0;">This email was sent from your MoCell website contact form</p>
        </div>
    </div>
</body>
</html>
    `.trim();
};

const getAutoReplyTemplate = (name, service) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; color: white;">
            <div style="width: 80px; height: 80px; margin: 0 auto 20px auto; background: rgba(255, 255, 255, 0.2); border-radius: 20px; line-height: 80px; font-size: 40px;">✓</div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700;">Thank You, ${name}!</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; line-height: 1.6;">We've received your message and we're excited to connect with you.</p>
        </div>

        <div style="padding: 40px 30px;">
            <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-radius: 12px; padding: 25px; text-align: center; border: 2px solid rgba(102, 126, 234, 0.2);">
                <h2 style="margin: 0 0 10px 0; color: #667eea; font-size: 20px; font-weight: 700;">✅ Your inquiry has been received!</h2>
                <p style="margin: 0; color: #4a5568; font-size: 15px; line-height: 1.6;">Our team will review your request about <strong style="color: #667eea;">${service}</strong> and respond within 24 hours.</p>
            </div>

            <h3 style="margin: 30px 0 20px 0; text-align: center; color: #1a202c; font-size: 20px;">What Happens Next?</h3>

            <div style="margin-bottom: 15px; padding: 20px; background: #f7fafc; border-radius: 12px; display: flex;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; color: white; text-align: center; line-height: 50px; font-size: 24px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">1</div>
                <div>
                    <h4 style="margin: 0 0 8px 0; color: #1a202c; font-size: 16px; font-weight: 700;">Review & Analysis</h4>
                    <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">Our expert team will carefully review your project requirements and prepare a personalized response.</p>
                </div>
            </div>

            <div style="margin-bottom: 15px; padding: 20px; background: #f7fafc; border-radius: 12px; display: flex;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 12px; color: white; text-align: center; line-height: 50px; font-size: 24px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">2</div>
                <div>
                    <h4 style="margin: 0 0 8px 0; color: #1a202c; font-size: 16px; font-weight: 700;">Initial Response (Within 24 Hours)</h4>
                    <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">You'll receive a detailed response from one of our specialists.</p>
                </div>
            </div>

            <div style="padding: 20px; background: #f7fafc; border-radius: 12px; display: flex;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #fa709a, #fee140); border-radius: 12px; color: white; text-align: center; line-height: 50px; font-size: 24px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">3</div>
                <div>
                    <h4 style="margin: 0 0 8px 0; color: #1a202c; font-size: 16px; font-weight: 700;">Discovery Call</h4>
                    <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">We'll schedule a call to discuss your project in detail and propose the best solution.</p>
                </div>
            </div>

            <div style="margin-top: 30px; padding: 25px; background: #f7fafc; border-radius: 12px; text-align: center;">
                <h4 style="margin: 0 0 20px 0; color: #1a202c; font-size: 16px;">Need Immediate Assistance?</h4>
                <table style="margin: 0 auto; width: 100%;">
                    <tr>
                        <td style="text-align: center; padding: 15px;">
                            <div style="margin-bottom: 8px; color: #718096; font-size: 13px; font-weight: 600;">📧 Email Us</div>
                            <a href="mailto:hello@mocell.tech" style="color: #667eea; font-size: 16px; font-weight: 600; text-decoration: none;">hello@mocell.tech</a>
                        </td>
                        <td style="text-align: center; padding: 15px; border-left: 1px solid #e2e8f0;">
                            <div style="margin-bottom: 8px; color: #718096; font-size: 13px; font-weight: 600;">📞 Call Us</div>
                            <a href="tel:+250788224511" style="color: #667eea; font-size: 16px; font-weight: 600; text-decoration: none;">+250 788 224 511</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h3 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">MoCell</h3>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Innovative IT Solutions & Cybersecurity</p>
        </div>

        <div style="padding: 20px; text-align: center; color: #a0aec0; font-size: 12px;">
            <p style="margin: 0 0 5px 0;">Kigali, Rwanda</p>
            <p style="margin: 0;">This is an automated response. Your inquiry is important to us.</p>
        </div>
    </div>
</body>
</html>
    `.trim();
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, service, message } = req.body;

        // Validation
        if (!name || !email || !service || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Send email to admin (you)
        const adminMailOptions = {
            from: `"MoCell Website" <${SMTP_CONFIG.auth.user}>`,
            to: SMTP_CONFIG.auth.user, // Your email
            replyTo: email,
            subject: `New Contact from ${name} - MoCell Website`,
            html: getAdminEmailTemplate(name, email, company, service, message),
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service: ${service}

Message:
${message}

---
Reply to: ${email}
            `.trim()
        };

        await transporter.sendMail(adminMailOptions);

        // Send auto-reply to user
        const autoReplyMailOptions = {
            from: `"MoCell Team" <${SMTP_CONFIG.auth.user}>`,
            to: email,
            subject: 'Thanks for contacting MoCell!',
            html: getAutoReplyTemplate(name, service),
            text: `
Hi ${name},

Thank you for reaching out to MoCell! We've received your inquiry about ${service}.

Our team will review your message and get back to you within 24 hours.

Best regards,
The MoCell Team
            `.trim()
        };

        await transporter.sendMail(autoReplyMailOptions);

        res.json({
            success: true,
            message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
        });

        console.log(`✅ Email sent successfully from ${name} (${email})`);

    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later.',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK'
    });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const server = app.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════╗
║   MoCell Contact Form Server          ║
║   Status: RUNNING ✅                   ║
╠════════════════════════════════════════╣
║   Host: ${HOST}                       ║
║   Port: ${PORT}                       ║
║   URL: http://localhost:${PORT}        ║
║   API: http://localhost:${PORT}/api/contact
║   Health: http://localhost:${PORT}/api/health
╠════════════════════════════════════════╣
║   SMTP: ${SMTP_CONFIG.host}           ║
║   Email: ${SMTP_CONFIG.auth.user}      ║
║   Environment: ${process.env.NODE_ENV || 'development'}
╚════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
    });
});

module.exports = app;
