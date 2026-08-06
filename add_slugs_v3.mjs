// add_slugs_v3.mjs - AST-safe approach: read file, find each hotel object line,
// and insert agodaSlug as a proper object property AFTER the name string closes.
import { readFileSync, writeFileSync } from 'fs';

const file = 'server/scraper.js';
let content = readFileSync(file, 'utf8');
const lines = content.split('\n');

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

let count = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Only process lines in cityRealHotelsMap (lines containing hotel objects)
  if (!line.includes("type: '") || !line.includes("name: '")) continue;

  for (const [engName, slug] of Object.entries(slugMap)) {
    if (line.includes(engName)) {
      // Strategy: replace "type: '" with "agodaSlug: 'slug', type: '"
      // This inserts BEFORE type, which is ALWAYS a separate key after name
      const target = "type: '";
      const firstTypeIdx = line.indexOf(target);
      if (firstTypeIdx === -1) continue;
      
      // Make sure we haven't already added agodaSlug
      if (line.includes('agodaSlug:')) continue;
      
      const replacement = `agodaSlug: '${slug}', type: '`;
      lines[i] = line.substring(0, firstTypeIdx) + replacement + line.substring(firstTypeIdx + target.length);
      count++;
      console.log('OK:', engName);
      break; // only one slug per line
    }
  }
}

content = lines.join('\n');

// Verify: check a known line
const sheratonLine = lines.find(l => l.includes('Sheraton'));
if (sheratonLine) {
  // Extract just the agodaSlug part
  const match = sheratonLine.match(/agodaSlug: '([^']+)'/);
  console.log('\nVerify Sheraton agodaSlug:', match ? match[1] : 'NOT FOUND');
  // Make sure name still has proper closing quote
  const nameMatch = sheratonLine.match(/name: '([^']+)'/);
  console.log('Verify Sheraton name:', nameMatch ? nameMatch[1].substring(0, 60) + '...' : 'NOT FOUND');
}

writeFileSync(file, content, 'utf8');
console.log(`\nDone! Added ${count} slugs`);
