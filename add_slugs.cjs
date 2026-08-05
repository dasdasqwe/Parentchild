const fs = require('fs');
const file = 'server/scraper.js';
let content = fs.readFileSync(file, 'utf8');

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
  'Kaohsiung Marriott Hotel': 'kaohsiung-marriott-hotel/hotel/kaohsiung-tw.html',
  'Grand Hi-Lai Hotel': 'grand-hi-lai-hotel/hotel/kaohsiung-tw.html',
  'Okinawa Kariyushi Beach Resort': 'okinawa-kariyushi-beach-resort-onna/hotel/okinawa-jp.html',
  'Vessel Hotel Campana Okinawa': 'vessel-hotel-campana-okinawa/hotel/okinawa-jp.html',
  'Hotel Azat Okinawa': 'hotel-azat/hotel/naha-jp.html',
  'Hotel JAL City Naha': 'hotel-jal-city-naha/hotel/naha-jp.html',
  'Hilton Okinawa Chatan Resort': 'hilton-okinawa-chatan-resort/hotel/okinawa-jp.html',
  'ANA InterContinental Manza Beach Resort': 'ana-intercontinental-manza-beach-resort/hotel/okinawa-jp.html',
  'DoubleTree by Hilton Naha Shuri Castle': 'doubletree-by-hilton-naha-shuri-castle/hotel/naha-jp.html',
  'Ryukyu Onsen Senagajima Hotel': 'ryukyu-onsen-senagajima-hotel/hotel/okinawa-jp.html',
  'Shinjuku Washington Hotel': 'shinjuku-washington-hotel/hotel/tokyo-jp.html',
  'Hotel Gracery Shinjuku': 'hotel-gracery-shinjuku/hotel/tokyo-jp.html',
  'Shinagawa Prince Hotel': 'shinagawa-prince-hotel/hotel/tokyo-jp.html'
};

let count = 0;
for (const [engName, slug] of Object.entries(slugMap)) {
  // Match: (EngName)', type: or (EngName)'), type:
  const escaped = engName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp('(\\(' + escaped + '\\))([\'"]?,\\s*type:)', 'g');
  const before = content;
  content = content.replace(pattern, (m, p1, p2) => p1 + ', agodaSlug: \'' + slug + '\'' + p2);
  if (content !== before) {
    count++;
    console.log('OK: ' + engName);
  } else {
    console.log('MISS: ' + engName);
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Done! Updated ' + count + ' hotels');
