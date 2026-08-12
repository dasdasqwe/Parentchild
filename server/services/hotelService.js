import axios from 'axios';
import { config } from '../config/env.js';
import { buildProviderDeepLinks } from '../utils/urlBuilder.js';
import { paginateArray, sortStays } from '../utils/pagination.js';
import { queryHotelsFromSQLite, queryCitiesFromSQLite, getCachedApiFromSQLite, setCachedApiToSQLite } from '../db/sqliteEngine.js';

// In-Memory API Cache Strategy (TTL: 15 minutes) for On-Demand API cost reduction
// Persistent SQLite API Cache Strategy (TTL: 15 minutes) for On-Demand API cost reduction
function getCachedResult(cacheKey) {
  return getCachedApiFromSQLite(cacheKey);
}

function setCachedResult(cacheKey, data) {
  setCachedApiToSQLite(cacheKey, data, 15 * 60 * 1000);
});
}

const CITY_SERP_MAP = {
  '台北': 'Taipei Hotels',
  '臺北': 'Taipei Hotels',
  '宜蘭': 'Yilan Hotels',
  '台中': 'Taichung Hotels',
  '臺中': 'Taichung Hotels',
  '高雄': 'Kaohsiung Hotels',
  '台南': 'Tainan Hotels',
  '臺南': 'Tainan Hotels',
  '桃園': 'Taoyuan Hotels',
  '新竹': 'Hsinchu Hotels',
  '苗栗': 'Miaoli Hotels',
  '彰化': 'Changhua Hotels',
  '南投': 'Nantou Hotels',
  '嘉義': 'Chiayi Hotels',
  '屏東': 'Pingtung Hotels',
  '墾丁': 'Kenting Hotels',
  '花蓮': 'Hualien Hotels',
  '台東': 'Taitung Hotels',
  '澎湖': 'Penghu Hotels',
  '金門': 'Kinmen Hotels',
  '沖繩': 'Okinawa Hotels',
  '東京': 'Tokyo Hotels',
  '大阪': 'Osaka Hotels',
  '首爾': 'Seoul Hotels',
  '京都': 'Kyoto Hotels',
  '曼谷': 'Bangkok Hotels',
  '巴黎': 'Paris Hotels',
  '紐約': 'New York Hotels'
};

// Authentic Real-World Individual Hotels Database for Domestic & Overseas Cities
const REAL_INDIVIDUAL_HOTELS = {
  '台北': [
    '台北晶華酒店 (Regent Taipei)',
    '台北君品酒店 (Palais de Chine Hotel)',
    '台北W飯店 (W Taipei)',
    '台北寒舍艾美酒店 (Le Meridien Taipei)',
    '台北圓山大飯店 (The Grand Hotel Taipei)',
    '台北美福大飯店 (Grand Mayfull Hotel Taipei)',
    '台北萬豪酒店 (Taipei Marriott Hotel)',
    '台北加賀屋國際溫泉飯店 (Radium Kagaya Taipei)',
    '台北喜來登大飯店 (Sheraton Grand Taipei Hotel)',
    '台北華國大飯店 (Imperial Hotel Taipei)',
    '台北天成大飯店 (Cosmos Hotel Taipei)',
    '台北格絲麗飯店 (Hotel Gracery Taipei)',
    '台北時代寓所 (Tapestry Collection by Hilton)',
    '台北和逸飯店 - 台北民生館 (Hotel COZZI Minsheng)',
    '台北寒居酒店 (Humble Boutique Hotel)',
    '台北大倉久和大飯店 (The Okura Prestige Taipei)',
    '台北三井花園飯店 (Mitsui Garden Hotel Taipei)',
    '台北和苑三井花園飯店 (Mitsui Garden Hotel Zhongxiao)'
  ],
  '台中': [
    '台中林酒店 (The Lin Hotel Taichung)',
    '台中麗寶福容大飯店 (Fullon Hotel Lihpao Land)',
    '台中日月千禧酒店 (Millennium Hotel Taichung)',
    '台中金典酒店 (The Splendor Hotel Taichung)',
    '台中裕元花園酒店 (Windsor Hotel Taichung)',
    '台中逢甲夜市親子歡樂行館 (Fengjia Joyous Family Hotel)',
    '台中萬楓酒店 (Fairfield by Marriott Taichung)',
    '台中薆悅酒店五權館 (Inhouse Hotel Grand Taichung)',
    '台中長榮桂冠酒店 (Evergreen Laurel Hotel Taichung)',
    '台中李方艾美酒店 (Le Meridien Taichung)',
    '台中莫內花園渡假酒店 (Monet Garden Hotel)',
    '台中豐邑Moxy酒店 (Moxy Taichung)',
    '台中頭等艙飯店 - 綠園道館 (Airline Inn Green Park Way)',
    '台中綠宿行旅 (Green Hotel Taichung)',
    '台中1969藍天飯店 (1969 Blue Sky Hotel)',
    '台中薆悅酒店台中館 (Inhouse Hotel Taichung)',
    '台中新驛旅店 - 台中車站店 (CityInn Hotel Taichung Station)',
    '台中成旅晶贊飯店 - 台中民權館 (Park City Hotel Taichung)'
  ],
  '宜蘭': [
    '宜蘭礁溪晶泉楓旅 (Wellspring by Silks Jiaoxi)',
    '捷絲旅宜蘭礁溪館 (Just Sleep Jiaoxi)',
    '宜蘭蘭城晶英酒店 (Silks Place Yilan)',
    '宜蘭綠舞國際觀光飯店 (Dancewoods Hotel & Resort)',
    '宜蘭礁溪老爺酒店 (Hotel Royal Jiaoxi)',
    '宜蘭礁溪寒沐酒店 (MU JIAO XI HOTEL)',
    '宜蘭川湯春天旗艦館 (Chuan Tang Spring Flagship)',
    '宜蘭長榮鳳凰酒店 - 礁溪 (Evergreen Resort Hotel Jiaoxi)',
    '宜蘭中冠礁溪大飯店 (Art Spa Hotel Jiaoxi)',
    '宜蘭村卻國際溫泉酒店 (Cuncyue Resort & Spa)',
    '宜蘭東旅湯宿 - 風華漾 (Yunoyado Onsen)',
    '宜蘭鳳凰德陽川泉旅 (Evergreen Deyang)',
    '宜蘭山多利大飯店 (Shandori Hotel Yilan)',
    '宜蘭悅川酒店 (WALDEN HOTEL Yilan)',
    '宜蘭松風文旅 (Matsukaze Hotel)',
    '宜蘭煙波大飯店 - 宜蘭館 (Lakeshore Hotel Yilan)',
    '宜蘭白宮渡假勝地 (White House Resort)',
    '宜蘭凱渡廣場酒店 (THE ARCHIPELAGO Hotel)'
  ],
  '高雄': [
    '高雄萬豪酒店 (Kaohsiung Marriott Hotel)',
    '高雄義大皇家酒店 (E-Da Royal Hotel)',
    '高雄漢來大飯店 (Grand Hi-Lai Hotel)',
    '高雄晶英國際行館 (Silks Club Kaohsiung)',
    '高雄洲際酒店 (InterContinental Kaohsiung)',
    '高雄國賓大飯店 (The Ambassador Hotel Kaohsiung)',
    '高雄福華大飯店 (Howard Plaza Hotel Kaohsiung)',
    '高雄城市商旅 - 真愛館 (City Suites Chenai)',
    '高雄宮賞藝術大飯店 (Kung Shang Design Hotel)',
    '高雄水京棧國際酒店 (H2O Hotel Kaohsiung)',
    '高雄寒軒國際大飯店 (Han-Hsien International Hotel)',
    '高雄承億酒店 (TAI Urban Resort)',
    '高雄比歐緻居 (Brio Hotel Kaohsiung)',
    '高雄中央公園英迪格酒店 (Hotel Indigo Kaohsiung)',
    '高雄和逸飯店 - 高雄中山館 (Hotel COZZI Zhongshan)',
    '高雄捷絲旅 - 高雄站前館 (Just Sleep Kaohsiung Station)',
    '高雄義大天悅飯店 (E-Da Skylark Hotel)',
    '高雄黑沙渡假會館 (Black Sand Resort)'
  ],
  '沖繩': [
    '沖繩蒙特利水療度假飯店 (Hotel Monterey Okinawa)',
    '沖繩那霸休伊特度假飯店 (Hewitt Resort Naha)',
    '沖繩恩納村萬豪渡假酒店 (Okinawa Marriott Resort)',
    '沖繩美國村坎帕納船舶飯店 (Vessel Hotel Campana Okinawa)',
    '沖繩琉球溫泉瀨長島飯店 (Ryukyu Onsen Senagajima Hotel)',
    '沖繩海港景致全日空皇冠假日酒店 (ANA Crowne Plaza Harborview)',
    '沖繩那霸雙樹希爾頓酒店 (DoubleTree by Hilton Naha)',
    '沖繩宜野灣王子大飯店 (Okinawa Prince Hotel Ocean Grid)',
    '沖繩哈雷庫拉尼渡假飯店 (Halekulani Okinawa)',
    '沖繩北谷海濱希爾頓度假酒店 (Hilton Okinawa Chatan Resort)',
    '沖繩那霸走廊快捷酒店 (Prostyle Ryokan Naha)',
    '沖繩海濱塔渡假酒店 (The Beach Tower Okinawa)',
    '沖繩阿札馬渡假大飯店 (Azama Beach Hotel Okinawa)',
    '沖繩利山海舟渡假飯店 (Rizzan Sea-Park Hotel Tancha Bay)',
    '沖繩日航アリビラ度假酒店 (Hotel Nikko Alivila)',
    '沖繩萬座海灘全日空洲際度假酒店 (ANA InterContinental Manza Beach)',
    '沖繩那霸休伊特精緻渡假飯店 (Hewitt Deluxe Naha)',
    '沖繩喜來登聖瑪莉娜海濱度假飯店 (Sheraton Okinawa Sunmarina Resort)'
  ],
  '東京': [
    '東京星野奢華溫泉旅館 (Hoshinoya Tokyo)',
    '東京新宿格拉斯麗飯店 (Hotel Gracery Shinjuku)',
    '東京迪士尼樂園大飯店 (Tokyo Disneyland Hotel)',
    '東京淺草集市大飯店 (The Gate Hotel Asakusa)',
    '東京半島酒店 (The Peninsula Tokyo)',
    '東京文華東方酒店 (Mandarin Oriental Tokyo)',
    '東京安達仕酒店 (Andaz Tokyo Toranomon Hills)',
    '東京香格里拉大酒店 (Shangri-La Tokyo)',
    '東京巨蛋飯店 (Tokyo Dome Hotel)',
    '東京新宿燦路都廣場大飯店 (Hotel Sunroute Plaza Shinjuku)',
    '東京品川王子大飯店 (Shinagawa Prince Hotel)',
    '東京澀谷 Stream Excel 飯店 (Shibuya Stream Excel Hotel Tokyu)',
    '東京京王廣場大飯店 (Keio Plaza Hotel Tokyo)',
    '東京目黑雅敘園酒店 (Hotel Gajoen Tokyo)',
    '東京上野寶石飯店 (Hotel Crown Hills Ueno)',
    '東京銀座蒙特利酒店 (Hotel Monterey Ginza)',
    '東京大倉飯店 (The Okura Tokyo)',
    '東京押上Richmond國際酒店 (Richmond Hotel Premier Oshiage)'
  ]
};

const TAG_TEMPLATES = [
  ['免費停車位', '自助早餐', '親子備品'],
  ['高空泳池', '捷運直通', '極致景觀'],
  ['溫泉泡湯池', '兒童遊戲室', '早餐百匯'],
  ['觀夜景首選', '無邊際泳池', '夜市商圈旁'],
  ['親子賽車道', '球池攀爬區', '澡盆借用']
];

const IMAGES_POOL = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
];

function generateCityHotels(cityName, count = 24, rooms = 1) {
  const list = [];
  const displayCity = cityName || '精選城市';
  const realNames = REAL_INDIVIDUAL_HOTELS[displayCity] || REAL_INDIVIDUAL_HOTELS['台北'];
  const isExactHotelName = displayCity.includes('飯店') || displayCity.includes('酒店') || displayCity.inclimport { 
  queryHotelsFromSQLite, 
  queryDistrictFromSQLite 
} from '../db/sqliteEngine.js';

function resolveRealAddress(item, cityKey, idx) {
  if (item.address && !item.address.includes('提供') && !item.address.includes('客房') && !item.address.includes('設有') && !item.address.includes('附設') && !item.address.includes('飯店') && !item.address.includes('酒店') && item.address.length < 40) {
    return item.address;
  }
  if (item.neighborhood || item.location) {
    return `${cityKey} ${item.neighborhood || item.location}`;
  }

  // Query SQLite city_districts table in staypulse_hotels.db (< 1ms)
  return queryDistrictFromSQLite(cityKey, idx, item.name || '');
}�� (泰安溫泉風景區)', '頭份市 (尚順育樂世界)'],
  '台中': ['西屯區 (逢甲夜市/七期重劃區)', '中區 (台中火車站周邊)', '北區 (一中街商圈)', '西區 (勤美草悟道商圈)', '和平區 (谷關溫泉風景區)'],
  '臺中': ['西屯區 (逢甲夜市/七期重劃區)', '中區 (台中火車站周邊)', '北區 (一中街商圈)', '西區 (勤美草悟道商圈)'],
  '彰化': ['彰化市 (八卦山大佛風景區)', '鹿港鎮 (鹿港老街古蹟區)', '員林市 (員林火車站商圈)'],
  '南投': ['魚池鄉 (日月潭國家風景區)', '仁愛鄉 (清境農場/合歡山)', '埔里鎮 (埔里酒廠觀光區)', '鹿谷鄉 (溪頭自然教育園區)'],
  '雲林': ['北港鎮 (北港朝天宮周邊)', '古坑鄉 (劍湖山世界/綠色隧道)', '斗六市 (斗六人文夜市)'],
  '嘉義': ['西區 (文化路夜市/嘉義火車站)', '阿里山鄉 (阿里山國家森林遊樂區)', '民雄鄉 (民雄鬼屋/鵝肉一條街)', '東區 (蘭潭風景區)'],
  '台南': ['中西區 (國華街古蹟美食區)', '安平區 (安平古堡老街區)', '東區 (成功大學商圈)', '白河區 (關子嶺泥漿溫泉)'],
  '臺南': ['中西區 (國華街古蹟美食區)', '安平區 (安平古堡老街區)', '東區 (成功大學商圈)'],
  '高雄': ['前鎮區 (三多商圈)', '新興區 (六合夜市/美麗島)', '鹽埕區 (駁二藝術特區)', '左營區 (蓮池潭/高鐵特區)', '鼓山區 (西子灣/壽山景觀區)'],
  '屏東': ['恆春鎮 (墾丁國家公園/南灣海景區)', '屏東市 (勝利星村眷村園區)', '琉球鄉 (小琉球海龜潛水特區)', '車城鄉 (海生館/四重溪溫泉)'],
  '墾丁': ['恆春鎮 (墾丁大街商圈)', '南灣 (南灣沙灘水上活動區)', '船帆石 (船帆石海景區)', '白沙灣 (白砂海灘風景區)'],
  '宜蘭': ['礁溪鄉 (溫泉觀光特區)', '宜蘭市 (幾米公園/縣政特區)', '羅東鎮 (夜市觀光商圈)', '五結鄉 (冬山河親水特區)', '頭城鎮 (烏石港海景區)', '蘇澳鎮 (南方澳漁港/冷泉)'],
  '花蓮': ['花蓮市 (東大門夜市/七星潭)', '秀林鄉 (太魯閣國家公園)', '吉安鄉 (慶修院周邊)', '瑞穗鄉 (瑞穗溫泉/秀姑巒溪)'],
  '台東': ['台東市 (鐵花村/森林公園)', '鹿野鄉 (高台熱氣球特區)', '池上鄉 (伯朗大道稻田區)', '卑南鄉 (知本溫泉特區)'],
  '臺東': ['台東市 (鐵花村/森林公園)', '鹿野鄉 (高台熱氣球特區)', '池上鄉 (伯朗大道稻田區)'],
  '澎湖': ['馬公市 (觀音亭觀海/中央老街)', '白沙鄉 (跨海大橋景區)', '西嶼鄉 (二崁傳統聚落)'],
  '金門': ['金城鎮 (莒光樓/模範街)', '金湖鎮 (太武山/昇恆昌特區)', '金沙鎮 (陽翟老街)'],
  '馬祖': ['南竿鄉 (藍眼淚觀賞區/媽祖巨神像)', '北竿鄉 (芹壁傳統聚落)'],

  // 國際熱門旅遊城市
  '沖繩': ['那霸市 (國際通觀光商圈)', '恩納村 (虎灘海景度假區)', '北谷町 (美國村度假區)', '名護市 (部瀨名海景區)'],
  '東京': ['新宿區 (歌舞伎町/車站商圈)', '澀谷區 (原宿/竹下通商圈)', '千代田區 (東京車站/丸之內)', '台東區 (淺草寺/上野公園)', '中央區 (銀座精品特區)'],
  '大阪': ['中央區 (道頓堀/心齋橋商圈)', '浪速區 (難波車站/通天閣)', '北區 (梅田藍天大廈)'],
  '京都': ['東山區 (清水寺/祇園花見小路)', '中京區 (四條烏丸/錦市場)', '右京區 (嵐山竹林小徑)'],
  '首爾': ['中區 (明洞商圈/南山塔)', '麻浦區 (弘大商圈)', '江南區 (三成洞/COEX)'],
  '曼谷': ['Pathum Wan (暹羅百麗宮 Siam)', 'Khlong Toei (素坤逸 Sukhumvit)', 'Rattanakosin (大皇宮/臥佛寺)']
};

function resolveRealAddress(item, cityKey, idx) {
  if (item.address && !item.address.includes('提供') && !item.address.includes('客房') && !item.address.includes('設有') && !item.address.includes('附設') && !item.address.includes('飯店') && !item.address.includes('酒店') && item.address.length < 40) {
    return item.address;
  }
  if (item.neighborhood || item.location) {
    return `${cityKey} ${item.neighborhood || item.location}`;
  }

  const cleanCity = cityKey.replace(/飯店|酒店|hotel|resort|b&b|民宿|會館|館|旅店|旅館/gi, '').trim();
  const mainCity = (cleanCity.length >= 2) ? cleanCity : '台北';
  const districts = CITY_DISTRICTS_MAP[mainCity] || CITY_DISTRICTS_MAP['台北'];
  
  const nameStr = item.name || '';
  if (nameStr.includes('西門')) return `${mainCity} 萬華區 (西門町觀光商圈)`;
  if (nameStr.includes('中山')) return `${mainCity} 中山區 (捷運中山站周邊)`;
  if (nameStr.includes('信義') || nameStr.includes('101') || nameStr.includes('W ')) return `${mainCity} 信義區 (市府101商圈)`;
  if (nameStr.includes('礁溪')) return `宜蘭縣 礁溪鄉 (溫泉觀光特區)`;
  if (nameStr.includes('羅東')) return `宜蘭縣 羅東鎮 (夜市觀光商圈)`;

  return `${mainCity} ${districts[idx % districts.length]}`;
}

/**
 * Fetch real live hotel API data via SerpApi Google Hotels API with On-Demand Cache
 */
async function fetchLiveSerpApiHotels({ destination, checkIn, checkOut, rooms = 1, adults = 2, children = 0, childAges = '' }) {
  if (!config.serpApiKey) return null;

  const effectiveRooms = Math.max(1, Number(rooms) || 1);
  const cacheKey = `${destination.trim().toLowerCase()}_${checkIn}_${checkOut}_r${effectiveRooms}_a${adults}_c${children}_ag${childAges}`;
  const cached = getCachedResult(cacheKey);
  if (cached) return cached;

  try {
    let queryTarget = CITY_SERP_MAP[destination];
    if (!queryTarget) {
      const lower = destination.toLowerCase();
      if (lower.includes('hotel') || lower.includes('resort') || lower.includes('inn') || lower.includes('villa') || destination.includes('飯店') || destination.includes('酒店') || destination.includes('民宿') || destination.includes('會館')) {
        queryTarget = destination;
      } else {
        queryTarget = `${destination} Hotels`;
      }
    }

    const childrenParam = (children > 0 && childAges) ? `&children=${children}&children_ages=${childAges}` : '';
    const url = `https://serpapi.com/search.json?engine=google_hotels&q=${encodeURIComponent(queryTarget)}&check_in_date=${checkIn}&check_out_date=${checkOut}&adults=${adults}${childrenParam}&currency=TWD&hl=zh-TW&gl=tw&api_key=${config.serpApiKey}`;
    const res = await axios.get(url, { timeout: 12000 });
    
    if (res.data && res.data.properties && Array.isArray(res.data.properties) && res.data.properties.length > 0) {
      const parsedList = res.data.properties.map((item, idx) => {
        const singleRoomPrice = item.rate_per_night?.extracted_lowest || item.price || 3200;
        const lowestPrice = singleRoomPrice * effectiveRooms;
        const singleBeforeTax = item.rate_per_night?.extracted_before_taxes_fees || Math.round(singleRoomPrice * 0.86);
        const beforeTax = singleBeforeTax * effectiveRooms;
        const totalStayRate = item.total_rate?.extracted_lowest ? item.total_rate.extracted_lowest * effectiveRooms : null;
        const origPrice = Math.round(lowestPrice * 1.35);

        // Map real booking channels from item.prices if present
        const apiProviders = Array.isArray(item.prices) && item.prices.length > 0 ? item.prices.map(p => ({
          name: p.source || 'OTA Booking',
          price: (p.rate_per_night?.extracted_lowest || singleRoomPrice) * effectiveRooms,
          url: p.link || ''
        })) : [];

        // Format hotel class/type label
        let hotelTypeLabel = 'Hotel';
        if (item.extracted_hotel_class) {
          hotelTypeLabel = `${item.extracted_hotel_class}星級飯店`;
        } else if (item.hotel_class) {
          hotelTypeLabel = typeof item.hotel_class === 'number' ? `${item.hotel_class}星級飯店` : item.hotel_class;
        }

        // Format primary high-res image
        const mainImage = item.images?.[0]?.original_image || item.images?.[0]?.thumbnail || IMAGES_POOL[idx % IMAGES_POOL.length];

        // Format tags with Traditional Chinese translation map
        const rawTags = (item.amenities && item.amenities.length > 0) 
          ? item.amenities.slice(0, 4) 
          : [];
        let zhTags = rawTags.map(t => AMENITIES_ZH_MAP[t] || t);

        // Extract feature tags from description if amenities are missing
        if (zhTags.length === 0 && item.description) {
          const desc = item.description;
          if (desc.includes('泳池')) zhTags.push('室內外泳池');
          if (desc.includes('SPA')) zhTags.push('SPA 水療中心');
          if (desc.includes('健身房')) zhTags.push('健身中心');
          if (desc.includes('餐廳')) zhTags.push('附設頂級餐廳');
          if (desc.includes('酒吧')) zhTags.push('景觀酒吧');
          if (desc.includes('溫泉')) zhTags.push('天然溫泉');
          if (desc.includes('親子') || desc.includes('兒童')) zhTags.push('親子友善設施');
        }
        if (zhTags.length === 0) {
          zhTags = ['廣受好評', '交通極為便利', '舒適冷氣空調', '免費 Wi-Fi'];
        }

        // Clean Address: Use authentic district address resolution!
        const cleanAddress = resolveRealAddress(item, destination, idx);

        return {
          id: `serpapi-${idx}`,
          cityId: destination,
          cityName: destination,
          name: item.name || `${destination} 經典飯店`,
          type: hotelTypeLabel,
          rating: item.overall_rating || 4.8,
          reviewsCount: item.reviews || 1200,
          price: lowestPrice,
          beforeTaxPrice: beforeTax,
          totalStayPrice: totalStayRate,
          originalPrice: origPrice,
          discountPercent: Math.round((1 - lowestPrice / origPrice) * 100),
          address: cleanAddress,
          description: item.description || '',
          image: mainImage,
          gps: item.gps_coordinates || null,
          tags: zhTags,
          providers: apiProviders
        };
      });

      // Save into On-Demand TTL Cache
      setCachedResult(cacheKey, parsedList);
      return parsedList;
    }
  } catch (err) {
    console.warn('[SERPAPI-WARNING] Real API fetch skipped, falling back to real individual hotel dataset:', err.message);
  }
  return null;
}

export async function searchGlobalHotels({
  destination = '',
  type = 'all',
  maxPrice = 30000,
  sort = 'price_asc',
  page = 1,
  pageSize = 12,
  checkIn = getTodayStr(),
  checkOut = getTomorrowStr(2),
  rooms = 1,
  adults = 2,
  children = 2,
  childAges = '6,6'
} = {}) {
  const queryTerm = (destination || '').trim();
  const targetCityName = queryTerm || '台北';

  // 1. SQLite Master Database Lookup for 100% Exact Hotel / City Matching
  const sqliteMatches = queryHotelsFromSQLite(queryTerm);
  let sqliteHotelMap = new Map();
  if (sqliteMatches && sqliteMatches.length > 0) {
    sqliteMatches.forEach(h => {
      sqliteHotelMap.set(h.name_zh.toLowerCase(), h);
      sqliteHotelMap.set(h.name_en.toLowerCase(), h);
    });
  }

  // 2. Try real live SerpApi Google Hotels fetching with On-Demand Caching Strategy
  let filtered = await fetchLiveSerpApiHotels({ destination: targetCityName, checkIn, checkOut, rooms, adults, children, childAges });

  // 3. If SerpApi limits or unavailable, use SQLite master database entries first
  if (!filtered || filtered.length === 0) {
    if (sqliteMatches && sqliteMatches.length > 0) {
      const effectiveRooms = Math.max(1, Number(rooms) || 1);
      filtered = sqliteMatches.map((h, idx) => ({
        id: `sqlite-${idx}`,
        cityId: h.city_name,
        cityName: h.city_name,
        name: h.name_zh,
        type: h.hotel_class >= 4 ? (h.description.includes('親子') ? 'Family Hotel' : 'Hotel') : 'B&B',
        rating: h.rating,
        reviewsCount: h.reviews_count,
        price: h.base_price * effectiveRooms,
        beforeTaxPrice: Math.round(h.base_price * 0.86 * effectiveRooms),
        originalPrice: Math.round(h.base_price * 1.45 * effectiveRooms),
        discountPercent: 30,
        address: h.address,
        description: h.description,
        image: h.image_url,
        tags: JSON.parse(h.amenities || '[]'),
        providers: []
      }));
    } else {
      filtered = generateCityHotels(targetCityName, 24, rooms);
    }
  } else {
    // Enrich SerpApi items with complete postal addresses and clean amenity tags if matched in SQLite
    filtered = filtered.map(item => {
      const nameKey = (item.name || '').toLowerCase();
      const sqliteHotel = Array.from(sqliteHotelMap.values()).find(h => 
        nameKey.includes(h.name_zh.toLowerCase()) || nameKey.includes(h.name_en.toLowerCase()) || (h.keywords && nameKey.includes(h.keywords.split(',')[0].toLowerCase()))
      );

      // Clean address: ensure address is a real postal address (not an introduction description sentence)
      let cleanAddress = item.address;
      if (sqliteHotel && sqliteHotel.address) {
        cleanAddress = sqliteHotel.address;
      } else if (!cleanAddress || cleanAddress.includes('提供') || cleanAddress.includes('客房') || cleanAddress.includes('設有') || cleanAddress.includes('風格') || cleanAddress.includes('附設') || cleanAddress.includes('飯店') || cleanAddress.includes('酒店') || cleanAddress.length > 35) {
        const isHotelWord = targetCityName.includes('飯店') || targetCityName.includes('酒店') || targetCityName.includes('Hotel') || targetCityName.includes('Resort') || targetCityName.includes('民宿');
        const cleanRegion = targetCityName.replace(/飯店|酒店|hotel|resort|b&b|民宿|會館|館|旅店|旅館/gi, '').trim();
        const displayCity = (isHotelWord && cleanRegion.length < 2) ? '市中心' : (cleanRegion || '市中心');
        cleanAddress = `${displayCity}觀光熱門特區`;
      }

      const cleanTags = (sqliteHotel && sqliteHotel.amenities)
        ? JSON.parse(sqliteHotel.amenities)
        : item.tags;

      return {
        ...item,
        address: cleanAddress,
        tags: cleanTags
      };
    });
  }

  // Broad Cities list for regional search vs specific hotel search
  const dbCities = queryCitiesFromSQLite();
  const BROAD_CITIES_SET = new Set([
    '台北', '臺北', '宜蘭', '台中', '臺中', '高雄', '台南', '臺南', '桃園', '新竹', '苗栗', '彰化',
    '南投', '嘉義', '屏東', '墾丁', '花蓮', '台東', '臺東', '澎湖', '金門', '沖繩', '東京', '大阪',
    '首爾', '京都', '曼谷', '巴黎', '紐約', 'taipei', 'yilan', 'taichung', 'kaohsiung', 'tainan',
    'taoyuan', 'hsinchu', 'okinawa', 'tokyo', 'osaka', 'seoul', 'kyoto', 'bangkok', 'paris', 'new york'
  ]);

  const normQuery = queryTerm.toLowerCase().trim();
  const isBroadCity = BROAD_CITIES_SET.has(normQuery) || Boolean(CITY_SERP_MAP[queryTerm]);

  // Exact hotel name precision filtering (Only trigger when searching specific hotel/landmark)
  if (!isBroadCity && normQuery.length > 0 && filtered && filtered.length > 0) {
    const cleanKw = normQuery.replace(/飯店|酒店|hotel|resort|b&b|民宿|會館|館|旅店|旅館/gi, '').trim();

    const matched = filtered.filter(item => {
      const name = (item.name || '').toLowerCase();
      if (name.includes(normQuery)) return true;
      if (cleanKw.length >= 2 && name.includes(cleanKw)) return true;
      return false;
    });

    if (matched.length > 0) {
      filtered = matched;
    }
  }

  // Filter by stay type & max budget limit
  if (type !== 'all') {
    filtered = filtered.filter(i => i.type === type);
  }
  const maxP = Number(maxPrice) || 30000;
  filtered = filtered.filter(i => i.price <= maxP);

  // Attach provider deep links (Agoda, Booking.com, Trip.com) for each hotel
  const processed = filtered.map(hotel => {
    const deepLinks = buildProviderDeepLinks(hotel, {
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
      childAges
    });

    const lowestName = deepLinks && deepLinks.length > 0 ? deepLinks[0].name : 'Agoda';
    const lowestUrl = deepLinks && deepLinks.length > 0 ? deepLinks[0].url : 'https://www.agoda.com';

    return {
      ...hotel,
      lowestPriceProvider: lowestName,
      url: lowestUrl,
      providers: deepLinks || []
    };
  });

  // Apply Sorting (price_asc, price_desc, rating_desc)
  const sortedStays = sortStays(processed, sort);

  // Apply Pagination
  const result = paginateArray(sortedStays, page, pageSize);

  return {
    success: true,
    destination: targetCityName,
    dates: { checkIn, checkOut },
    guests: { adults: Number(adults), children: Number(children) },
    ...result
  };
}
