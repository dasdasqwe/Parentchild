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
  ],
  'seoul': [
    { name: '首爾新羅飯店 (The Shilla Seoul)', cityName: '首爾', type: 'Hotel', rating: 4.9, reviewsCount: 3800, price: 5800, originalPrice: 7900, tags: ['韓屋庭園', '南山塔景觀', '奢華水療'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
    { name: '明洞樂天L7飯店 (L7 Myeongdong)', cityName: '首爾', type: 'Hotel', rating: 4.6, reviewsCount: 4900, price: 2900, originalPrice: 3800, tags: ['明洞商圈', '高空露天吧', '時尚設計'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' }
  ],
  'bangkok': [
    { name: '曼谷湄公河四季酒店 (Four Seasons Bangkok)', cityName: '曼谷', type: 'Hotel', rating: 4.9, reviewsCount: 2900, price: 6200, originalPrice: 8500, tags: ['昭披耶河景', '露天河畔泳池', '頂級水療'], image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80' },
    { name: '曼谷Terminal 21中心點飯店 (Grande Centre Point)', cityName: '曼谷', type: 'Hotel', rating: 4.7, reviewsCount: 6100, price: 2300, originalPrice: 3200, tags: ['捷運直通', '百貨上蓋', '高CP值'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80' }
  ],
  'paris': [
    { name: '巴黎喬治五世四季酒店 (Four Seasons George V Paris)', cityName: '巴黎', type: 'Hotel', rating: 4.9, reviewsCount: 1900, price: 14500, originalPrice: 19000, tags: ['香榭麗舍大道', '艾菲爾鐵塔景', '米其林三星'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
    { name: '巴黎第一區鉑爾曼飯店 (Pullman Paris Tour Eiffel)', cityName: '巴黎', type: 'Hotel', rating: 4.7, reviewsCount: 5200, price: 7800, originalPrice: 9800, tags: ['鐵塔景觀陽台', '塞納河畔', '時尚飯店'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' }
  ],
  'newyork': [
    { name: '紐約廣場大飯店 (The Plaza Hotel New York)', cityName: '紐約', type: 'Hotel', rating: 4.8, reviewsCount: 3400, price: 12800, originalPrice: 16500, tags: ['中央公園第一排', '百年經典', '第五大道'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
    { name: '紐約時代廣場洲際酒店 (InterContinental Times Square)', cityName: '紐約', type: 'Hotel', rating: 4.6, reviewsCount: 4800, price: 6800, originalPrice: 8900, tags: ['時代廣場', '百老匯劇場區', '高空景觀'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80' }
  ]
};

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
    // Fallback: If no direct substring match, return all items with city match or fallback subset
    if (filtered.length === 0) {
      filtered = rawList.filter(item => item.cityName.includes('台北') || item.cityName.includes('宜蘭') || item.cityName.includes('東京'));
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
    destination: queryTerm || '全球熱門地區',
    dates: { checkIn, checkOut },
    guests: { adults: Number(adults), children: Number(children) },
    ...result
  };
}
