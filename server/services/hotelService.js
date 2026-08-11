import { mockStays, mockCities } from '../mockData.js';
import { buildProviderDeepLinks } from '../utils/urlBuilder.js';
import { paginateArray, sortStays } from '../utils/pagination.js';

// Pre-defined international and domestic hotel dataset generator
const INTERNATIONAL_HOTELS_DB = {
  'tokyo': [
    { name: '東京星野奢華溫泉旅館 (Hoshinoya Tokyo)', cityName: '東京', type: 'Hotel', rating: 4.9, reviewsCount: 4200, price: 9800, originalPrice: 13500, tags: ['奢華溫泉', '米其林餐飲', '地鐵直達'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
    { name: '東京新宿格拉斯麗飯店 (Hotel Gracery Shinjuku)', cityName: '東京', type: 'Hotel', rating: 4.7, reviewsCount: 6800, price: 3200, originalPrice: 4500, tags: ['哥吉拉地標', '歌舞伎町', '高CP值'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
    { name: '東京迪士尼樂園大飯店 (Tokyo Disneyland Hotel)', cityName: '東京', type: 'Family Hotel', rating: 4.8, reviewsCount: 3900, price: 6500, originalPrice: 8800, tags: ['迪士尼直營', '夢幻城堡主題', '兒童遊戲室'], image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80' },
    { name: '東京淺草集市大飯店 (The Gate Hotel Asakusa)', cityName: '東京', type: 'Hotel', rating: 4.6, reviewsCount: 2800, price: 2800, originalPrice: 3800, tags: ['晴空塔景觀', '雷門周邊', '景觀露台'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80' }
  ],
  'okinawa': [
    { name: '沖繩蒙特利水療度假飯店 (Hotel Monterey Okinawa)', cityName: '沖繩', type: 'Family Hotel', rating: 4.9, reviewsCount: 5100, price: 4200, originalPrice: 6200, tags: ['私人沙灘', '海景滑水道', '無邊際泳池'], image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80' },
    { name: '沖繩那霸休伊特度假飯店 (Hewitt Resort Naha)', cityName: '沖繩', type: 'Hotel', rating: 4.7, reviewsCount: 3100, price: 2600, originalPrice: 3500, tags: ['頂樓泳池', '國際通周邊', '親子友善'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
    { name: '沖繩恩納村萬豪渡假酒店 (Okinawa Marriott Resort)', cityName: '沖繩', type: 'Family Hotel', rating: 4.8, reviewsCount: 4200, price: 3800, originalPrice: 5400, tags: ['花園泳池', '兒童遊戲室', '海景套房'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' }
  ]
};

const HOTEL_NAME_TEMPLATES = [
  '精緻奢華度假酒店', '觀光商務大飯店', '海景溫泉渡假會館', '親子歡樂主題行館',
  '精品美學設計旅店', '溫泉水療休閒飯店', '國際五星級大飯店', '站前高CP值快捷旅店',
  '綠意花園度假山莊', '奢華行政景觀飯店', '親子溜滑梯特色民宿', '高空無邊際泳池飯店',
  '城市人文雅緻旅店', '悠閒渡假水療會館', '車站商圈捷運飯店', '國際會館大飯店',
  '綠洲奢華渡假村', '城市頂級花園飯店'
];

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

function generateCityHotels(cityName, targetCount = 18) {
  const list = [];
  const displayCity = cityName || '精選';
  for (let i = 1; i <= targetCount; i++) {
    const template = HOTEL_NAME_TEMPLATES[(i - 1) % HOTEL_NAME_TEMPLATES.length];
    const basePrice = 1350 + (i * 420) % 5200;
    const origPrice = Math.round(basePrice * 1.45);
    const rating = Math.min(5.0, Number((4.5 + (i * 0.08) % 0.48).toFixed(1)));
    const reviewsCount = 450 + i * 280;
    const type = i % 3 === 0 ? 'Family Hotel' : (i % 5 === 0 ? 'B&B' : 'Hotel');
    
    list.push({
      id: `gen-${displayCity}-${i}`,
      cityId: displayCity,
      cityName: displayCity,
      name: `${displayCity}${template} (${displayCity} Hotel ${i})`,
      type,
      rating,
      reviewsCount,
      price: basePrice,
      originalPrice: origPrice,
      discountPercent: Math.round((1 - basePrice / origPrice) * 100),
      address: `${displayCity}市中心觀光景點特區`,
      image: IMAGES_POOL[(i - 1) % IMAGES_POOL.length],
      tags: TAG_TEMPLATES[(i - 1) % TAG_TEMPLATES.length],
      providers: []
    });
  }
  return list;
}

function getTodayStr() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getTomorrowStr(addDays = 2) {
  const d = new Date();
  d.setDate(d.getDate() + addDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export async function searchGlobalHotels({
  destination = '',
  type = 'all',
  maxPrice = 10000,
  sort = 'price_asc',
  page = 1,
  pageSize = 12,
  checkIn = getTodayStr(),
  checkOut = getTomorrowStr(2),
  adults = 2,
  children = 1
} = {}) {
  const queryTerm = (destination || '').trim().toLowerCase();
  
  // 1. Gather candidates from domestic mockStays & international DB
  let rawList = [...mockStays];

  // Match international database if searched
  Object.keys(INTERNATIONAL_HOTELS_DB).forEach(key => {
    const list = INTERNATIONAL_HOTELS_DB[key];
    list.forEach((item, idx) => {
      rawList.push({
        id: `intl-${key}-${idx}`,
        cityId: key,
        cityName: item.cityName,
        name: item.name,
        type: item.type,
        rating: item.rating,
        reviewsCount: item.reviewsCount,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercent: item.originalPrice ? Math.round((1 - item.price / item.originalPrice) * 100) : null,
        address: `${item.cityName}市中心`,
        image: item.image,
        tags: item.tags,
        providers: []
      });
    });
  });

  // 2. Filter by destination keyword (city name, alias, hotel title)
  let filtered = rawList;
  if (queryTerm) {
    filtered = rawList.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(queryTerm);
      const cityMatch = item.cityName.toLowerCase().includes(queryTerm);
      const addressMatch = (item.address || '').toLowerCase().includes(queryTerm);
      return nameMatch || cityMatch || addressMatch;
    });

    // If matches are fewer than 18, supplement with generated city hotels to ensure rich 18+ results & multi-page pagination
    if (filtered.length < 18) {
      const targetCity = destination.trim() || '精選城市';
      const needed = 18 - filtered.length;
      const extraHotels = generateCityHotels(targetCity, needed);
      filtered = [...filtered, ...extraHotels];
    }
  } else {
    // If no destination specified, provide full dataset (20+ items)
    if (filtered.length < 24) {
      filtered = [...filtered, ...generateCityHotels('熱門比價', 12)];
    }
  }

  // 3. Filter by type & max price limit
  if (type !== 'all') {
    filtered = filtered.filter(i => i.type === type);
  }
  const maxP = Number(maxPrice) || 10000;
  filtered = filtered.filter(i => i.price <= maxP);

  // 4. Attach provider deep links for each hotel
  const processed = filtered.map(hotel => {
    const deepLinks = buildProviderDeepLinks(hotel, {
      checkIn,
      checkOut,
      adults,
      children
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

  // 5. Apply Sorting (price_asc, price_desc, rating_desc)
  const sortedStays = sortStays(processed, sort);

  // 6. Apply Pagination
  const result = paginateArray(sortedStays, page, pageSize);

  return {
    success: true,
    destination: destination.trim() || '全球熱門地區',
    dates: { checkIn, checkOut },
    guests: { adults: Number(adults), children: Number(children) },
    ...result
  };
}
