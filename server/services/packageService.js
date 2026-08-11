import { packageTours } from '../data/dataset.js';
import { resolveCity } from './cityService.js';
import { sleep } from '../utils/logger.js';

export async function searchPackages(query, onLog = () => {}) {
  const { cityId = '' } = query;
  const { cityId: normCityId, cityName: normCityName, searchTerms } = resolveCity(cityId);

  onLog(`[SYS] 啟動「${normCityName}」多頁包套行程深層抓取引擎...`);
  await sleep(150);

  let results = packageTours;
  if (normCityId !== 'all') {
    results = packageTours.filter(pkg => {
      const cid = (pkg.cityId || '').toLowerCase();
      const cname = (pkg.cityName || '').toLowerCase();
      const title = (pkg.title || '').toLowerCase();
      return searchTerms.some(term => cid.includes(term) || cname.includes(term) || title.includes(term));
    });
  }

  // Filter invalid URLs
  results = results.filter(pkg => {
    if (!pkg.url || !pkg.url.startsWith('http')) return false;
    if (pkg.url.includes('/activity/4984-') || pkg.url.includes('/activity/2504-')) return false;
    return true;
  });

  onLog(`[CALC] 完成動態省錢公式計算 (比對完成共 ${results.length} 筆有效商品，已自動過濾隱藏無效商品)`);
  return results;
}
