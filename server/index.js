import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockCities, mockPriceTrends } from './mockData.js';
import { runScraperJob, runPackageScraperJob, runFamilyAttractionScraperJob, runTheaterScraperJob } from './scraper.js';
import { handleLineWebhook } from './lineBot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// LINE Bot Webhook Endpoint
app.post('/api/line/webhook', handleLineWebhook);

// Memory store for price alerts
const priceAlerts = [];

// 1. Get Cities
app.get('/api/cities', (req, res) => {
  res.json({ success: true, data: mockCities });
});

// 2. Search Stays (Scraper endpoint with live logs)
app.get('/api/search', async (req, res) => {
  try {
    const logs = [];
    const logHandler = (msg) => {
      logs.push({ timestamp: new Date().toLocaleTimeString(), message: msg });
    };

    const results = await runScraperJob(req.query, logHandler);
    res.json({
      success: true,
      logs,
      count: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Search Package Tours
app.get('/api/packages', async (req, res) => {
  try {
    const logs = [];
    const logHandler = (msg) => {
      logs.push({ timestamp: new Date().toLocaleTimeString(), message: msg });
    };

    const results = await runPackageScraperJob(req.query, logHandler);
    res.json({
      success: true,
      logs,
      count: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Search Family Attractions
app.get('/api/family-attractions', async (req, res) => {
  try {
    const logs = [];
    const logHandler = (msg) => {
      logs.push({ timestamp: new Date().toLocaleTimeString(), message: msg });
    };

    const results = await runFamilyAttractionScraperJob(req.query, logHandler);
    res.json({
      success: true,
      logs,
      count: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Search Family Theaters (近半年親子劇團表演與最早開放購票時間)
app.get('/api/theaters', async (req, res) => {
  try {
    const logs = [];
    const logHandler = (msg) => {
      logs.push({ timestamp: new Date().toLocaleTimeString(), message: msg });
    };

    const results = await runTheaterScraperJob(req.query, logHandler);
    res.json({
      success: true,
      logs,
      count: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Price Trends
app.get('/api/trends', (req, res) => {
  const { cityId = 'taipei' } = req.query;
  const trendData = mockPriceTrends[cityId] || mockPriceTrends['taipei'];
  res.json({ success: true, cityId, data: trendData });
});

// 7. Register Price Alert
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Serve static frontend assets in production mode
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback all non-API GET requests to index.html for SPA routing
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] Full-stack StayPulse cloud server running on port ${PORT}`);
});
