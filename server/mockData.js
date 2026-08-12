import { queryCitiesFromSQLite } from './db/sqliteEngine.js';

export function getCitiesList() {
  try {
    const dbCities = queryCitiesFromSQLite();
    if (dbCities && dbCities.length > 0) {
      return dbCities.map(c => ({
        id: c.city_id,
        name: c.name,
        country: c.country,
        aliases: typeof c.aliases === 'string' ? c.aliases.split(',').map(s => s.trim()) : (c.aliases || [])
      }));
    }
  } catch (err) {
    console.error('Failed to load cities from SQLite, using static fallback:', err);
  }

  return FALLBACK_CITIES;
}

const FALLBACK_CITIES = [
  { id: 'taipei', name: '台北 (Taipei)', country: '台灣', aliases: ['台北', 'taipei', '臺北', '信義區', '中山區'] },
  { id: 'yilan', name: '宜蘭 (Yilan)', country: '台灣', aliases: ['宜蘭', 'yilan', '礁溪', '羅東', '頭城'] },
  { id: 'taichung', name: '台中 (Taichung)', country: '台灣', aliases: ['台中', 'taichung', '臺中', '逢甲', '西屯'] },
  { id: 'kaohsiung', name: '高雄 (Kaohsiung)', country: '台灣', aliases: ['高雄', 'kaohsiung', '左營', '鹽埕'] },
  { id: 'tainan', name: '台南 (Tainan)', country: '台灣', aliases: ['台南', 'tainan', '安平', '赤崁樓'] },
  { id: 'okinawa', name: '沖繩 (Okinawa)', country: '日本', aliases: ['沖繩', 'okinawa', '那霸', '美國村'] },
  { id: 'tokyo', name: '東京 (Tokyo)', country: '日本', aliases: ['東京', 'tokyo', '新宿', '銀座', '淺草'] }
];

export const mockCities = getCitiesList();
