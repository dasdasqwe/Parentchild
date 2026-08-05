// Run: node add_slugs.cjs
// This script adds agodaSlug to hotel DB entries and fixes Agoda URL logic in scraper.js
import { readFileSync, writeFileSync } from 'fs';

const file = 'server/scraper.js';
let content = readFileSync(file, 'utf8');

// ============================================================
// STEP 1: Add agodaSlug to hotel DB entries
// ============================================================
const slugMap = {
  'Palais de Chine Hotel': 'palais-de-chine/hotel/taipei-tw.html',
  'Hua Shan Din Hotel': 'hua-shan-din-hotel/hotel/taipei-tw.html',
  'Hey Bear Hotel': 'hey-bear-hotel/hotel/taipei-tw.html',
  'Flip Flop Family Hotel': 'flip-flop-family-hotel/hotel/taipei-tw.html',
  'Cho Hotel Ximen': 'cho-hotel-ximen/hotel/taipei-tw.html',
  'Mitsui Garden Hotel Taipei': 'mitsui-garden-hotel-taipei/hotel/taipei-tw.html',
  'Regent Taipei': 'the-regent-taipei/hotel/taipei-tw.html',
  'The Grand Hotel': 'the-grand-hotel-taipei/hotel/taipei-tw.html',
  'Le Meridien Taipei': 'le-meridien-taipei/hotel/taipei-tw.html',
  'W Taipei': 'w-taipei/hotel/taipei-tw.html',
  'Caesar Park Hotel Banqiao / Wanhua': 'caesar-park-hotel-taipei/hotel/taipei-tw.html',
  'Hotel Royal-Nikko Taipei': 'hotel-royal-nikko-taipei/hotel/taipei-tw.html',
  'Sheraton Grand Taipei Hotel': 'sheraton-grand-taipei-hotel/hotel/taipei-tw.html',
  'Gnight Hotel Taipei': 'gnight-hotel-taipei/hotel/taipei-tw.html',
  'Parkview Taipei': 'parkview-taipei/hotel/taipei-tw.html',
  'Le Meridien Taichung': 'le-meridien-taichung/hotel/taichung-tw.html',
  'Beacon Hotel Taichung': 'beacon-hotel-taichung/hotel/taichung-tw.html',
  'Green Hotel Taichung': 'green-hotel-taichung/hotel/taichung-tw.html',
  'Millennium Hotel Taichung': 'millennium-hotel-taichung/hotel/taichung-tw.html',
  'Evergreen Laurel Hotel Taichung': 'evergreen-laurel-hotel-taichung/hotel/taichung-tw.html',
  'Windsor Hotel Taichung': 'windsor-hotel-taichung/hotel/taichung-tw.html',
  'The Lin Hotel Taichung': 'the-lin-hotel-taichung/hotel/taichung-tw.html',
  'The Splendor Hotel Taichung': 'the-splendor-hotel-taichung/hotel/taichung-tw.html',
  'National Hotel Taichung': 'national-hotel-taichung/hotel/taichung-tw.html',
  'Inhouse Hotel Taichung': 'inhouse-hotel-taichung/hotel/taichung-tw.html',
  'CityInn Hotel Plus Taichung': 'cityinn-hotel-plus-taichung-station/hotel/taichung-tw.html',
  'Kaohsiung Marriott Hotel': 'kaohsiung-marriott-hotel/hotel/kaohsiung-tw.html',
  'Grand Hi-Lai Hotel': 'grand-hi-lai-hotel/hotel/kaohsiung-tw.html',
  'City Suites Kaohsiung Chenai': 'city-suites-kaohsiung-chenai/hotel/kaohsiung-tw.html',
  'Okinawa Kariyushi Beach Resort': 'okinawa-kariyushi-beach-resort-onna/hotel/okinawa-jp.html',
  'Vessel Hotel Campana Okinawa': 'vessel-hotel-campana-okinawa/hotel/okinawa-jp.html',
  'Hotel Azat Okinawa': 'hotel-azat/hotel/naha-jp.html',
  'Hotel JAL City Naha': 'hotel-jal-city-naha/hotel/naha-jp.html',
  'Southern Beach Hotel & Resort Okinawa': 'southern-beach-hotel-resort-okinawa/hotel/okinawa-jp.html',
  'Okinawa Harborview Hotel': 'okinawa-harborview-hotel/hotel/naha-jp.html',
  'Hotel Royal Orion Naha': 'hotel-royal-orion-naha/hotel/naha-jp.html',
  'Hilton Okinawa Chatan Resort': 'hilton-okinawa-chatan-resort/hotel/okinawa-jp.html',
  'Hotel Monterey Okinawa Spa & Resort': 'hotel-monterey-okinawa-spa-resort/hotel/okinawa-jp.html',
  'ANA InterContinental Manza Beach Resort': 'ana-intercontinental-manza-beach-resort/hotel/okinawa-jp.html',
  'DoubleTree by Hilton Naha Shuri Castle': 'doubletree-by-hilton-naha-shuri-castle/hotel/naha-jp.html',
  'Ryukyu Onsen Senagajima Hotel': 'ryukyu-onsen-senagajima-hotel/hotel/okinawa-jp.html',
  'Hewitt Resort Naha': 'hewitt-resort-naha/hotel/naha-jp.html',
  'Shinjuku Washington Hotel': 'shinjuku-washington-hotel/hotel/tokyo-jp.html',
  'Hotel Gracery Shinjuku': 'hotel-gracery-shinjuku/hotel/tokyo-jp.html',
  'Shinagawa Prince Hotel': 'shinagawa-prince-hotel/hotel/tokyo-jp.html'
};

let slugCount = 0;
for (const [engName, slug] of Object.entries(slugMap)) {
  const escaped = engName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp('(\\(' + escaped + '\\))(\',\\s*type:|\",\\s*type:)', 'g');
  const before = content;
  content = content.replace(pattern, (m, p1, p2) => p1 + `, agodaSlug: '${slug}'` + p2);
  if (content !== before) {
    slugCount++;
    console.log('OK slug:', engName);
  } else {
    console.log('MISS slug:', engName);
  }
}

// ============================================================
// STEP 2: Fix provider URL generation
// Replace old Agoda URL logic with slug-aware version
// ============================================================
const oldAgodaBlock = `  // Build 1:1 exact deep-links prioritizing target hotel as #1 result on Agoda & Booking
  const mainAgodaCityId = resolveAgodaCityId(searchQuery) || resolveAgodaCityId(normCityId);

  liveStays.forEach(stay => {
    const targetCityKey = (stay.cityId || normCityId).toLowerCase();
    const agodaCityId = resolveAgodaCityId(targetCityKey) || mainAgodaCityId;

    // Prefer English name in parentheses for Agoda's global search engine to ensure #1 card placement
    const englishMatch = stay.name.match(/\\(([^)]+)\\)/);
    const agodaSearchName = englishMatch ? englishMatch[1].trim() : stay.name.split(' (')[0].trim();
    const encodedKwAgoda = encodeURIComponent(agodaSearchName);

    const bookingSearchName = stay.name.split(' (')[0].trim();

    stay.providers = [
      {
        name: 'Booking.com',
        price: stay.price,
        isLowest: stay.lowestPriceProvider === 'Booking.com',
        url: \`https://www.booking.com/searchresults.zh-tw.html?ss=\${encodeURIComponent(searchQuery + ' ' + bookingSearchName)}&checkin=\${checkIn}&checkout=\${checkOut}&group_adults=\${adults}&group_children=\${children}\`
      },
      {
        name: 'Agoda',
        price: stay.price + 50,
        isLowest: stay.lowestPriceProvider === 'Agoda',
        url: \`https://www.agoda.com/zh-tw/search?city=\${agodaCityId}&text=\${encodedKwAgoda}&textToSearch=\${encodedKwAgoda}&checkIn=\${checkIn}&checkOut=\${checkOut}&rooms=1&adults=\${adults}&children=\${children}\`
      },
      {
        name: 'Trip.com',
        price: stay.price + 110,
        isLowest: false,
        url: \`https://tw.trip.com/hotels/list?keyword=\${encodeURIComponent(searchQuery + ' ' + bookingSearchName)}&checkIn=\${checkIn}&checkOut=\${checkOut}&adults=\${adults}&children=\${children}\`
      }
    ];
  });`;

const newAgodaBlock = `  // Build 1:1 exact deep-links prioritizing target hotel as #1 result on Agoda & Booking
  const mainAgodaCityId = resolveAgodaCityId(searchQuery) || resolveAgodaCityId(normCityId);

  liveStays.forEach(stay => {
    const targetCityKey = (stay.cityId || normCityId).toLowerCase();
    const agodaCityId = resolveAgodaCityId(targetCityKey) || mainAgodaCityId;

    // Use English hotel name (inside parentheses) for direct hotel search on all platforms
    const englishMatch = stay.name.match(/\\(([^)]+)\\)/);
    const englishName = englishMatch ? englishMatch[1].trim() : stay.name.replace(/【.*?】/g, '').trim();
    const chineseName = stay.name.split(' (')[0].replace(/【.*?】/g, '').trim();

    const encodedEn = encodeURIComponent(englishName);

    // Agoda URL strategy:
    // 1. If hotel has a direct page slug -> use /zh-tw/{slug}/hotel/city.html (100% accurate)
    // 2. Fallback -> city + textToSearch search URL
    let agodaUrl;
    if (stay.agodaSlug) {
      agodaUrl = \`https://www.agoda.com/zh-tw/\${stay.agodaSlug}?checkIn=\${checkIn}&checkOut=\${checkOut}&rooms=1&adults=\${adults}&children=\${children}\`;
    } else {
      agodaUrl = \`https://www.agoda.com/zh-tw/search?city=\${agodaCityId}&textToSearch=\${encodedEn}&checkIn=\${checkIn}&checkOut=\${checkOut}&rooms=1&adults=\${adults}&children=\${children}\`;
    }

    stay.providers = [
      {
        name: 'Booking.com',
        price: stay.price,
        isLowest: stay.lowestPriceProvider === 'Booking.com',
        // Booking.com: use English name as ss param for direct hotel matching
        url: \`https://www.booking.com/searchresults.zh-tw.html?ss=\${encodedEn}&checkin=\${checkIn}&checkout=\${checkOut}&group_adults=\${adults}&group_children=\${children}&sb=1&src=index&src_elem=sb\`
      },
      {
        name: 'Agoda',
        price: stay.price + 50,
        isLowest: stay.lowestPriceProvider === 'Agoda',
        url: agodaUrl
      },
      {
        name: 'Trip.com',
        price: stay.price + 110,
        isLowest: false,
        url: \`https://tw.trip.com/hotels/list?keyword=\${encodedEn}&checkIn=\${checkIn}&checkOut=\${checkOut}&adults=\${adults}&children=\${children}\`
      }
    ];
  });`;

if (content.includes(oldAgodaBlock)) {
  content = content.replace(oldAgodaBlock, newAgodaBlock);
  console.log('OK: Replaced Agoda URL logic block');
} else {
  console.log('MISS: Agoda URL logic block not found (may already be updated)');
}

// ============================================================
// STEP 3: Write back with UTF-8 encoding (no BOM)
// ============================================================
writeFileSync(file, content, { encoding: 'utf8' });
console.log(`\nDone! Added ${slugCount} agodaSlugs, UTF-8 saved.`);
