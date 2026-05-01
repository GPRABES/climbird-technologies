import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

console.log(`[INFO] Initializing server on port ${PORT}...`);

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static files from the 'dist' directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Handle SPA routing: serve index.html for any unknown routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`[ERROR] Failed to serve index.html: ${err.message}`);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SUCCESS] Server is listening on 0.0.0.0:${PORT}`);
});

server.on('error', (err) => {
  console.error(`[FATAL] Server failed to start: ${err.message}`);
});
