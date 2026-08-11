/**
 * Safely format provider deep-link URLs with checkIn, checkOut, adults, children
 */
export function buildProviderDeepLinks(stay, query, normCityName) {
  const {
    checkIn = '2026-08-10',
    checkOut = '2026-08-12',
    adults = 2,
    children = 1
  } = query;

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffNights = Math.max(1, Math.round((d2 - d1) / (1000 * 3600 * 24))) || 2;

  const rawName = stay.name || '';
  const engMatch = rawName.match(/\(([^)]+)\)/);
  const cleanKw = engMatch ? engMatch[1].trim() : rawName.replace(/\(.*?\)/g, '').replace(/【.*?】/g, '').trim();
  const encodedKw = encodeURIComponent(cleanKw || normCityName);

  return (stay.providers || []).map(p => {
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

    return { ...p, url: targetUrl };
  });
}
