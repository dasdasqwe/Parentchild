import { scrapeOpenDataAttractions, isExhibitionExpired } from '../services/openDataService.js';
import { cities } from '../data/dataset.js';

export const attractionsCache = {
  lastUpdated: null,
  data: {}
};

export async function refreshAllAttractionsCache(onLog = console.log) {
  onLog(`[CRON-SCHEDULER] 啟動全台 22 縣市最新展覽與親子活動自動巡檢與快取更新...`);
  const nowStr = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

  let totalEvents = 0;
  for (const city of cities) {
    try {
      const cityName = city.name.split(' ')[0];
      const liveData = await scrapeOpenDataAttractions(cityName, () => {});
      
      const cleanData = liveData.filter(item => {
        if (item.exhibitionInfo && item.exhibitionInfo.date) {
          return !isExhibitionExpired(item.exhibitionInfo.date);
        }
        return true;
      });

      attractionsCache.data[city.id] = cleanData;
      attractionsCache.data[cityName] = cleanData;
      totalEvents += cleanData.length;
    } catch (err) {
      onLog(`[CRON-WARNING] 巡檢「${city.name}」時發生跳過: ${err.message}`);
    }
  }

  attractionsCache.lastUpdated = nowStr;
  onLog(`[CRON-SUCCESS] 全台最新展覽與活動自動巡檢完畢！共更新 ${totalEvents} 筆最新開放資料活動 (${nowStr})`);
  return { lastUpdated: nowStr, totalEvents };
}

export function startCronScheduler() {
  console.log('[CRON-ENGINE] 已成功啟動「全台最新景點與特展」自動定時巡檢排程引擎 (每6小時背景動態刷新)。');
  
  setTimeout(() => {
    refreshAllAttractionsCache(console.log).catch(err => console.error('[CRON-INIT-ERR]', err));
  }, 10000);

  setInterval(() => {
    refreshAllAttractionsCache(console.log).catch(err => console.error('[CRON-INTERVAL-ERR]', err));
  }, 6 * 60 * 60 * 1000);
}
