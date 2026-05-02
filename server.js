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
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f7; border-radius: 16px;">
          <div style="background: #0D0D0D; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #FDBB30; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
          </div>
          <div style="background: white; padding: 32px; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #999; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Name</td></tr>
              <tr><td style="padding: 0 0 16px; font-size: 16px; color: #1a1a1a; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 10px 0; color: #999; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Email</td></tr>
              <tr><td style="padding: 0 0 16px; font-size: 16px;"><a href="mailto:${email}" style="color: #FDBB30; text-decoration: none;">${email}</a></td></tr>
              <tr><td style="padding: 10px 0; color: #999; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Phone</td></tr>
              <tr><td style="padding: 0 0 16px; font-size: 16px; color: #1a1a1a;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 10px 0; color: #999; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Service</td></tr>
              <tr><td style="padding: 0 0 16px; font-size: 16px; color: #1a1a1a; font-weight: 600;">${service}</td></tr>
              <tr><td style="padding: 10px 0; color: #999; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Message</td></tr>
              <tr><td style="padding: 0 0 16px; font-size: 16px; color: #1a1a1a; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td></tr>
            </table>
          </div>
        </div>
      `,
    });

    // 2. Send auto-reply to the client
    await transporter.sendMail({
      from: `"Climbird Technologies" <${fromAddr}>`,
      to: email,
      subject: `We received your message — Climbird Technologies`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f7; border-radius: 16px;">
          <div style="background: #0D0D0D; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #FDBB30; margin: 0; font-size: 22px;">Thank You, ${name}!</h1>
          </div>
          <div style="background: white; padding: 32px; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #333; font-size: 16px; line-height: 1.7; margin-top: 0;">
              We have received your inquiry about <strong>${service}</strong> and our team will get back to you within <strong>24 hours</strong>.
            </p>
            <div style="background: #f9f9f7; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">Your Message</p>
              <p style="color: #333; font-size: 15px; line-height: 1.6; margin-bottom: 0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color: #333; font-size: 16px; line-height: 1.7;">
              If you need immediate assistance, feel free to call us at <a href="tel:+9779865046396" style="color: #FDBB30; text-decoration: none; font-weight: 600;">+977 9865046396</a> or reply to this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #999; font-size: 13px; margin-bottom: 0;">
              Best regards,<br />
              <strong style="color: #1a1a1a;">The Climbird Technologies Team</strong><br />
              <a href="https://climbirdtechnologies.com" style="color: #FDBB30; text-decoration: none;">climbirdtechnologies.com</a>
            </p>
          </div>
        </div>
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
