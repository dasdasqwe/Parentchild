import axios from 'axios';

const CULTURE_API_URL = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
];

function normStr(str) {
  return (str || '').toLowerCase().replace(/臺/g, '台');
}

export function isExhibitionExpired(dateStr) {
  if (!dateStr) return false;
  const now = new Date();
  
  const dateMatches = dateStr.match(/\d{4}[.\-\/]\d{1,2}[.\-\/]\d{1,2}/g);
  if (dateMatches && dateMatches.length > 0) {
    const lastDateStr = dateMatches[dateMatches.length - 1].replace(/[.]/g, '/');
    const endDate = new Date(lastDateStr);
    if (!isNaN(endDate.getTime())) {
      endDate.setHours(23, 59, 59, 999);
      if (endDate < now) {
        return true;
      }
    }
  }
  return false;
}

export async function scrapeOpenDataAttractions(cityName, onLog = console.log) {
  try {
    onLog(`[OPEN-API] 正向文化部官方 Open Data API 請求「${cityName}」最新展覽與親子活動...`);
    const response = await axios.get(CULTURE_API_URL, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    const cityNorm = normStr(cityName);
    const attractions = [];

    response.data.forEach((item, idx) => {
      const title = item.title || '';
      const titleNorm = normStr(title);
      const description = item.descriptionFilterHtml || item.description || '';
      const showInfoList = item.showInfo || [];

      const matchedShow = showInfoList.find(show => {
        const locNameNorm = normStr(show.locationName);
        const locAddressNorm = normStr(show.location);
        return locNameNorm.includes(cityNorm) || locAddressNorm.includes(cityNorm) || titleNorm.includes(cityNorm);
      });

      if (matchedShow) {
        const timeRange = matchedShow.time || '即日起開放參觀';
        const endTime = matchedShow.endTime || matchedShow.time || '';

        if (isExhibitionExpired(endTime) || isExhibitionExpired(timeRange)) {
          return;
        }

        const locationName = matchedShow.locationName || matchedShow.location || `${cityName} 展覽場館`;
        const fullLocation = matchedShow.location ? `${matchedShow.location} (${locationName})` : locationName;
        const img = item.imageUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

        attractions.push({
          id: `fam-open-data-${idx}-${cityNorm}`,
          cityId: cityNorm,
          cityName: cityName,
          name: title.replace(/【.*?】/g, '').trim(),
          location: fullLocation,
          category: '官方 Open Data 認證展覽',
          image: img,
          rating: 4.8,
          features: ['文化部官方認證', '室內觀展防雨防暑', '展覽展期導覽'],
          description: description.substring(0, 100) ? `${description.substring(0, 100)}...` : `位於${cityName}之精彩展覽活動。`,
          highlights: `展期時間: ${timeRange}。點選標題可直接開啟地圖導覽定位。`,
          exhibitionInfo: {
            name: `【官方展覽】${title}`,
            date: timeRange,
            description: description.substring(0, 120) ? `${description.substring(0, 120)}...` : '詳細展覽內容請至現場導覽台參閱。'
          }
        });
      }
    });

    onLog(`[OPEN-API-SUCCESS] 成功從官方 Open Data API 中篩選出 ${attractions.length} 筆「${cityName}」熱門展覽與景點！`);
    return attractions;
  } catch (err) {
    onLog(`[OPEN-API-WARNING] 觀光署/文化部 Open Data API 請求略過: ${err.message}`);
    return [];
  }
}
