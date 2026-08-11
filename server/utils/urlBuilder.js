/**
 * Format provider deep-link URLs with checkIn, checkOut, adults, children for Agoda, Booking.com, and Trip.com
 */
export function buildProviderDeepLinks(stay = {}, query = {}, normCityName = '') {
  const checkIn = (query && query.checkIn) || stay.checkIn || '2026-08-11';
  const checkOut = (query && query.checkOut) || stay.checkOut || '2026-08-13';
  const adults = (query && query.adults) || stay.adults || 2;
  const children = (query && query.children) || stay.children || 1;

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffNights = Math.max(1, Math.round((d2 - d1) / (1000 * 3600 * 24))) || 2;

  const rawName = stay.hotelName || stay.name || '';
  const engMatch = rawName.match(/\(([^)]+)\)/);
  const cleanKw = engMatch ? engMatch[1].trim() : rawName.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
  const encodedKw = encodeURIComponent(cleanKw || stay.cityName || normCityName || 'hotel');

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
      if (targetUrl.includes('/hotel/') || targetUrl.includes('.html')) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&group_children=${children}&sb=1`;
      } else {
        targetUrl = `https://www.booking.com/searchresults.zh-tw.html?ss=${encodedKw}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&group_children=${children}&sb=1&src=search_results&dest_type=city`;
      }
    } else if (pName.includes('agoda')) {
      if (targetUrl.includes('/hotel/') || targetUrl.includes('.html')) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      } else {
        targetUrl = `https://www.agoda.com/zh-tw/search?kw=${encodedKw}&checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      }
    } else if (pName.includes('trip')) {
      const sep = targetUrl.includes('?') ? '&' : '?';
      targetUrl = `${targetUrl}${sep}keyword=${encodedKw}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`;
    } else {
      if (targetUrl.includes('/hotel/') || targetUrl.includes('.html')) {
        const sep = targetUrl.includes('?') ? '&' : '?';
        targetUrl = `${targetUrl}${sep}checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      } else {
        targetUrl = `https://www.agoda.com/zh-tw/search?kw=${encodedKw}&checkin=${checkIn}&checkout=${checkOut}&checkIn=${checkIn}&checkOut=${checkOut}&los=${diffNights}&adults=${adults}&children=${children}&childAges=6&rooms=1`;
      }
    }

    return {
      ...p,
      url: targetUrl
    };
  });
}
