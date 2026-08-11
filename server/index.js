import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/env.js';
import { handleLineWebhook, simulateLineMessage } from './lineBot.js';
import { startCronScheduler } from './schedulers/attractionsCron.js';
import {
  getCitiesHandler,
  searchStaysHandler,
  getTrendsHandler
} from './controllers/stayController.js';
import {
  searchPackagesHandler,
  searchFamilyAttractionsHandler,
  searchTheatersHandler,
  attractionsStatusHandler,
  refreshAttractionsHandler
} from './controllers/attractionController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

// Background periodic cron scheduler engine
startCronScheduler();

// LINE Bot Webhook Endpoint & Simulation Endpoint
app.post('/api/line/webhook', handleLineWebhook);

app.all('/api/line/simulate', async (req, res) => {
  try {
    const query = req.query.query || req.body?.query || req.body?.text || '宜蘭 3000';
    const result = await simulateLineMessage(query);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Price Alerts Memory Store
const priceAlerts = [];

// API Routes
app.get('/api/cities', getCitiesHandler);
app.get('/api/search', searchStaysHandler);
app.get('/api/packages', searchPackagesHandler);
app.get('/api/family-attractions', searchFamilyAttractionsHandler);
app.get('/api/theaters', searchTheatersHandler);
app.get('/api/trends', getTrendsHandler);
app.get('/api/attractions-status', attractionsStatusHandler);
app.post('/api/refresh-attractions', refreshAttractionsHandler);

// Register Price Alert
app.post('/api/alerts', (req, res) => {
  const { email, destination, targetBudget } = req.body;
  if (!email || !targetBudget) {
    return res.status(400).json({ success: false, error: '請提供 Email 與目標預算' });
  }
  const alertItem = {
    id: Date.now(),
    email,
    destination,
    targetBudget,
    createdAt: new Date().toISOString()
  };
  priceAlerts.push(alertItem);
  res.json({ success: true, message: '降價提醒訂閱成功！已啟動24小時監控頻道。', alert: alertItem });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Serve static assets in production mode
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback all non-API GET requests to index.html for SPA routing
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        res.status(200).send('StayPulse Clean Cloud Engine Active');
      }
    });
  }
});

// Global Error Safeguards
process.on('uncaughtException', (err) => {
  console.error('[SERVER UNCAUGHT EXCEPTION SAFEGUARD]', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[SERVER UNHANDLED REJECTION SAFEGUARD]', reason);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Clean StayPulse modular cloud server running on port ${PORT} (0.0.0.0)`);
});
