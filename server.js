import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

console.log(`[INFO] Current Directory: ${process.cwd()}`);
try {
  const files = fs.readdirSync('.');
  console.log(`[INFO] Files in directory: ${files.join(', ')}`);
} catch (e) {
  console.error(`[ERROR] Could not read directory: ${e.message}`);
}

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
