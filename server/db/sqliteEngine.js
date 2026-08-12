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
 * 5. city_districts (全台22縣市與國際行政區商圈對照表)
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

  -- 5. City Districts Table (全台與國際行政區商圈主表)
  CREATE TABLE IF NOT EXISTS city_districts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_name TEXT NOT NULL,
    district_name TEXT NOT NULL,
    keywords TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_districts_city ON city_districts(city_name);

  -- 6. Cities Table (熱門城市與別名表)
  CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    aliases TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(name);

  -- 7. Persistent API Cache Table (API 快取表)
  CREATE TABLE IF NOT EXISTS api_cache (
    cache_key TEXT PRIMARY KEY,
    response_json TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  );

  -- 8. Server-side User Saved Stays Table (我的最愛收藏表)
  CREATE TABLE IF NOT EXISTS saved_stays (
    id TEXT PRIMARY KEY,
    stay_data TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
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

// Seed City Districts Seed (全台22縣市與國際熱門商圈)
const DISTRICTS_SEED = [
  { city_name: '台北', district_name: '中山區 (捷運中山站周邊)', keywords: '中山' },
  { city_name: '台北', district_name: '信義區 (市府101商圈)', keywords: '信義, 101' },
  { city_name: '台北', district_name: '萬華區 (西門町觀光商圈)', keywords: '萬華, 西門町' },
  { city_name: '台北', district_name: '大安區 (東區忠孝商圈)', keywords: '大安, 東區' },
  { city_name: '台北', district_name: '中正區 (台北車站特區)', keywords: '中正, 台北車站' },
  { city_name: '台北', district_name: '士林區 (士林天母商圈)', keywords: '士林, 天母' },
  { city_name: '新北', district_name: '板橋區 (新北車站/歡樂耶誕城)', keywords: '板橋' },
  { city_name: '新北', district_name: '淡水區 (淡水老街/漁人碼頭)', keywords: '淡水' },
  { city_name: '新北', district_name: '瑞芳區 (九份老街/金瓜石)', keywords: '九份, 瑞芳' },
  { city_name: '宜蘭', district_name: '礁溪鄉 (溫泉觀光特區)', keywords: '礁溪, 溫泉' },
  { city_name: '宜蘭', district_name: '宜蘭市 (幾米公園/縣政特區)', keywords: '宜蘭市' },
  { city_name: '宜蘭', district_name: '羅東鎮 (夜市觀光商圈)', keywords: '羅東' },
  { city_name: '宜蘭', district_name: '五結鄉 (冬山河親水特區)', keywords: '五結, 冬山河' },
  { city_name: '台中', district_name: '西屯區 (逢甲夜市/七期重劃區)', keywords: '西屯, 逢甲' },
  { city_name: '台中', district_name: '中區 (台中火車站周邊)', keywords: '中區, 火車站' },
  { city_name: '台中', district_name: '西區 (勤美草悟道商圈)', keywords: '草悟道, 勤美' },
  { city_name: '高雄', district_name: '前鎮區 (三多商圈)', keywords: '三多' },
  { city_name: '高雄', district_name: '新興區 (六合夜市/美麗島)', keywords: '六合, 美麗島' },
  { city_name: '高雄', district_name: '鹽埕區 (駁二藝術特區)', keywords: '駁二, 鹽埕' },
  { city_name: '台南', district_name: '中西區 (國華街古蹟美食區)', keywords: '國華街, 中西區' },
  { city_name: '台南', district_name: '安平區 (安平古堡老街區)', keywords: '安平' },
  { city_name: '花蓮', district_name: '花蓮市 (東大門夜市/七星潭)', keywords: '花蓮市, 東大門' },
  { city_name: '花蓮', district_name: '秀林鄉 (太魯閣國家公園)', keywords: '太魯閣' },
  { city_name: '台東', district_name: '台東市 (鐵花村/森林公園)', keywords: '鐵花村' },
  { city_name: '台東', district_name: '鹿野鄉 (高台熱氣球特區)', keywords: '鹿野, 熱氣球' },
  { city_name: '屏東', district_name: '恆春鎮 (墾丁大街商圈)', keywords: '墾丁' },
  { city_name: '沖繩', district_name: '那霸市 (國際通觀光商圈)', keywords: '那霸, 國際通' },
  { city_name: '沖繩', district_name: '恩納村 (虎灘海景度假區)', keywords: '恩納村' },
  { city_name: '東京', district_name: '新宿區 (歌舞伎町/車站商圈)', keywords: '新宿' },
  { city_name: '東京', district_name: '澀谷區 (原宿/竹下通商圈)', keywords: '澀谷, 原宿' }
];

// Seed Cities Table
const CITIES_SEED = [
  { city_id: 'taipei', name: '台北 (Taipei)', country: '台灣', aliases: '台北, taipei, 臺北, 信義區, 中山區' },
  { city_id: 'yilan', name: '宜蘭 (Yilan)', country: '台灣', aliases: '宜蘭, yilan, 礁溪, 羅東, 頭城' },
  { city_id: 'taichung', name: '台中 (Taichung)', country: '台灣', aliases: '台中, taichung, 臺中, 逢甲, 西屯' },
  { city_id: 'kaohsiung', name: '高雄 (Kaohsiung)', country: '台灣', aliases: '高雄, kaohsiung, 左營, 鹽埕' },
  { city_id: 'tainan', name: '台南 (Tainan)', country: '台灣', aliases: '台南, tainan, 安平, 赤崁樓' },
  { city_id: 'taoyuan', name: '桃園 (Taoyuan)', country: '台灣', aliases: '桃園, taoyuan, 中壢, 青埔' },
  { city_id: 'hsinchu', name: '新竹 (Hsinchu)', country: '台灣', aliases: '新竹, hsinchu, 竹北, 關西' },
  { city_id: 'hualien', name: '花蓮 (Hualien)', country: '台灣', aliases: '花蓮, hualien, 壽豐, 太魯閣' },
  { city_id: 'taitung', name: '台東 (Taitung)', country: '台灣', aliases: '台東, taitung, 知本, 池上' },
  { city_id: 'pingtung', name: '屏東 (Pingtung)', country: '台灣', aliases: '屏東, pingtung, 恆春, 墾丁' },
  { city_id: 'okinawa', name: '沖繩 (Okinawa)', country: '日本', aliases: '沖繩, okinawa, 那霸, 美國村' },
  { city_id: 'tokyo', name: '東京 (Tokyo)', country: '日本', aliases: '東京, tokyo, 新宿, 銀座, 淺草' },
  { city_id: 'osaka', name: '大阪 (Osaka)', country: '日本', aliases: '大阪, osaka, 難波, 心齋橋' },
  { city_id: 'seoul', name: '首爾 (Seoul)', country: '韓國', aliases: '首爾, seoul, 明洞, 弘大' },
  { city_id: 'bangkok', name: '曼谷 (Bangkok)', country: '泰國', aliases: '曼谷, bangkok, 暹羅, 素坤逸' }
];

// Seed Tour Packages Table
const PACKAGES_SEED = [
  {
    package_key: 'yilan_family_2d1n',
    title: '宜蘭蘭城晶英＋芬朵奇堡賽車 2天1夜尊榮親子遊',
    city_name: '宜蘭',
    duration: '2天1夜',
    price: 6990,
    rating: 4.9,
    reviews_count: 1250,
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    highlights: '含蘭城晶英飯店住宿、櫻桃霸王鴨美饌饗宴與專屬賽車體驗。',
    keywords: '宜蘭, 蘭城晶英, 親子, 賽車, 2天1夜'
  },
  {
    package_key: 'taipei_skyline_2d1n',
    title: '台北 W 飯店高空泳池＋信義商圈購物 2天1夜奢華假期',
    city_name: '台北',
    duration: '2天1夜',
    price: 7800,
    rating: 4.8,
    reviews_count: 980,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    highlights: '含 WET Bar 飲品招待與高空景色，捷運市府站步行連通。',
    keywords: '台北, W Hotel, 信義區, 奢華, 高空泳池'
  },
  {
    package_key: 'taichung_fengjia_2d1n',
    title: '台中草悟道文青輕旅行＋逢甲美食探索 2天1夜',
    city_name: '台中',
    duration: '2天1夜',
    price: 3980,
    rating: 4.7,
    reviews_count: 860,
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    highlights: '含精選設計旅店住宿、夜市美食優惠券與免費接駁。',
    keywords: '台中, 逢甲, 草悟道, 夜市, 2天1夜'
  },
  {
    package_key: 'kaohsiung_pier2_2d1n',
    title: '高雄駁二特區藝術巡禮＋海洋音樂館 2天1夜灣區之旅',
    city_name: '高雄',
    duration: '2天1夜',
    price: 4200,
    rating: 4.8,
    reviews_count: 670,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    highlights: '輕軌周遊券、海景客房住宿與駁二展覽門票。',
    keywords: '高雄, 駁二, 海洋音樂中心, 輕軌, 渡假'
  },
  {
    package_key: 'okinawa_beach_3d2n',
    title: '沖繩恩納村無敵海景＋水療渡假村 3天2夜海島自駕',
    city_name: '沖繩',
    duration: '3天2夜',
    price: 12800,
    rating: 4.9,
    reviews_count: 2100,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    highlights: '全海景豪華客房、機場租車自駕方案與溫泉水療體驗。',
    keywords: '沖繩, 蒙特利, 自駕, 海景房, 水療'
  }
];

// Seed Family Attractions Table
const ATTRACTIONS_SEED = [
  {
    attraction_key: 'tom_bear_taipei',
    name: '湯姆熊歡樂世界 (台北信義旗艦店)',
    city_name: '台北',
    address: '台北市信義區松高路12號B1',
    category: '室內遊樂園',
    ticket_price: 300,
    rating: 4.8,
    reviews_count: 2400,
    image_url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
    features: '大型VR體驗, 親子賽車機台, 兌獎贈品中心',
    keywords: '台北, 湯姆熊, 信義區, 室內樂園, 賽車'
  },
  {
    attraction_key: 'bambino_yilan',
    name: '斑比山丘 Bambi Land',
    city_name: '宜蘭',
    address: '宜蘭縣冬山鄉下湖路285號',
    category: '戶外農場',
    ticket_price: 200,
    rating: 4.9,
    reviews_count: 5800,
    image_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    features: '梅花鹿互動喂食, 美美子美式甜點, 大片綠地森林',
    keywords: '宜蘭, 斑比山丘, 梅花鹿, 冬山, 親子農場'
  },
  {
    attraction_key: 'taichung_science_museum',
    name: '國立自然科學博物館',
    city_name: '台中',
    address: '台中市北區館前路1號',
    category: '科普教育館',
    ticket_price: 100,
    rating: 4.9,
    reviews_count: 12000,
    image_url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80',
    features: '逼真恐龍展廳, 太空劇場, 植物園水族館',
    keywords: '台中, 科博館, 恐龍, 自然科學, 教育'
  },
  {
    attraction_key: 'kaohsiung_aquarium',
    name: '高雄國立海洋生物博物館',
    city_name: '高雄',
    address: '屏東縣車城鄉後灣路2號',
    category: '海洋水族館',
    ticket_price: 450,
    rating: 4.9,
    reviews_count: 15400,
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    features: '海底隧道, 白鯨表演, 夜宿水族館體驗',
    keywords: '高雄, 屏東, 海生館, 水族館, 白鯨'
  }
];

// Seed Family Shows Table
const SHOWS_SEED = [
  {
    show_key: 'paper_windmill_taipei',
    title: '紙風車劇團《368鄉鎮親子幻想曲》',
    venue: '台北市國家戲劇院',
    city_name: '台北',
    ticket_price: 500,
    rating: 4.9,
    reviews_count: 850,
    image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    event_date: '2026-09-15 ~ 2026-10-10',
    highlights: '專為兒童設計的互動式舞台劇，結合巨大偶戲與魔法特效。',
    keywords: '台北, 紙風車, 兒童劇, 國家戲劇院, 舞台劇'
  },
  {
    show_key: 'yilan_art_festival',
    title: '宜蘭傳藝中心《孫悟空大鬧天宮》布袋戲',
    venue: '國立傳統藝術中心廟埕廣場',
    city_name: '宜蘭',
    ticket_price: 150,
    rating: 4.8,
    reviews_count: 620,
    image_url: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80',
    event_date: '每週六日 14:00/16:00',
    highlights: '傳統技藝掌中戲實境演出，搭配兒童DIY體驗手作偶。',
    keywords: '宜蘭, 傳藝中心, 布袋戲, 孫悟空, 傳統藝術'
  }
];

// Execute Transactions to seed all tables
const insertHotel = db.prepare(`
  INSERT OR REPLACE INTO hotels (hotel_key, name_zh, name_en, city_name, address, description, rating, reviews_count, hotel_class, base_price, image_url, amenities, keywords)
  VALUES (@hotel_key, @name_zh, @name_en, @city_name, @address, @description, @rating, @reviews_count, @hotel_class, @base_price, @image_url, @amenities, @keywords)
`);

const insertDistrict = db.prepare(`
  INSERT OR REPLACE INTO city_districts (city_name, district_name, keywords)
  VALUES (@city_name, @district_name, @keywords)
`);

const insertCity = db.prepare(`
  INSERT OR REPLACE INTO cities (city_id, name, country, aliases)
  VALUES (@city_id, @name, @country, @aliases)
`);

const insertPackage = db.prepare(`
  INSERT OR REPLACE INTO tour_packages (package_key, title, city_name, duration, price, rating, reviews_count, image_url, highlights, keywords)
  VALUES (@package_key, @title, @city_name, @duration, @price, @rating, @reviews_count, @image_url, @highlights, @keywords)
`);

const insertAttraction = db.prepare(`
  INSERT OR REPLACE INTO family_attractions (attraction_key, name, city_name, address, category, ticket_price, rating, reviews_count, image_url, features, keywords)
  VALUES (@attraction_key, @name, @city_name, @address, @category, @ticket_price, @rating, @reviews_count, @image_url, @features, @keywords)
`);

const insertShow = db.prepare(`
  INSERT OR REPLACE INTO family_shows_galleries (show_key, title, venue, city_name, ticket_price, rating, reviews_count, image_url, event_date, highlights, keywords)
  VALUES (@show_key, @title, @venue, @city_name, @ticket_price, @rating, @reviews_count, @image_url, @event_date, @highlights, @keywords)
`);

db.transaction(() => {
  for (const h of HOTELS_SEED) insertHotel.run(h);
  for (const d of DISTRICTS_SEED) insertDistrict.run(d);
  for (const c of CITIES_SEED) insertCity.run(c);
  for (const p of PACKAGES_SEED) insertPackage.run(p);
  for (const a of ATTRACTIONS_SEED) insertAttraction.run(a);
  for (const s of SHOWS_SEED) insertShow.run(s);
})();

// Pre-compiled Prepared Statements for Max Performance
const statements = {
  hotelsAll: db.prepare('SELECT * FROM hotels LIMIT 24'),
  hotelsSearch: db.prepare(`
    SELECT * FROM hotels 
    WHERE LOWER(keywords) LIKE ? 
       OR LOWER(name_zh) LIKE ? 
       OR LOWER(name_en) LIKE ?
       OR LOWER(city_name) LIKE ?
  `),
  packagesAll: db.prepare('SELECT * FROM tour_packages LIMIT 20'),
  packagesSearch: db.prepare('SELECT * FROM tour_packages WHERE LOWER(title) LIKE ? OR LOWER(city_name) LIKE ? OR LOWER(keywords) LIKE ?'),
  attractionsAll: db.prepare('SELECT * FROM family_attractions LIMIT 20'),
  attractionsSearch: db.prepare('SELECT * FROM family_attractions WHERE LOWER(name) LIKE ? OR LOWER(city_name) LIKE ? OR LOWER(keywords) LIKE ?'),
  showsAll: db.prepare('SELECT * FROM family_shows_galleries LIMIT 20'),
  showsSearch: db.prepare('SELECT * FROM family_shows_galleries WHERE LOWER(title) LIKE ? OR LOWER(city_name) LIKE ? OR LOWER(keywords) LIKE ?'),
  citiesAll: db.prepare('SELECT * FROM cities'),
  citiesSearch: db.prepare('SELECT * FROM cities WHERE LOWER(name) LIKE ? OR LOWER(aliases) LIKE ? OR LOWER(country) LIKE ?'),
  cacheGet: db.prepare('SELECT response_json, expires_at FROM api_cache WHERE cache_key = ?'),
  cacheSet: db.prepare('INSERT OR REPLACE INTO api_cache (cache_key, response_json, created_at, expires_at) VALUES (?, ?, ?, ?)'),
  cacheClean: db.prepare('DELETE FROM api_cache WHERE expires_at <= ?'),
  savedGet: db.prepare('SELECT stay_data FROM saved_stays ORDER BY created_at DESC'),
  savedAdd: db.prepare('INSERT OR REPLACE INTO saved_stays (id, stay_data, created_at) VALUES (?, ?, ?)'),
  savedRemove: db.prepare('DELETE FROM saved_stays WHERE id = ?'),
  savedClear: db.prepare('DELETE FROM saved_stays')
};

// Automatic cache purging on startup
export function cleanExpiredCache() {
  try {
    const info = statements.cacheClean.run(Date.now());
    if (info.changes > 0) {
      console.log(`[SQLITE-CLEANUP] Cleaned ${info.changes} expired API cache entries`);
    }
  } catch (err) {
    console.error('SQLite Cache Cleanup Error:', err);
  }
}
cleanExpiredCache();

/**
 * High-Performance SQLite District Query Engine
 */
export function queryDistrictFromSQLite(cityName = '台北', idx = 0, nameStr = '') {
  const cleanCity = cityName.replace(/飯店|酒店|hotel|resort|b&b|民宿|會館|館|旅店|旅館/gi, '').trim();
  const searchCity = (cleanCity.length >= 2) ? cleanCity : '台北';

  if (nameStr) {
    const kwStmt = db.prepare('SELECT district_name FROM city_districts WHERE city_name LIKE ? AND keywords LIKE ?');
    const kwRow = kwStmt.get(`%${searchCity}%`, `%${nameStr.slice(0, 2)}%`);
    if (kwRow) return `${searchCity} ${kwRow.district_name}`;
  }

  const stmt = db.prepare('SELECT district_name FROM city_districts WHERE city_name LIKE ?');
  const rows = stmt.all(`%${searchCity}%`);

  if (rows && rows.length > 0) {
    return `${searchCity} ${rows[idx % rows.length].district_name}`;
  }

  return `${searchCity} 市中心觀光特區`;
}

// 1. Hotels Query Engine
export function queryHotelsFromSQLite(searchTerm = '', cityName = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) {
    return statements.hotelsAll.all();
  }

  const pattern = `%${term}%`;
  const cleanTerm = term.replace(/飯店|酒店|hotel|resort|b&b|民宿|會館|館|旅店|旅館/gi, '').trim();
  const cleanPattern = `%${cleanTerm}%`;

  let results = statements.hotelsSearch.all(pattern, pattern, pattern, pattern);

  if (results.length === 0 && cleanTerm.length >= 2) {
    results = statements.hotelsSearch.all(cleanPattern, cleanPattern, cleanPattern, cleanPattern);
  }

  return results;
}

// 2. Tour Packages Query Engine (套裝行程)
export function queryPackagesFromSQLite(searchTerm = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return statements.packagesAll.all();
  const pattern = `%${term}%`;
  return statements.packagesSearch.all(pattern, pattern, pattern);
}

// 3. Family Attractions Query Engine (親子景點)
export function queryAttractionsFromSQLite(searchTerm = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return statements.attractionsAll.all();
  const pattern = `%${term}%`;
  return statements.attractionsSearch.all(pattern, pattern, pattern);
}

// 4. Family Shows Query Engine (親子表演藝廊)
export function queryShowsFromSQLite(searchTerm = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return statements.showsAll.all();
  const pattern = `%${term}%`;
  return statements.showsSearch.all(pattern, pattern, pattern);
}

// 5. Cities Query Engine (熱門城市與別名表)
export function queryCitiesFromSQLite(searchTerm = '') {
  const term = searchTerm.trim().toLowerCase();
  if (!term) {
    return statements.citiesAll.all();
  }
  const pattern = `%${term}%`;
  return statements.citiesSearch.all(pattern, pattern, pattern);
}

// 6. Persistent API Cache Engine (SQLite API 持久化快取)
export function getCachedApiFromSQLite(cacheKey) {
  try {
    const row = statements.cacheGet.get(cacheKey);
    if (row && row.expires_at > Date.now()) {
      console.log(`[SQLITE-CACHE-HIT] Loaded cached API response from SQLite for key: "${cacheKey}"`);
      return JSON.parse(row.response_json);
    }
  } catch (err) {
    console.error('SQLite Cache Get Error:', err);
  }
  return null;
}

export function setCachedApiToSQLite(cacheKey, data, ttlMs = 15 * 60 * 1000) {
  try {
    const now = Date.now();
    statements.cacheSet.run(cacheKey, JSON.stringify(data), now, now + ttlMs);
  } catch (err) {
    console.error('SQLite Cache Set Error:', err);
  }
}

// 7. Server-side User Saved Stays CRUD Engine (最愛收藏表)
export function getSavedStaysFromSQLite() {
  try {
    const rows = statements.savedGet.all();
    return rows.map(r => JSON.parse(r.stay_data));
  } catch (err) {
    console.error('SQLite Saved Stays Get Error:', err);
    return [];
  }
}

export function addSavedStayToSQLite(item) {
  try {
    if (!item || !item.id) return false;
    statements.savedAdd.run(String(item.id), JSON.stringify(item), Date.now());
    return true;
  } catch (err) {
    console.error('SQLite Add Saved Stay Error:', err);
    return false;
  }
}

export function removeSavedStayFromSQLite(id) {
  try {
    if (!id) return false;
    statements.savedRemove.run(String(id));
    return true;
  } catch (err) {
    console.error('SQLite Remove Saved Stay Error:', err);
    return false;
  }
}

export function clearSavedStaysFromSQLite() {
  try {
    statements.savedClear.run();
    return true;
  } catch (err) {
    console.error('SQLite Clear Saved Stays Error:', err);
    return false;
  }
}

export default db;

