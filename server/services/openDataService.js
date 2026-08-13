import db from '../db/sqliteEngine.js';
import axios from 'axios';

export async function fetchOpenDataAttractions() {
  try {
    // Cultural Ministry Open Data Integration
    const res = await axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5', { timeout: 3000 });
    if (res.data && Array.isArray(res.data)) {
      return res.data.slice(0, 10).map(item => ({
        title: item.title,
        location: item.showInfo?.[0]?.locationName || '全台各區',
        price: item.showInfo?.[0]?.price || '免費 / 現場售票',
        time: item.startDate + ' ~ ' + item.endDate
      }));
    }
  } catch (err) {
    console.log('[OpenDataService] Cultural API fallback used.');
  }

  return [
    { title: '台灣當代文化實驗場 親子特別展', location: '台北市大安區', price: '免費入場', time: '常設展' },
    { title: '國立臺灣美術館 兒童藝術基地', location: '台中市西區', price: '免費入場', time: '常設展' }
  ];
}
