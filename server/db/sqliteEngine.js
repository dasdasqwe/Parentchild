import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.resolve(process.cwd(), 'server', 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Unified SQLite database file for all StayPulse modules
const dbPath = path.join(dbDir, 'staypulse_hotels.db');
const db = new Database(dbPath);

// Enable WAL mode for high performance concurrent read/write
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

/**
 * Initialize Tables & Indexes for All StayPulse Modules:
 * 1. hotels (飯店與住宿)
 * 2. tour_packages (套裝行程)
 * 3. family_attractions (親子景點)
 * 4. family_shows_galleries (親子表演藝廊)
 */
db.exec(`
  -- 1. Hotels & Stays Master Table
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

  -- 2. Tour Packages Table (套裝行程)
  CREATE TABLE IF NOT EXISTS tour_packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    city_name TEXT NOT NULL,
    duration TEXT DEFAULT '2天1夜',
    price INTEGER DEFAULT 4990,
    rating REAL DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 850,
    image_url TEXT,
    highlights TEXT,
    keywords TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_packages_city ON tour_packages(city_name);

  -- 3. Family Attractions Table (親子景點)
  CREATE TABLE IF NOT EXISTS family_attractions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attraction_key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    city_name TEXT NOT NULL,
    address TEXT NOT NULL,
    category TEXT DEFAULT '室內樂園',
    ticket_price INTEGER DEFAULT 350,
    rating REAL DEFAULT 4.8,
    reviews_count INTEGER DEFAULT 1500,
    image_url TEXT,
    features TEXT,
    keywords TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_attractions_city ON family_attractions(city_name);

  -- 4. Family Shows & Galleries Table (親子表演藝廊)
  CREATE TABLE IF NOT EXISTS family_shows_galleries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    show_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    venue TEXT NOT NULL,
    city_name TEXT NOT NULL,
    ticket_price INTEGER DEFAULT 600,
    rating REAL DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 620,
    image_url TEXT,
    event_date TEXT,
    highlights TEXT,
    keywords TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_shows_city ON family_shows_galleries(city_name);
`);

// Seed Hotels Master Seed
const HOTELS_SEED = [
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
    amenities: JSON.stringify(['粉紅泡泡主題拍照區', '夜間專屬螢光派對', '免費專屬停車場', '自助百匯早餐', '親子專用遊戲空間']),
    keywords: '煙波, 煙波大飯店, 煙波宜蘭館, lakeshore yilan, 宜蘭煙波'
  },
  {
    hotel_key: 'silks_place_yilan',
    name_zh: '蘭城晶英酒店',
    name_en: 'Silks Place Yilan',
    city_name: '宜蘭',
    address: '宜蘭縣宜蘭市民權路二段36號',
    description: '全台最強頂級親子渡假飯店！獨家芬朵奇堡兒童賽車跑道、新月豪華影城吃到飽與櫻桃烤鴨百匯。',
    rating: 4.9,
    reviews_count: 9800,
    hotel_class: 5,
    base_price: 6500,
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    amenities: JSON.stringify(['芬朵奇堡兒童賽車跑道', '櫻桃霸王鴨一鴨五吃', '童窩藝境閱覽空間', '新月豪華影城免費看', '露天溫水泳池']),
    keywords: '蘭城晶英, 蘭城晶英酒店, 宜蘭晶英, silks place yilan'
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

// Seed Tour Packages Seed (套裝行程模組)
const PACKAGES_SEED = [
  {
    package_key: 'yilan_family_2d',
    title: '【宜蘭親子好食光】蘭城晶英二日奢華一泊二食＋櫻桃鴨饗宴',
    city_name: '宜蘭',
    duration: '2天1夜',
    price: 8800,
    rating: 4.9,
    reviews_count: 650,
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    highlights: JSON.stringify(['芬朵奇堡跑車暢玩', '頂級櫻桃烤鴨美饌', '新月影城免費觀影', '免費飯店接駁']),
    keywords: '宜蘭套裝, 蘭城晶英套裝, 親子二日遊'
  },
  {
    package_key: 'taipei_museum_tour',
    title: '【台北親子探險】市立天文館＋兒童新樂園一日FUN走透',
    city_name: '台北',
    duration: '1天全日',
    price: 1290,
    rating: 4.8,
    reviews_count: 1200,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    highlights: JSON.stringify(['兒童新樂園一日手環', '天文館 3D 宇宙劇場票', '專車接送', '星光野餐點心盒']),
    keywords: '台北套裝, 兒童新樂園, 天文館一日遊'
  }
];

// Seed Family Attractions Seed (親子景點模組)
const ATTRACTIONS_SEED = [
  {
    attraction_key: 'children_amusement_park',
    name: '台北市立兒童新樂園',
    city_name: '台北',
    address: '台北市士林區承德路五段55號',
    category: '戶外遊樂園',
    ticket_price: 200,
    rating: 4.8,
    reviews_count: 12500,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    features: JSON.stringify(['水果摩天輪', '銀河號單軌列車', '兒童海盜船', '室內球池樂園']),
    keywords: '兒童新樂園, 士林兒童樂園, 台北親子景點'
  },
  {
    attraction_key: 'zhang_mei_ama_farm',
    name: '張美阿嬤農場',
    city_name: '宜蘭',
    address: '宜蘭縣三星鄉行健溪一路二段161號',
    category: '萌寵體驗農場',
    ticket_price: 200,
    rating: 4.9,
    reviews_count: 18900,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    features: JSON.stringify(['水豚君餵食體驗', '笑笑羊與水豚互動', '日式庭園和服體驗', '手作草餅 DIY']),
    keywords: '張美阿嬤, 張美阿嬤農場, 水豚君, 宜蘭親子景點'
  }
];

// Seed Family Shows Seed (親子表演藝廊模組)
const SHOWS_SEED = [
  {
    show_key: 'paper_windmill_theater',
    name: '紙風車劇團《368鄉鎮市區兒童藝術工程》公演',
    title: '紙風車劇團《368鄉鎮市區兒童藝術工程》公演',
    venue: '台北市藝文推廣處城市舞台',
    city_name: '台北',
    ticket_price: 450,
    rating: 4.9,
    reviews_count: 890,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    event_date: '2026-09-15',
    highlights: JSON.stringify(['互動式兒童舞台劇', '大型偶戲造型演出', '寓教於樂親子劇展']),
    keywords: '紙風車, 紙風車劇團, 兒童舞台劇, 藝文表演'
  }
];

// Execute Transactions to seed all tables
const insertHotel = db.prepare(`
  INSERT OR REPLACE INTO hotels (hotel_key, name_zh, name_en, city_name, address, description, rating, reviews_count, hotel_class, base_price, image_url, amenities, keywords)
  VALUES (@hotel_key, @name_zh, @name_en, @city_name, @address, @description, @rating, @reviews_count, @hotel_class, @base_price, @image_url, @amenities, @keywords)
`);

const insertPkg = db.prepare(`
  INSERT OR REPLACE INTO tour_packages (package_key, title, city_name, duration, price, rating, reviews_count, image_url, highlights, keywords)
  VALUES (@package_key, @title, @city_name, @duration, @price, @rating, @reviews_count, @image_url, @highlights, @keywords)
`);

const insertAttr = db.prepare(`
  INSERT OR REPLACE INTO family_attractions (attraction_key, name, city_name, address, category, ticket_price, rating, reviews_count, image_url, features, keywords)
  VALUES (@attraction_key, @name, @city_name, @address, @category, @ticket_price, @rating, @reviews_count, @image_url, @features, @keywords)
`);

const insertShow = db.prepare(`
  INSERT OR REPLACE INTO family_shows_galleries (show_key, title, venue, city_name, ticket_price, rating, reviews_count, image_url, event_date, highlights, keywords)
  VALUES (@show_key, @title, @venue, @city_name, @ticket_price, @rating, @reviews_count, @image_url, @event_date, @highlights, @keywords)
`);

db.transaction(() => {
  for (const h of HOTELS_SEED) insertHotel.run(h);
  for (const p of PACKAGES_SEED) insertPkg.run(p);
  for (const a of ATTRACTIONS_SEED) insertAttr.run(a);
  for (const s of SHOWS_SEED) insertShow.run(s);
})();

/**
 * SQLite High-Performance Query APIs for All Modules
 */

// 1. Hotels Query Engine
export function queryHotelsFromSQLite(searchTerm = '', cityName = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) {
    return db.prepare('SELECT * FROM hotels LIMIT 24').all();
  }

  const pattern = `%${term}%`;
  const cleanTerm = term.replace(/飯店|酒店|hotel|resort|b&b|民宿|會館|館|旅店|旅館/gi, '').trim();
  const cleanPattern = `%${cleanTerm}%`;

  const stmt = db.prepare(`
    SELECT * FROM hotels 
    WHERE LOWER(keywords) LIKE ? 
       OR LOWER(name_zh) LIKE ? 
       OR LOWER(name_en) LIKE ?
       OR LOWER(city_name) LIKE ?
  `);

  let results = stmt.all(pattern, pattern, pattern, pattern);

  if (results.length === 0 && cleanTerm.length >= 2) {
    results = stmt.all(cleanPattern, cleanPattern, cleanPattern, cleanPattern);
  }

  return results;
}

// 2. Tour Packages Query Engine (套裝行程)
export function queryPackagesFromSQLite(searchTerm = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return db.prepare('SELECT * FROM tour_packages LIMIT 20').all();
  const pattern = `%${term}%`;
  return db.prepare('SELECT * FROM tour_packages WHERE LOWER(title) LIKE ? OR LOWER(city_name) LIKE ? OR LOWER(keywords) LIKE ?').all(pattern, pattern, pattern);
}

// 3. Family Attractions Query Engine (親子景點)
export function queryAttractionsFromSQLite(searchTerm = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return db.prepare('SELECT * FROM family_attractions LIMIT 20').all();
  const pattern = `%${term}%`;
  return db.prepare('SELECT * FROM family_attractions WHERE LOWER(name) LIKE ? OR LOWER(city_name) LIKE ? OR LOWER(keywords) LIKE ?').all(pattern, pattern, pattern);
}

// 4. Family Shows Query Engine (親子表演藝廊)
export function queryShowsFromSQLite(searchTerm = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return db.prepare('SELECT * FROM family_shows_galleries LIMIT 20').all();
  const pattern = `%${term}%`;
  return db.prepare('SELECT * FROM family_shows_galleries WHERE LOWER(title) LIKE ? OR LOWER(city_name) LIKE ? OR LOWER(keywords) LIKE ?').all(pattern, pattern, pattern);
}

export default db;
