import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.resolve(process.cwd(), 'server', 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'staypulse_hotels.db');
const db = new Database(dbPath);

// Initialize SQLite Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hotel_key TEXT UNIQUE NOT NULL,
    name_zh TEXT NOT NULL,
    name_en TEXT NOT NULL,
    city_name TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    rating REAL DEFAULT 4.8,
    reviews_count INTEGER DEFAULT 1200,
    hotel_class INTEGER DEFAULT 4,
    base_price INTEGER DEFAULT 3200,
    image_url TEXT,
    amenities TEXT,
    keywords TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_hotels_city ON hotels(city_name);
  CREATE INDEX IF NOT EXISTS idx_hotels_keywords ON hotels(keywords);
`);

// Pre-populate Master Database with Authentic Real Hotels & Detailed Addresses
const MASTER_HOTELS_SEED = [
  {
    hotel_key: 'w_taipei',
    name_zh: '台北 W 飯店',
    name_en: 'W Taipei',
    city_name: '台北',
    address: '台北市信義區忠孝東路五段10號',
    description: '坐落於信義區摩天大樓群中，擁有時尚高空無邊際泳池、極致景觀酒吧與奢華 SPA。',
    rating: 4.8,
    reviews_count: 5420,
    hotel_class: 5,
    base_price: 6800,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['高空無邊際泳池', '捷運市府站連通', 'WET Bar 景觀酒吧', 'AWAY SPA 水療', '免費 Wi-Fi']),
    keywords: 'w hotel, w 飯店, w taipei, 台北 w, 台北w飯店, 信義區 w'
  },
  {
    hotel_key: 'regent_taipei',
    name_zh: '台北晶華酒店',
    name_en: 'Regent Taipei',
    city_name: '台北',
    address: '台北市中山區中山北路二段39巷3號',
    description: '台北經典頂級奢華飯店，配備頂樓露天泳池、栢麗廳雙層 Buffet 百匯與精品購物商場。',
    rating: 4.9,
    reviews_count: 8900,
    hotel_class: 5,
    base_price: 4420,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['頂樓露天溫水泳池', '栢麗廳豪華自助早餐', '沐蘭 SPA 芳療', '中山捷運站步行 5 分鐘', '免費 Wi-Fi']),
    keywords: '晶華, 晶華酒店, 台北晶華酒店, regent taipei, 中山區晶華'
  },
  {
    hotel_key: 'cozzi_minsheng',
    name_zh: '和逸飯店・台北民生館',
    name_en: 'HOTEL COZZI Minsheng Taipei',
    city_name: '台北',
    address: '台北市中山區民生東路二段178號',
    description: '位於台北市中心商業樞紐，簡約舒適的和風設計，深受商務與親子家庭喜愛。',
    rating: 4.7,
    reviews_count: 2150,
    hotel_class: 4,
    base_price: 3170,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['捷運行天宮站步行 4 分鐘', '舒適 Lounge 歇腳空間', '親子專用洗沐備品', '免費健身房', '免費 Wi-Fi']),
    keywords: '和逸, 和逸飯店, 和逸民生館, cozzi minsheng, hotel cozzi'
  },
  {
    hotel_key: 'tong_yi_hotel',
    name_zh: '同一大飯店',
    name_en: 'Tong Yi Hotel',
    city_name: '台北',
    address: '台北市中山區中山北路二段77巷18號',
    description: '典雅溫馨的復古風客房與套房，地理位置優越，周邊餐飲商圈極具生活便利性。',
    rating: 4.2,
    reviews_count: 980,
    hotel_class: 3,
    base_price: 1880,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['捷運雙連站步行 6 分鐘', '24小時親切櫃檯服務', '獨立冷氣空調', '免費 Wi-Fi', '液晶電視']),
    keywords: '同一大飯店, 同一飯店, tong yi hotel'
  },
  {
    hotel_key: 'lakeshore_yilan',
    name_zh: '煙波大飯店・宜蘭館',
    name_en: 'Lakeshore Hotel Yilan',
    city_name: '宜蘭',
    address: '宜蘭縣宜蘭市凱旋路135號',
    description: '以奇幻粉紅泡泡為主題的特色親子美學飯店，設有螢光派對、暗黑派對與網美拍照區。',
    rating: 4.8,
    reviews_count: 6200,
    hotel_class: 4,
    base_price: 3200,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['粉紅泡泡主題拍照區', '夜間專屬螢光派對', '免費停車場', '自助百匯早餐', '親子專用遊戲空間']),
    keywords: '煙波, 煙波大飯店, 煙波宜蘭館, lakeshore yilan, 宜蘭煙波'
  },
  {
    hotel_key: 'tian_ye_yilan',
    name_zh: '田野居宜蘭民宿',
    name_en: 'Tian Ye Ju B&B Yilan',
    city_name: '宜蘭',
    address: '宜蘭縣五結鄉大吉東路32號',
    description: '座落於綠意盎然的稻田中央，設有景觀露臺與沉靜水田風光，體驗鄉野慢活體驗。',
    rating: 4.8,
    reviews_count: 420,
    hotel_class: 3,
    base_price: 2400,
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['田園水岸風光', '獨立觀景露臺', '手作鄉村早餐', '免費專屬停車位', '免費 Wi-Fi']),
    keywords: '田野居, 田野居宜蘭民宿, 田野居民宿, tian ye ju'
  },
  {
    hotel_key: 'monterey_okinawa',
    name_zh: '沖繩蒙特利水療度假飯店',
    name_en: 'Hotel Monterey Okinawa',
    city_name: '沖繩',
    address: '沖繩縣國頭郡恩納村字冨着1550番地',
    description: '直通虎灘 (Tiger Beach) 絕美海景，全客房均為無敵海景房，附設造浪池與水療溫泉。',
    rating: 4.8,
    reviews_count: 4800,
    hotel_class: 5,
    base_price: 5200,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['直通虎灘海灘', '無敵全海景客房', '人造衝浪池與滑水道', '天然溫泉水療 SPA', '兒童水上樂園']),
    keywords: '沖繩蒙特利, 蒙特利, monterey okinawa, 恩納村蒙特利'
  }
];

// Seed Database
const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO hotels 
  (hotel_key, name_zh, name_en, city_name, address, description, rating, reviews_count, hotel_class, base_price, image_url, amenities, keywords)
  VALUES (@hotel_key, @name_zh, @name_en, @city_name, @address, @description, @rating, @reviews_count, @hotel_class, @base_price, @image_url, @amenities, @keywords)
`);

const transaction = db.transaction((hotels) => {
  for (const h of hotels) {
    insertStmt.run(h);
  }
});
transaction(MASTER_HOTELS_SEED);

/**
 * SQLite Precision Search Service
 */
export function queryHotelsFromSQLite(searchTerm = '', cityName = '') {
  const term = searchTerm.trim().toLowerCase();
  
  if (!term) {
    const stmt = db.prepare('SELECT * FROM hotels LIMIT 20');
    return stmt.all();
  }

  // 1. First try exact alias & keyword matching in SQLite
  const kwStmt = db.prepare(`
    SELECT * FROM hotels 
    WHERE LOWER(keywords) LIKE ? 
       OR LOWER(name_zh) LIKE ? 
       OR LOWER(name_en) LIKE ?
  `);
  
  const pattern = `%${term}%`;
  const cleanTerm = term.replace(/飯店|酒店|hotel|resort|b&b|民宿|會館|館|旅店|旅館/gi, '').trim();
  const cleanPattern = `%${cleanTerm}%`;

  let results = kwStmt.all(pattern, pattern, pattern);

  if (results.length === 0 && cleanTerm.length >= 2) {
    results = kwStmt.all(cleanPattern, cleanPattern, cleanPattern);
  }

  // 2. If no hotel match, search by city_name
  if (results.length === 0) {
    const cityStmt = db.prepare('SELECT * FROM hotels WHERE city_name LIKE ?');
    results = cityStmt.all(`%${term}%`);
  }

  return results;
}

export default db;
