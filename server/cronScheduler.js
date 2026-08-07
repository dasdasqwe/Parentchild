import { scrapeOpenDataAttractions, isExhibitionExpired } from './openDataScraper.js';
import { mockCities } from './mockData.js';

// 全域即時展覽與景點動態快取
export const attractionsCache = {
  lastUpdated: null,
  data: {} // cityId -> attractions list
};

/**
 * 刷新全台指定縣市之最新 Open Data 展覽與景點活動
 */
export async function refreshAllAttractionsCache(onLog = console.log) {
  onLog(`[CRON-SCHEDULER] 啟動全台 22 縣市最新展覽與親子活動自動巡檢與快取更新...`);
  const nowStr = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

  let totalEvents = 0;
  for (const city of mockCities) {
    try {
      const cityName = city.name.split(' ')[0];
      const liveData = await scrapeOpenDataAttractions(cityName, () => {});
      
      // 自動連同日期清理過期展覽
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

/**
 * 啟動定時自動巡檢排程器 (每 6 小時自動執行一次)
 */
export function startCronScheduler() {
  console.log('[CRON-ENGINE] 已成功啟動「全台最新景點與特展」自動定時巡檢排程引擎 (每6小時背景動態刷新)。');
  
  // 伺服器啟動 10 秒後進行首次背景全量自動巡檢
  setTimeout(() => {
    refreshAllAttractionsCache(console.log).catch(err => console.error('[CRON-INIT-ERR]', err));
  }, 10000);

  // 每 6 小時 (6 * 60 * 60 * 1000 ms) 自動觸發一次巡檢
  setInterval(() => {
    refreshAllAttractionsCache(console.log).catch(err => console.error('[CRON-INTERVAL-ERR]', err));
  }, 6 * 60 * 60 * 1000);
}
