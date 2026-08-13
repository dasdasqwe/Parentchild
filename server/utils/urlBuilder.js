/**
 * Dynamic Deep Link Builder for Major Hotel Booking Platforms
 */

export function buildDeepLinks({ hotelName, cityName, checkIn, checkOut, adults = 2, children = 0, childAges = [] }) {
  const encHotel = encodeURIComponent(hotelName);
  const encCity = encodeURIComponent(cityName || '');
  const encHotelCity = encodeURIComponent(`${cityName || ''} ${hotelName}`);

  // Standardized Date Format: YYYY-MM-DD
  const cin = checkIn || new Date().toISOString().split('T')[0];
  const cout = checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // 1. Agoda Deep Link
  // Parameters: textToSearch, checkIn, checkOut, rooms, adults, children, childages
  let agodaUrl = `https://www.agoda.com/search?textToSearch=${encHotelCity}&checkIn=${cin}&checkOut=${cout}&rooms=1&adults=${adults}&children=${children}`;
  if (children > 0 && childAges.length > 0) {
    agodaUrl += `&childages=${childAges.join(',')}`;
  }

  // 2. Booking.com Deep Link
  // Parameters: ss, checkin, checkout, group_adults, group_children, no_rooms=1
  let bookingUrl = `https://www.booking.com/searchresults.zh-tw.html?ss=${encHotelCity}&checkin=${cin}&checkout=${cout}&group_adults=${adults}&group_children=${children}&no_rooms=1`;
  if (children > 0 && childAges.length > 0) {
    childAges.forEach(age => {
      bookingUrl += `&age=${age}`;
    });
  }

  // 3. Trip.com Deep Link
  // Parameters: keyword, checkIn, checkOut, Adult, Children, childAges
  let tripUrl = `https://tw.trip.com/hotels/list?keyword=${encHotelCity}&checkIn=${cin}&checkOut=${cout}&Adult=${adults}&Children=${children}`;
  if (children > 0 && childAges.length > 0) {
    tripUrl += `&childAges=${childAges.join(',')}`;
  }

  // 4. Hotels.com Deep Link
  // Parameters: q, d1 (checkin YYYY-MM-DD), d2 (checkout YYYY-MM-DD), rooms=1, adults
  let hotelsComUrl = `https://tw.hotels.com/Hotel-Search?q-destination=${encHotelCity}&d1=${cin}&d2=${cout}&rooms=1&q-room-0-adults=${adults}`;
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
