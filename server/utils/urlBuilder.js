/**
 * Format provider deep-link URLs with checkIn, checkOut, adults, children for Agoda, Booking.com, and Trip.com
 * Ensures absolute HTTPS URLs so clicks never return to local SPA route.
 */
export function buildProviderDeepLinks(stay = {}, query = {}, normCityName = '') {
  const checkIn = (query && query.checkIn) || stay.checkIn || '2026-08-12';
  const checkOut = (query && query.checkOut) || stay.checkOut || '2026-08-14';
  const adults = (query && query.adults) || stay.adults || 2;
  const children = (query && query.children) || stay.children || 1;

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffNights = Math.max(1, Math.round((d2 - d1) / (1000 * 3600 * 24))) || 2;

  const rawName = stay.hotelName || stay.name || stay.cityName || normCityName || '飯店';
  const fullHotelKw = encodeURIComponent(rawName);

  const basePrice = stay.price || stay.basePrice || 3200;

  const inputProviders = (stay.providers && stay.providers.length > 0) ? stay.providers : [
    { name: 'Agoda', price: basePrice, url: '', isLowest: true },
    { name: 'Booking.com', price: Math.round(basePrice * 1.05), url: '' },
    { name: 'Trip.com', price: Math.round(basePrice * 1.08), url: '' }
  ];

  return inputProviders.map(p => {
    let targetUrl = p.url || '';
    const pName = (p.name || '').toLowerCase();

    if (pName.includes('booking')) {
      if (targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}ss=${fullHotelKw}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&group_children=${children}&sb=1`;
      } else {
        targetUrl = `https://www.booking.com/searchresults.zh-tw.html?ss=${fullHotelKw}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&group_children=${children}&sb=1&src=search_results`;
      }
    } else if (pName.includes('agoda')) {
      if (targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}text=${fullHotelKw}&kw=${fullHotelKw}&checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      } else {
        targetUrl = `https://www.agoda.com/zh-tw/search?text=${fullHotelKw}&kw=${fullHotelKw}&checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      }
    } else if (pName.includes('trip')) {
      if (targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}keyword=${fullHotelKw}&checkIn=${checkIn}&checkOut=${checkOut}&adult=${adults}&children=${children}`;
      } else {
        targetUrl = `https://tw.trip.com/hotels/list?keyword=${fullHotelKw}&checkIn=${checkIn}&checkOut=${checkOut}&adult=${adults}&children=${children}`;
      }
    } else {
      if (targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}text=${fullHotelKw}&kw=${fullHotelKw}&checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      } else {
        targetUrl = `https://www.agoda.com/zh-tw/search?text=${fullHotelKw}&kw=${fullHotelKw}&checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      }
    }

    return {
      ...p,
      url: targetUrl
    };
  });
}
