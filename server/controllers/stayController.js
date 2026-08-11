import { getAllCities, resolveCity } from '../services/cityService.js';
import { searchStays } from '../services/hotelScraperService.js';
import { priceTrends } from '../data/dataset.js';
import { createLogger } from '../utils/logger.js';

export function getCitiesHandler(req, res) {
  res.json({ success: true, data: getAllCities() });
}

export async function searchStaysHandler(req, res) {
  try {
    const logger = createLogger();
    const results = await searchStays(req.query, logger.log);

    res.json({
      success: true,
      logs: logger.logs,
      count: results.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export function getTrendsHandler(req, res) {
  const { cityId = 'taipei' } = req.query;
  const resolved = resolveCity(cityId);
  const targetKey = resolved.cityId === 'all' ? 'taipei' : resolved.cityId;
  const trendData = priceTrends[targetKey] || priceTrends['taipei'];

  res.json({
    success: true,
    cityId: targetKey,
    cityName: resolved.cityName,
    data: trendData
  });
}
