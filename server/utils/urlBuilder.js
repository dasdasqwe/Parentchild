/**
 * Dynamic Deep Link Builder for Major Hotel Booking Platforms
 */

export function buildDeepLinks({ hotelName, cityName, checkIn, checkOut, adults = 2, children = 0, childAges = [] }) {
  // Clean hotel name by removing detailed room descriptions (e.g. "Meant To Be - Comfort Double Room - 1st Floor")
  let cleanName = (hotelName || '').split(' - ')[0].split(' (')[0].trim();
  const searchKeyword = `${cityName || ''} ${cleanName}`.trim();
  const encSearch = encodeURIComponent(searchKeyword);

  // Standardized Date Format: YYYY-MM-DD
  const cin = checkIn || new Date().toISOString().split('T')[0];
  const cout = checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // 1. Agoda Deep Link (Official Search Endpoint: https://www.agoda.com/zh-tw/search?city=... & textToSearch=...)
  // Note: Agoda requires `los` (length of stay) or `checkIn`/`checkOut` alongside `city` or `textToSearch`
  let agodaUrl = `https://www.agoda.com/zh-tw/search?textToSearch=${encSearch}&checkIn=${cin}&checkOut=${cout}&rooms=1&adults=${adults}&children=${children}&pcs=1`;
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
  let tripUrl = `https://tw.trip.com/hotels/list?keyword=${encSearch}&checkIn=${cin}&checkOut=${cout}&Adult=${adults}&Children=${children}`;
  if (children > 0 && childAges.length > 0) {
    tripUrl += `&childAges=${childAges.join(',')}`;
  }

  // 4. Hotels.com Deep Link
  let hotelsComUrl = `https://tw.hotels.com/Hotel-Search?q-destination=${encSearch}&d1=${cin}&d2=${cout}&rooms=1&q-room-0-adults=${adults}`;
  if (children > 0) {
    hotelsComUrl += `&q-room-0-children=${children}`;
    childAges.forEach((age, idx) => {
      hotelsComUrl += `&q-room-0-child-${idx}-age=${age}`;
    });
  }

  return {
    agoda: agodaUrl,
    booking: bookingUrl,
    trip: tripUrl,
    hotelsCom: hotelsComUrl
  };
}
