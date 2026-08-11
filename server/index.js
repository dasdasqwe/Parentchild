import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getStays } from './controllers/stayController.js';
import { handleLineWebhook, simulateLineMessage } from './controllers/lineController.js';
import { scrapeOpenDataAttractions } from './services/openDataService.js';
import { mockPackageTours, mockFamilyTheaters } from './mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/stays/search', getStays);
app.get('/api/search', getStays); // Backward-compatible alias

app.post('/api/line/webhook', handleLineWebhook);
app.post('/api/line/simulate', simulateLineMessage);

// Open Data Attractions Route
app.get('/api/family-attractions', async (req, res) => {
  const cityName = req.query.cityName || req.query.cityId || '台中';
  const data = await scrapeOpenDataAttractions(cityName);
  return res.json({ success: true, data });
});

// Packages & Theaters Routes
app.get('/api/packages', (req, res) => {
  return res.json({ success: true, data: mockPackageTours });
});

app.get('/api/theaters', (req, res) => {
  return res.json({ success: true, data: mockFamilyTheaters });
});

// Serve Vite SPA static production build in dist/
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Clean StayPulse modular server running on port ${PORT}`);
});
