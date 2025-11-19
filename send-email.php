<?php
/**
 * MoCell Contact Form - Gmail SMTP Handler
 *
 * This PHP script sends emails using your Gmail SMTP settings
 * Make sure PHPMailer is installed or use this standalone version
 */

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Method not allowed']));
}

// CORS Headers (adjust domain as needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Gmail SMTP Configuration
define('EMAIL_HOST', 'smtp.gmail.com');
define('EMAIL_PORT', 587);
define('EMAIL_USE_TLS', true);
define('EMAIL_HOST_USER', 'sadhaffi@gmail.com');
define('EMAIL_HOST_PASSWORD', 'sowxpzrrlujewury'); // App password
define('EMAIL_FROM_NAME', 'MoCell Website');
define('EMAIL_TO', 'sadhaffi@gmail.com'); // Where to receive contact form emails

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Fallback to $_POST if JSON decode fails
if (!$data) {
    $data = $_POST;
}

// Validate required fields
$required = ['name', 'email', 'service', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        die(json_encode([
            'success' => false,
            'message' => ucfirst($field) . ' is required'
        ]));
    }
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$company = htmlspecialchars(strip_tags($data['company'] ?? 'Not provided'));
$service = htmlspecialchars(strip_tags($data['service']));
$message = htmlspecialchars(strip_tags($data['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die(json_encode([
        'success' => false,
        'message' => 'Invalid email address'
    ]));
}

// Check if PHPMailer is available
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    // Use PHPMailer if available
    sendWithPHPMailer($name, $email, $company, $service, $message);
} else {
    // Use mail() function with SMTP
    sendWithMailFunction($name, $email, $company, $service, $message);
}

/**
 * Send email using PHPMailer (recommended)
 */
function sendWithPHPMailer($name, $email, $company, $service, $message) {
    require 'vendor/autoload.php'; // Adjust path if needed

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = EMAIL_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = EMAIL_HOST_USER;
        $mail->Password = EMAIL_HOST_PASSWORD;
        $mail->SMTPSecure = EMAIL_USE_TLS ? 'tls' : 'ssl';
        $mail->Port = EMAIL_PORT;

        // Email settings
        $mail->setFrom(EMAIL_HOST_USER, EMAIL_FROM_NAME);
        $mail->addAddress(EMAIL_TO);
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact from $name - MoCell Website";
        $mail->Body = getEmailTemplate($name, $email, $company, $service, $message);
        $mail->AltBody = getPlainTextEmail($name, $email, $company, $service, $message);

        $mail->send();

        // Send auto-reply to user
        sendAutoReply($name, $email, $service);

        echo json_encode([
            'success' => true,
            'message' => 'Message sent successfully! We\'ll get back to you within 24 hours.'
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email. Please try again or email us directly.',
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Send email using native mail() function (fallback)
 */
function sendWithMailFunction($name, $email, $company, $service, $message) {
    $to = EMAIL_TO;
    $subject = "New Contact from $name - MoCell Website";
    $body = getPlainTextEmail($name, $email, $company, $service, $message);

    $headers = [
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_HOST_USER . '>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];

    if (mail($to, $subject, $body, implode("\r\n", $headers))) {
        echo json_encode([
            'success' => true,
            'message' => 'Message sent successfully!'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email. Please try again.'
        ]);
    }
}

/**
 * HTML Email Template
 */
function getEmailTemplate($name, $email, $company, $service, $message) {
    $currentDate = date('F j, Y');
    $currentTime = date('g:i A');

    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding: 15px; background: #f7fafc; border-radius: 8px; }
        .label { font-size: 12px; color: #718096; text-transform: uppercase; font-weight: 600; }
        .value { font-size: 16px; color: #1a202c; margin-top: 5px; }
        .message-box { background: #f7fafc; padding: 20px; border-left: 4px solid #4facfe; border-radius: 8px; }
        .footer { background: #f7fafc; padding: 20px; text-align: center; color: #718096; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">🎯 New Contact Inquiry</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">MoCell Website Contact Form</p>
        </div>

        <div class="content">
            <div style="background: #e0e7ff; border-left: 4px solid #667eea; padding: 15px; margin-bottom: 25px; border-radius: 8px;">
                <strong style="color: #667eea;">⚡ ACTION REQUIRED: New lead from your website</strong>
            </div>

            <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">{$name}</div>
            </div>

            <div class="field">
                <div class="label">✉️ Email</div>
                <div class="value"><a href="mailto:{$email}" style="color: #667eea; text-decoration: none;">{$email}</a></div>
            </div>

            <div class="field">
                <div class="label">🏢 Company</div>
                <div class="value">{$company}</div>
            </div>

            <div class="field">
                <div class="label">🎯 Service Interested</div>
                <div class="value"><strong style="color: #667eea;">{$service}</strong></div>
            </div>

            <h3 style="margin: 30px 0 15px 0; color: #1a202c;">📝 Project Details</h3>
            <div class="message-box">
                <p style="margin: 0; color: #4a5568; white-space: pre-wrap; line-height: 1.7;">{$message}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:{$email}" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 16px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; margin: 0 10px;">
                    📧 Reply via Email
                </a>
            </div>
        </div>

        <div class="footer">
            <p>Submitted on <strong>{$currentDate}</strong> at <strong>{$currentTime}</strong></p>
            <p style="margin-top: 10px; color: #a0aec0;">This email was sent from your MoCell website contact form</p>
        </div>
    </div>
</body>
</html>
HTML;
}

/**
 * Plain text email version
 */
function getPlainTextEmail($name, $email, $company, $service, $message) {
    $currentDate = date('F j, Y g:i A');

    return <<<TEXT
🎯 NEW CONTACT FORM SUBMISSION - MoCell Website

From: {$name}
Email: {$email}
Company: {$company}
Service Interested: {$service}

MESSAGE:
{$message}

---
Submitted on: {$currentDate}
Reply directly to: {$email}
TEXT;
}

/**
 * Send auto-reply to the user
 */
function sendAutoReply($name, $email, $service) {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = EMAIL_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = EMAIL_HOST_USER;
        $mail->Password = EMAIL_HOST_PASSWORD;
        $mail->SMTPSecure = EMAIL_USE_TLS ? 'tls' : 'ssl';
        $mail->Port = EMAIL_PORT;

        $mail->setFrom(EMAIL_HOST_USER, 'MoCell Team');
        $mail->addAddress($email, $name);

        $mail->isHTML(true);
        $mail->Subject = "Thanks for contacting MoCell!";
        $mail->Body = getAutoReplyTemplate($name, $service);

        $mail->send();
    } catch (Exception $e) {
        // Silent fail for auto-reply
        error_log('Auto-reply failed: ' . $e->getMessage());
    }
}

/**
 * Auto-reply template
 */
function getAutoReplyTemplate($name, $service) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 32px;">Thank You, {$name}!</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95;">We've received your message and we're excited to connect with you.</p>
        </div>

        <div style="padding: 40px 30px;">
            <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-radius: 12px; padding: 25px; text-align: center; border: 2px solid rgba(102, 126, 234, 0.2);">
                <h2 style="margin: 0 0 10px 0; color: #667eea; font-size: 20px;">✅ Your inquiry has been received!</h2>
                <p style="margin: 0; color: #4a5568; font-size: 15px;">Our team will review your request about <strong style="color: #667eea;">{$service}</strong> and respond within 24 hours.</p>
            </div>

            <h3 style="margin: 30px 0 20px 0; text-align: center; color: #1a202c;">What Happens Next?</h3>

            <div style="margin-bottom: 15px; padding: 20px; background: #f7fafc; border-radius: 12px;">
                <div style="display: flex;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; color: white; text-align: center; line-height: 50px; font-size: 24px; font-weight: bold; margin-right: 15px;">1</div>
                    <div>
                        <h4 style="margin: 0 0 8px 0; color: #1a202c; font-size: 16px;">Review & Analysis</h4>
                        <p style="margin: 0; color: #718096; font-size: 14px;">Our expert team will carefully review your project requirements.</p>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 15px; padding: 20px; background: #f7fafc; border-radius: 12px;">
                <div style="display: flex;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 12px; color: white; text-align: center; line-height: 50px; font-size: 24px; font-weight: bold; margin-right: 15px;">2</div>
                    <div>
                        <h4 style="margin: 0 0 8px 0; color: #1a202c; font-size: 16px;">Initial Response (Within 24 Hours)</h4>
                        <p style="margin: 0; color: #718096; font-size: 14px;">You'll receive a detailed response from one of our specialists.</p>
                    </div>
                </div>
            </div>

            <div style="padding: 20px; background: #f7fafc; border-radius: 12px;">
                <div style="display: flex;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #fa709a, #fee140); border-radius: 12px; color: white; text-align: center; line-height: 50px; font-size: 24px; font-weight: bold; margin-right: 15px;">3</div>
                    <div>
                        <h4 style="margin: 0 0 8px 0; color: #1a202c; font-size: 16px;">Discovery Call</h4>
                        <p style="margin: 0; color: #718096; font-size: 14px;">We'll schedule a call to discuss your project in detail.</p>
                    </div>
                </div>
            </div>

            <div style="margin-top: 30px; padding: 25px; background: #f7fafc; border-radius: 12px; text-align: center;">
                <h4 style="margin: 0 0 20px 0; color: #1a202c;">Need Immediate Assistance?</h4>
                <p style="margin: 0 0 5px 0; color: #718096; font-size: 13px;">📧 Email Us</p>
                <p style="margin: 0 0 15px 0;"><a href="mailto:hello@mocell.tech" style="color: #667eea; text-decoration: none; font-weight: 600;">hello@mocell.tech</a></p>
                <p style="margin: 0 0 5px 0; color: #718096; font-size: 13px;">📞 Call Us</p>
                <p style="margin: 0;"><a href="tel:+1234567890" style="color: #667eea; text-decoration: none; font-weight: 600;">+1 (234) 567-890</a></p>
            </div>
        </div>

        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h3 style="margin: 0 0 10px 0; font-size: 24px;">MoCell</h3>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Innovative IT Solutions & Cybersecurity</p>
        </div>

        <div style="padding: 20px; text-align: center; color: #a0aec0; font-size: 12px;">
            <p style="margin: 0;">123 Innovation Drive, Tech City</p>
            <p style="margin: 5px 0 0 0;">This is an automated response. Your inquiry is important to us.</p>
        </div>
    </div>
</body>
</html>
HTML;
}
?>
