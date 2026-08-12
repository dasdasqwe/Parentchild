import axios from 'axios';
import { config } from '../config/env.js';
import { buildProviderDeepLinks } from '../utils/urlBuilder.js';
import { paginateArray, sortStays } from '../utils/pagination.js';
import {
  queryHotelsFromSQLite,
  queryCitiesFromSQLite,
  queryDistrictFromSQLite,
  getCachedApiFromSQLite,
  setCachedApiToSQLite
} from '../db/sqliteEngine.js';

// Helper Date string generators
function getTodayStr() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function getTomorrowStr(addDays = 2) {
  const d = new Date();
  d.setDate(d.getDate() + addDays);
  return d.toISOString().split('T')[0];
}

// Persistent SQLite API Cache Strategy (TTL: 15 minutes)
function getCachedResult(cacheKey) {
  return getCachedApiFromSQLite(cacheKey);
}

function setCachedResult(cacheKey, data) {
  setCachedApiToSQLite(cacheKey, data, 15 * 60 * 1000);
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

const REAL_INDIVIDUAL_HOTELS = {
  '台北': ['台北 W 飯店 (W Taipei)', '台北晶華酒店 (Regent Taipei)', '和逸飯店・台北民生館', '同一大飯店 (Tong Yi Hotel)', '台北君悅酒店', '寒舍艾美酒店', '圓山大飯店', '美麗信花園酒店'],
  '宜蘭': ['煙波大飯店・宜蘭館', '蘭城晶英酒店', '田野居宜蘭民宿', '礁溪老爺酒店', '長榮鳳凰酒店(礁溪)', '川湯春天旗艦館', '捷絲旅宜蘭礁溪館', '綠舞國際觀光飯店'],
  '台中': ['台中日月千禧酒店', '長榮桂冠酒店(台中)', '和逸飯店・台中館', '逢甲商旅', '林酒店 (The Lin)', '裕元花園酒店', '薆悅酒店五權館'],
  '高雄': ['高雄洲際酒店', '漢來大飯店', '高雄萬豪酒店', '晶英國際行館', '福華大飯店(高雄)', '巨蛋旅店', '城市商旅真愛館'],
  '台南': ['台南晶英酒店', '香格里拉台南遠東國際大飯店', '和逸飯店・台南西門館', '台南大飯店', '友愛街旅館 (UIJ Hotel)', '康橋慢旅'],
  '沖繩': ['沖繩蒙特利水療度假飯店', '那霸格拉斯麗飯店', '琉球溫泉瀨長島飯店', '沖繩南海海灘酒店', '沖繩哈雷克拉尼酒店'],
  '東京': ['東京希爾頓飯店', '東京半島酒店', '東京帝國飯店', '新宿格拉斯麗飯店', '澀谷 Stream Excel Hotel'],
  '大阪': ['大阪瑞士南海酒店', '大阪萬豪都飯店', '大阪南海輝盛庭國際公寓', '難波日航飯店']
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

export function resolveRealAddress(item, cityKey, idx) {
  if (item.address && !item.address.includes('提供') && !item.address.includes('客房') && !item.address.includes('設有') && !item.address.includes('附設') && !item.address.includes('飯店') && !item.address.includes('酒店') && item.address.length < 40) {
    return item.address;
  }
  if (item.neighborhood || item.location) {
    return `${cityKey} ${item.neighborhood || item.location}`;
  }
  return queryDistrictFromSQLite(cityKey, idx, item.name || '');
}

function generateCityHotels(cityName, count = 24, rooms = 1) {
  const list = [];
  const displayCity = cityName || '精選城市';
  const realNames = REAL_INDIVIDUAL_HOTELS[displayCity] || REAL_INDIVIDUAL_HOTELS['台北'] || ['精選飯店'];
  const effectiveRooms = Math.max(1, Number(rooms) || 1);

  for (let i = 0; i < count; i++) {
    const basePrice = (2200 + (i * 350) % 4500) * effectiveRooms;
    const name = `${displayCity} ${realNames[i % realNames.length]}`;
    const tags = TAG_TEMPLATES[i % TAG_TEMPLATES.length];
    const img = IMAGES_POOL[i % IMAGES_POOL.length];

    list.push({
      id: `mock-${i}`,
      cityId: displayCity,
      cityName: displayCity,
      name,
      type: i % 3 === 0 ? 'Family Hotel' : (i % 2 === 0 ? 'Hotel' : 'B&B'),
      rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
      reviewsCount: 300 + i * 85,
      price: basePrice,
      beforeTaxPrice: Math.round(basePrice * 0.86),
      originalPrice: Math.round(basePrice * 1.4),
      discountPercent: 30,
      address: resolveRealAddress({}, displayCity, i),
      description: `座落於${displayCity}核心地段，環境優雅靜謐，交通生活機能極佳。`,
      image: img,
      tags,
      providers: []
    });
  }
  return list;
}

async function fetchLiveSerpApiHotels({ destination, checkIn, checkOut, rooms = 1, adults = 2, children = 0, childAges = '' }) {
  if (!config.serpApiKey) return null;

  const queryLoc = CITY_SERP_MAP[destination] || `${destination} Hotels`;
  const cacheKey = `serpapi_${queryLoc}_${checkIn}_${checkOut}_${rooms}_${adults}_${children}_${childAges}`;

  const cached = getCachedResult(cacheKey);
  if (cached) return cached;

  try {
    const params = {
      engine: 'google_hotels',
      q: queryLoc,
      check_in_date: checkIn,
      check_out_date: checkOut,
      adults: adults,
      children: children,
      rooms: rooms,
      currency: 'TWD',
      hl: 'zh-tw',
      gl: 'tw',
      api_key: config.serpApiKey
    };

    if (children > 0 && childAges) {
      params.children_ages = childAges;
    }

    const response = await axios.get('https://serpapi.com/search.json', {
      params,
      timeout: 12000
    });

    if (response.data && response.data.properties && Array.isArray(response.data.properties)) {
      const properties = response.data.properties;

      const parsedList = properties.map((item, idx) => {
        let lowestPrice = 3200;
        let beforeTax = 2750;
        let totalStayRate = 6400;
        let apiProviders = [];

        if (item.rate_per_night && item.rate_per_night.lowest) {
          const numStr = String(item.rate_per_night.lowest).replace(/[^0-9]/g, '');
          if (numStr) lowestPrice = parseInt(numStr, 10);
        } else if (item.total_rate && item.total_rate.lowest) {
          const numStr = String(item.total_rate.lowest).replace(/[^0-9]/g, '');
          if (numStr) lowestPrice = Math.round(parseInt(numStr, 10) / 2);
        }

        if (item.prices && Array.isArray(item.prices)) {
          apiProviders = item.prices.map(p => {
            let pPrice = lowestPrice;
            if (p.rate_per_night && p.rate_per_night.lowest) {
              const pNum = String(p.rate_per_night.lowest).replace(/[^0-9]/g, '');
              if (pNum) pPrice = parseInt(pNum, 10);
            }
            return {
              name: p.source || 'Agoda',
              price: pPrice,
              official: Boolean(p.official),
              url: p.link || 'https://www.agoda.com'
            };
          });
        }

        beforeTax = Math.round(lowestPrice * 0.86);
        totalStayRate = lowestPrice * 2;
        const origPrice = Math.round(lowestPrice * 1.45);

        const hotelTypeLabel = (item.hotel_class && parseInt(item.hotel_class, 10) >= 4)
          ? ((item.description || '').includes('親子') ? 'Family Hotel' : 'Hotel')
          : 'B&B';

        let mainImage = IMAGES_POOL[idx % IMAGES_POOL.length];
        if (item.images && Array.isArray(item.images) && item.images.length > 0) {
          mainImage = item.images[0].original_image || item.images[0].thumbnail || mainImage;
        }

        let zhTags = [];
        if (item.amenities && Array.isArray(item.amenities)) {
          zhTags = item.amenities.slice(0, 4);
        } else if (item.description) {
          const desc = item.description;
          if (desc.includes('泳池')) zhTags.push('高空泳池');
          if (desc.includes('免費 Wi-Fi') || desc.includes('Wi-Fi')) zhTags.push('免費 Wi-Fi');
          if (desc.includes('停車')) zhTags.push('專屬停車場');
          if (desc.includes('早餐')) zhTags.push('附設早餐');
          if (desc.includes('SPA')) zhTags.push('SPA 水療中心');
        }
        if (zhTags.length === 0) {
          zhTags = ['位置優越', '交通極為便利', '舒適冷氣空調', '免費 Wi-Fi'];
        }

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

  // 1. SQLite Master Database Lookup
  const sqliteMatches = queryHotelsFromSQLite(queryTerm);
  let sqliteHotelMap = new Map();
  if (sqliteMatches && sqliteMatches.length > 0) {
    sqliteMatches.forEach(h => {
      sqliteHotelMap.set(h.name_zh.toLowerCase(), h);
      sqliteHotelMap.set(h.name_en.toLowerCase(), h);
    });
  }

  // 2. Try real live SerpApi Google Hotels fetching
  let filtered = await fetchLiveSerpApiHotels({ destination: targetCityName, checkIn, checkOut, rooms, adults, children, childAges });

  // 3. Fallback to SQLite master DB or dynamic hotel generator
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
    filtered = filtered.map(item => {
      const nameKey = (item.name || '').toLowerCase();
      const sqliteHotel = Array.from(sqliteHotelMap.values()).find(h => 
        nameKey.includes(h.name_zh.toLowerCase()) || nameKey.includes(h.name_en.toLowerCase()) || (h.keywords && nameKey.includes(h.keywords.split(',')[0].toLowerCase()))
      );

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

  const dbCities = queryCitiesFromSQLite();
  const BROAD_CITIES_SET = new Set([
    '台北', '臺北', '宜蘭', '台中', '臺中', '高雄', '台南', '臺南', '桃園', '新竹', '苗栗', '彰化',
    '南投', '嘉義', '屏東', '墾丁', '花蓮', '台東', '臺東', '澎湖', '金門', '沖繩', '東京', '大阪',
    '首爾', '京都', '曼谷', '巴黎', '紐約', 'taipei', 'yilan', 'taichung', 'kaohsiung', 'tainan',
    'taoyuan', 'hsinchu', 'okinawa', 'tokyo', 'osaka', 'seoul', 'kyoto', 'bangkok', 'paris', 'new york'
  ]);
  if (dbCities && dbCities.length > 0) {
    dbCities.forEach(c => {
      BROAD_CITIES_SET.add(c.name.toLowerCase());
      if (c.aliases) {
        c.aliases.split(',').forEach(a => BROAD_CITIES_SET.add(a.trim().toLowerCase()));
      }
    });
  }

  const normQuery = queryTerm.toLowerCase().trim();
  const isBroadCity = BROAD_CITIES_SET.has(normQuery) || Boolean(CITY_SERP_MAP[queryTerm]);

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

  if (type !== 'all') {
    filtered = filtered.filter(i => i.type === type);
  }
  const maxP = Number(maxPrice) || 30000;
  filtered = filtered.filter(i => i.price <= maxP);

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

  const sortedStays = sortStays(processed, sort);
  const result = paginateArray(sortedStays, page, pageSize);

  return {
    success: true,
    destination: targetCityName,
    dates: { checkIn, checkOut },
    guests: { adults: Number(adults), children: Number(children) },
    ...result
  };
}
