import { searchPackages } from '../services/packageService.js';
import { scrapeBlogAttractions } from '../services/blogScraperService.js';
import { scrapeOpenDataAttractions, isExhibitionExpired } from '../services/openDataService.js';
import { searchTheaters } from '../services/theaterService.js';
import { resolveCity } from '../services/cityService.js';
import { familyAttractions } from '../data/dataset.js';
import { attractionsCache, refreshAllAttractionsCache } from '../schedulers/attractionsCron.js';
import { createLogger } from '../utils/logger.js';


export async function searchPackagesHandler(req, res) {
  try {
    const logger = createLogger();
    const results = await searchPackages(req.query, logger.log);

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

export async function searchFamilyAttractionsHandler(req, res) {
  try {
    const logger = createLogger();
    const inputCity = (req.query.cityId && req.query.cityId.trim()) ? req.query.cityId : '台中';
    const { cityId: normCityId, cityName: normCityName, searchTerms } = resolveCity(inputCity);

    logger.log(`[SYS] 抓取「${normCityName}」最新熱門親子景點庫與設施數據...`);

    // 1. Seed attractions
    let results = familyAttractions.filter(f => {
      const cid = (f.cityId || '').toLowerCase();
      const cname = (f.cityName || '').toLowerCase();
      const name = (f.name || '').toLowerCase();
      return searchTerms.some(term => cid.includes(term) || cname.includes(term) || name.includes(term));
    });

    // 2. Blog scraper
    try {
      const blogAttractions = await scrapeBlogAttractions(normCityName, logger.log);
      if (blogAttractions && blogAttractions.length > 0) {
        results = [...results, ...blogAttractions];
      }
    } catch (err) {
      logger.log(`[WARNING] 即時部落格文章抓取失敗: ${err.message}`);
    }

    // 3. OpenData cache or fetch
    try {
      const cachedOpenData = attractionsCache.data[normCityId] || attractionsCache.data[normCityName];
      if (cachedOpenData && cachedOpenData.length > 0) {
        logger.log(`[CACHE-HIT] 命中全台背景定時巡檢快取 (同步時間: ${attractionsCache.lastUpdated || '已同步'})，載入 ${cachedOpenData.length} 筆特展`);
        results = [...results, ...cachedOpenData];
      } else {
        const openDataAttractions = await scrapeOpenDataAttractions(normCityName, logger.log);
        if (openDataAttractions && openDataAttractions.length > 0) {
          results = [...results, ...openDataAttractions];
        }
      }
    } catch (err) {
      logger.log(`[WARNING] 官方 Open Data API 串接略過: ${err.message}`);
    }

    // 4. Expired exhibition filter
    const cleanedResults = results.map(item => {
      const copy = { ...item };
      if (copy.exhibitionInfo && copy.exhibitionInfo.date) {
        if (isExhibitionExpired(copy.exhibitionInfo.date)) {
          delete copy.exhibitionInfo;
        }
      }
      return copy;
    }).filter(item => {
      if (item.category && item.category.includes('展覽') && !item.exhibitionInfo && item.id.includes('open-data')) {
        return false;
      }
      return true;
    });

    const finalResults = cleanedResults.slice(0, 20);
    logger.log(`[SUCCESS] 成功獲取 ${finalResults.length} 個「${normCityName}」最新熱門親子景點與展覽 (已通過防禦過濾器)`);

    res.json({
      success: true,
      logs: logger.logs,
      count: finalResults.length,
      data: finalResults
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function searchTheatersHandler(req, res) {
  try {
    const logger = createLogger();
    const results = await searchTheaters(req.query, logger.log);

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

export function attractionsStatusHandler(req, res) {
  res.json({
    success: true,
    lastUpdated: attractionsCache.lastUpdated || '伺服器啟動中 (背景巡檢進行中)',
    cronInterval: '每 6 小時全自動背景巡檢',
    status: 'ACTIVE'
  });
}

export async function refreshAttractionsHandler(req, res) {
  try {
    const result = await refreshAllAttractionsCache(console.log);
    res.json({
      success: true,
      message: '全台最新展覽與景點特展手動即時刷新成功！',
      lastUpdated: result.lastUpdated,
      totalEvents: result.totalEvents
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
