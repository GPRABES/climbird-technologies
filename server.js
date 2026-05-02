import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Log startup immediately
console.log('--- STARTING SERVER ---');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Error handling for the process
process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 8080;

// Parse JSON request bodies
app.use(express.json());

console.log(`[INFO] Current Directory: ${process.cwd()}`);
try {
  const files = fs.readdirSync('.');
  console.log(`[INFO] Files in directory: ${files.join(', ')}`);
} catch (e) {
  console.error(`[ERROR] Could not read directory: ${e.message}`);
}

// ── SMTP Transporter ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.climbirdtechnologies.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER || 'info@climbirdtechnologies.com',
    pass: process.env.SMTP_PASS || '',
  },
});

// ── Contact Form API ──
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Basic validation
  if (!name || !email || !service || !message) {
    return res.status(400).json({ success: false, error: 'All required fields must be filled.' });
  }

  const fromAddr = process.env.SMTP_FROM || 'info@climbirdtechnologies.com';
  const toAddr = process.env.SMTP_TO || 'info@climbirdtechnologies.com';

  try {
    // 1. Send notification email to Climbird
    await transporter.sendMail({
      from: `"Climbird Technologies" <${fromAddr}>`,
      to: toAddr,
      replyTo: email,
      subject: `New Inquiry: ${service} — ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F0F2F5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F2F5;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Logo Bar -->
  <tr><td style="background:#0F172A;padding:28px 40px;border-radius:16px 16px 0 0;">
    <table width="100%"><tr>
      <td><span style="font-size:24px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">🌿 Climbird</span></td>
      <td align="right"><span style="font-size:11px;font-weight:700;color:#85C440;text-transform:uppercase;letter-spacing:2px;">New Lead</span></td>
    </tr></table>
  </td></tr>

  <!-- Green Accent Strip -->
  <tr><td style="background:linear-gradient(90deg,#85C440,#6CA334);height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- Title Section -->
  <tr><td style="background:#FFFFFF;padding:36px 40px 20px;">
    <h1 style="margin:0 0 6px;font-size:26px;font-weight:800;color:#0F172A;letter-spacing:-0.5px;">New Contact Form Submission</h1>
    <p style="margin:0;font-size:14px;color:#94A3B8;">Received on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
  </td></tr>

  <!-- Details Card -->
  <tr><td style="background:#FFFFFF;padding:0 40px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;">
      
      <tr><td style="padding:20px 24px 12px;">
        <span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Contact Name</span><br>
        <span style="font-size:18px;font-weight:700;color:#0F172A;">${name}</span>
      </td></tr>
      
      <tr><td style="padding:0 24px;"><div style="border-top:1px solid #E2E8F0;"></div></td></tr>
      
      <tr><td style="padding:12px 24px;">
        <table width="100%"><tr>
          <td width="50%" style="vertical-align:top;padding-right:12px;">
            <span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Email</span><br>
            <a href="mailto:${email}" style="font-size:15px;font-weight:600;color:#85C440;text-decoration:none;">${email}</a>
          </td>
          <td width="50%" style="vertical-align:top;">
            <span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Phone</span><br>
            <span style="font-size:15px;font-weight:600;color:#0F172A;">${phone || 'Not provided'}</span>
          </td>
        </tr></table>
      </td></tr>
      
      <tr><td style="padding:0 24px;"><div style="border-top:1px solid #E2E8F0;"></div></td></tr>
      
      <tr><td style="padding:12px 24px;">
        <span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Interested Service</span><br>
        <span style="display:inline-block;margin-top:6px;background:#85C440;color:#FFFFFF;font-size:13px;font-weight:700;padding:6px 16px;border-radius:20px;">${service}</span>
      </td></tr>

      <tr><td style="padding:0 24px;"><div style="border-top:1px solid #E2E8F0;"></div></td></tr>
      
      <tr><td style="padding:12px 24px 20px;">
        <span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Message</span><br>
        <p style="margin:8px 0 0;font-size:15px;color:#334155;line-height:1.7;white-space:pre-wrap;">${message}</p>
      </td></tr>

    </table>
  </td></tr>

  <!-- Quick Action -->
  <tr><td style="background:#FFFFFF;padding:0 40px 36px;" align="center">
    <a href="mailto:${email}?subject=Re: Your Inquiry about ${encodeURIComponent(service)} — Climbird Technologies" style="display:inline-block;background:#0F172A;color:#FFFFFF;font-size:14px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">Reply to ${name} →</a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px 40px;text-align:center;">
    <p style="margin:0;font-size:12px;color:#94A3B8;">This is an automated notification from your website contact form.</p>
    <p style="margin:6px 0 0;font-size:12px;color:#94A3B8;">© ${new Date().getFullYear()} Climbird Technologies · Kathmandu, Nepal</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
      `,
    });

    // 2. Send auto-reply to the client
    await transporter.sendMail({
      from: `"Climbird Technologies" <${fromAddr}>`,
      to: email,
      subject: `Thank you, ${name}! We received your inquiry — Climbird Technologies`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F0F2F5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F2F5;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header with Logo -->
  <tr><td style="background:#0F172A;padding:32px 40px;border-radius:16px 16px 0 0;text-align:center;">
    <span style="font-size:28px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">🌿 Climbird</span>
    <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#85C440;text-transform:uppercase;letter-spacing:3px;">Technologies</p>
  </td></tr>

  <!-- Green Accent -->
  <tr><td style="background:linear-gradient(90deg,#85C440,#6CA334);height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- Greeting -->
  <tr><td style="background:#FFFFFF;padding:40px 40px 24px;">
    <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#0F172A;letter-spacing:-0.5px;">Thank you, ${name}! 🎉</h1>
    <p style="margin:0;font-size:16px;color:#64748B;line-height:1.7;">
      We have received your inquiry about <strong style="color:#0F172A;">${service}</strong> and our team is already on it. You can expect a personalized response within <strong style="color:#85C440;">24 hours</strong>.
    </p>
  </td></tr>

  <!-- Message Summary -->
  <tr><td style="background:#FFFFFF;padding:0 40px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;">
      <tr><td style="padding:20px 24px 8px;">
        <span style="font-size:10px;font-weight:800;color:#85C440;text-transform:uppercase;letter-spacing:2px;">Your Message</span>
      </td></tr>
      <tr><td style="padding:0 24px 20px;">
        <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;font-style:italic;white-space:pre-wrap;">"${message}"</p>
      </td></tr>
    </table>
  </td></tr>

  <!-- What Happens Next -->
  <tr><td style="background:#FFFFFF;padding:0 40px 32px;">
    <h2 style="margin:0 0 16px;font-size:18px;font-weight:800;color:#0F172A;">What Happens Next?</h2>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="40" style="vertical-align:top;padding-bottom:14px;">
          <div style="width:28px;height:28px;background:#85C440;color:#FFFFFF;font-size:13px;font-weight:800;border-radius:50%;text-align:center;line-height:28px;">1</div>
        </td>
        <td style="vertical-align:top;padding-bottom:14px;">
          <span style="font-size:14px;font-weight:700;color:#0F172A;">Review</span>
          <p style="margin:2px 0 0;font-size:13px;color:#64748B;line-height:1.5;">Our team reviews your requirements and matches you with the right specialist.</p>
        </td>
      </tr>
      <tr>
        <td width="40" style="vertical-align:top;padding-bottom:14px;">
          <div style="width:28px;height:28px;background:#85C440;color:#FFFFFF;font-size:13px;font-weight:800;border-radius:50%;text-align:center;line-height:28px;">2</div>
        </td>
        <td style="vertical-align:top;padding-bottom:14px;">
          <span style="font-size:14px;font-weight:700;color:#0F172A;">Discovery Call</span>
          <p style="margin:2px 0 0;font-size:13px;color:#64748B;line-height:1.5;">We schedule a free 30-minute consultation to understand your goals in depth.</p>
        </td>
      </tr>
      <tr>
        <td width="40" style="vertical-align:top;">
          <div style="width:28px;height:28px;background:#85C440;color:#FFFFFF;font-size:13px;font-weight:800;border-radius:50%;text-align:center;line-height:28px;">3</div>
        </td>
        <td style="vertical-align:top;">
          <span style="font-size:14px;font-weight:700;color:#0F172A;">Custom Proposal</span>
          <p style="margin:2px 0 0;font-size:13px;color:#64748B;line-height:1.5;">You receive a tailored strategy and quote — no cookie-cutter packages, ever.</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Services Overview -->
  <tr><td style="background:#FFFFFF;padding:0 40px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F172A;border-radius:12px;overflow:hidden;">
      <tr><td style="padding:24px 28px 12px;">
        <span style="font-size:10px;font-weight:800;color:#85C440;text-transform:uppercase;letter-spacing:2px;">Our Services</span>
      </td></tr>
      <tr><td style="padding:0 28px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50%" style="padding:6px 0;"><span style="font-size:13px;color:#CBD5E1;">🤖 AI & Automation</span></td>
            <td width="50%" style="padding:6px 0;"><span style="font-size:13px;color:#CBD5E1;">🛒 e-Commerce</span></td>
          </tr>
          <tr>
            <td style="padding:6px 0;"><span style="font-size:13px;color:#CBD5E1;">💻 Web Design & Dev</span></td>
            <td style="padding:6px 0;"><span style="font-size:13px;color:#CBD5E1;">📈 Digital Marketing</span></td>
          </tr>
          <tr>
            <td style="padding:6px 0;"><span style="font-size:13px;color:#CBD5E1;">🔧 Technical Support</span></td>
            <td style="padding:6px 0;"><span style="font-size:13px;color:#CBD5E1;">🎨 Branding & Design</span></td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:#FFFFFF;padding:0 40px 36px;text-align:center;">
    <a href="https://climbirdtechnologies.com/services" style="display:inline-block;background:#85C440;color:#FFFFFF;font-size:14px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">Explore All Services →</a>
  </td></tr>

  <!-- Divider -->
  <tr><td style="background:#FFFFFF;padding:0 40px;"><div style="border-top:1px solid #E2E8F0;"></div></td></tr>

  <!-- Contact Info -->
  <tr><td style="background:#FFFFFF;padding:24px 40px;border-radius:0 0 16px 16px;">
    <table width="100%"><tr>
      <td style="vertical-align:top;">
        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0F172A;">Need immediate help?</p>
        <p style="margin:0;font-size:13px;color:#64748B;">
          📞 <a href="tel:+9779865046396" style="color:#85C440;text-decoration:none;font-weight:600;">+977 9865046396</a><br>
          ✉️ <a href="mailto:info@climbirdtechnologies.com" style="color:#85C440;text-decoration:none;font-weight:600;">info@climbirdtechnologies.com</a><br>
          📍 Kathmandu, Nepal
        </p>
      </td>
      <td align="right" style="vertical-align:top;">
        <a href="https://www.facebook.com/profile.php?id=61574303680004" style="display:inline-block;width:32px;height:32px;background:#0F172A;border-radius:50%;text-align:center;line-height:32px;text-decoration:none;font-size:14px;margin-left:6px;">📘</a>
        <a href="https://www.instagram.com/climbirdtechnologies/" style="display:inline-block;width:32px;height:32px;background:#0F172A;border-radius:50%;text-align:center;line-height:32px;text-decoration:none;font-size:14px;margin-left:6px;">📸</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px 40px;text-align:center;">
    <p style="margin:0 0 4px;font-size:12px;color:#94A3B8;">
      <a href="https://climbirdtechnologies.com" style="color:#85C440;text-decoration:none;font-weight:600;">climbirdtechnologies.com</a>
    </p>
    <p style="margin:0;font-size:11px;color:#94A3B8;">© ${new Date().getFullYear()} Climbird Technologies Pvt. Ltd. · All rights reserved.</p>
    <p style="margin:4px 0 0;font-size:11px;color:#CBD5E1;">Empowering businesses through AI, web development, and digital marketing.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
      `,
    });

    console.log(`[CONTACT] Email sent successfully for: ${name} (${email})`);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('[CONTACT] Email send failed:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
  }
});

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

const distPath = path.join(__dirname, 'dist');
console.log(`[INFO] Attempting to serve static files from: ${distPath}`);

if (fs.existsSync(distPath)) {
  console.log('[SUCCESS] dist directory found.');
  app.use(express.static(distPath));
} else {
  console.error('[ERROR] dist directory NOT found! Build may have failed.');
}

// SPA Routing
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error(`[ERROR] index.html not found at ${indexPath}`);
    res.status(404).send('Application Error: Build files missing.');
  }
});

app.listen(PORT, () => {
  console.log(`[SUCCESS] Server is listening on port ${PORT}`);
});
