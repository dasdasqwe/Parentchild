/**
 * Dynamic Deep Link Builder for Major Hotel Booking Platforms
 */

export function buildDeepLinks({ hotelName, cityName, checkIn, checkOut, adults = 2, children = 0, childAges = [] }) {
  // Clean hotel name by removing detailed room descriptions (e.g. "Meant To Be - Comfort Double Room - 1st Floor")
  let cleanName = (hotelName || '').split(' - ')[0].split(' (')[0].trim();
  
  // Avoid duplicate city prefix if hotelName already includes cityName (e.g. "台中長榮桂冠酒店" with cityName="台中")
  let searchKeyword = cleanName;
  if (cityName && !cleanName.includes(cityName)) {
    searchKeyword = `${cityName} ${cleanName}`;
  }

  const encSearch = encodeURIComponent(searchKeyword);

  // Standardized Date Format: YYYY-MM-DD
  const cin = checkIn || new Date().toISOString().split('T')[0];
  const cout = checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // 1. Agoda Deep Link
  let agodaUrl = `https://www.agoda.com/zh-tw/pages/agoda/default/page_textSearchResult.aspx?textToSearch=${encSearch}&checkIn=${cin}&checkOut=${cout}&rooms=1&adults=${adults}&children=${children}`;
  if (children > 0 && childAges.length > 0) {
    agodaUrl += `&childages=${childAges.join(',')}`;
  }

  // 2. Booking.com Deep Link
  let bookingUrl = `https://www.booking.com/searchresults.zh-tw.html?ss=${encSearch}&checkin=${cin}&checkout=${cout}&group_adults=${adults}&group_children=${children}&no_rooms=1`;
  if (children > 0 && childAges.length > 0) {
    childAges.forEach(age => {
      bookingUrl += `&age=${age}`;
    });
  }

  // 3. Trip.com Deep Link
  let tripUrl = `https://tw.trip.com/hotels/list?searchWord=${encSearch}&checkIn=${cin}&checkOut=${cout}&Adult=${adults}&Children=${children}`;
  if (children > 0 && childAges.length > 0) {
    tripUrl += `&childAges=${childAges.join(',')}`;
  }

  // 4. Hotels.com Deep Link
  // Build room specification string for Hotels.com (e.g., rm1=a2c2:3:2) to reliably lock in the exact hotel search and guest count
  let rmParam = `a${adults}`;
  if (children > 0) {
    rmParam += `c${children}`;
    if (childAges.length > 0) {
      rmParam += `:${childAges.join(':')}`;
    }
  }
  let hotelsComUrl = `https://tw.hotels.com/Hotel-Search?q-destination=${encSearch}&chkin=${cin}&chkout=${cout}&rm1=${rmParam}`;

  return {
    agoda: agodaUrl,
    booking: bookingUrl,
    trip: tripUrl,
    hotelsCom: hotelsComUrl
  };
}
