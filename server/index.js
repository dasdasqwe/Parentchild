import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { initDatabase } from './db/sqliteEngine.js';
import { searchStays } from './controllers/stayController.js';
import { getAttractions, getShows } from './controllers/exploreController.js';
import { handleWebhook, handleSimulate } from './controllers/lineController.js';
import { createItinerary, getItinerary } from './controllers/itineraryController.js';
import { fetchOpenDataAttractions } from './services/openDataService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize SQLite Tables & Seed Data
initDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/stays/search', searchStays);
app.get('/api/explore/attractions', getAttractions);
app.get('/api/explore/shows', getShows);
app.get('/api/family-attractions', async (req, res) => {
  const data = await fetchOpenDataAttractions();
  res.json({ success: true, data });
});

// LINE Bot Routes
app.post('/api/line/webhook', handleWebhook);
app.post('/api/line/simulate', handleSimulate);

// Itinerary Routes
app.post('/api/itineraries', createItinerary);
app.get('/api/itineraries/:shareCode', getItinerary);

// Static files for Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Server] StayPulse Express backend running on http://localhost:${PORT}`);
});
