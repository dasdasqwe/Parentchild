import { mockCities } from '../mockData.js';
import { buildProviderDeepLinks } from '../utils/urlBuilder.js';
import { paginateArray, sortStays } from '../utils/pagination.js';

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

function generateCityHotels(cityName, count = 20) {
  const list = [];
  const displayCity = cityName || '精選城市';
  for (let i = 1; i <= count; i++) {
    const template = HOTEL_NAME_TEMPLATES[(i - 1) % HOTEL_NAME_TEMPLATES.length];
    const basePrice = 1350 + (i * 420) % 5200;
    const origPrice = Math.round(basePrice * 1.45);
    const rating = Math.min(5.0, Number((4.5 + (i * 0.08) % 0.48).toFixed(1)));
    const reviewsCount = 450 + i * 280;
    const type = i % 3 === 0 ? 'Family Hotel' : (i % 5 === 0 ? 'B&B' : 'Hotel');
    
    list.push({
      id: `hotel-${displayCity}-${i}`,
      cityId: displayCity,
      cityName: displayCity,
      name: `${displayCity}${template} (${displayCity} Hotel ${i})`,
      type,
      rating,
      reviewsCount,
      price: basePrice,
      originalPrice: origPrice,
      discountPercent: Math.round((1 - basePrice / origPrice) * 100),
      address: `${displayCity}市中心觀光商圈`,
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
  const queryTerm = (destination || '').trim();
  const targetCityName = queryTerm || '熱門精選';

  // Generate 24 dynamic, realistic hotels for the target city
  let filtered = generateCityHotels(targetCityName, 24);

  // Filter by stay type & max budget limit
  if (type !== 'all') {
    filtered = filtered.filter(i => i.type === type);
  }
  const maxP = Number(maxPrice) || 10000;
  filtered = filtered.filter(i => i.price <= maxP);

  // Attach provider deep links for each hotel
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
