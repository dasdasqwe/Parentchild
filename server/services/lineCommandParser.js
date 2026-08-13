/**
 * Parse LINE User Input Command text into structured intent
 */

export function parseLineCommand(text) {
  if (!text || typeof text !== 'string') {
    return { type: 'UNKNOWN' };
  }

  const trimmed = text.trim();

  // 1. Help Command
  if (/^(幫助|help|\?|說明)$/i.test(trimmed)) {
    return { type: 'HELP' };
  }

  // 2. Home Command
  if (/^(首頁|home|官網|主頁)$/i.test(trimmed)) {
    return { type: 'HOME' };
  }

  // 3. Hotel Search: 「搜尋飯店 宜蘭 [預算]」 or 「飯店 台北」
  const hotelMatch = trimmed.match(/^(?:搜尋飯店|飯店|住宿)\s+([^\s]+)(?:\s+(\d+))?/);
  if (hotelMatch) {
    return {
      type: 'SEARCH_HOTELS',
      city: hotelMatch[1],
      maxPrice: hotelMatch[2] ? parseInt(hotelMatch[2], 10) : null
    };
  }

  // 4. Hotel Compare: 「比價 蘭城晶英」
  const compareMatch = trimmed.match(/^(?:比價|查價)\s+(.+)/);
  if (compareMatch) {
    return {
      type: 'COMPARE_HOTEL',
      hotelName: compareMatch[1]
    };
  }

  // 5. Hotel Booking Deep Link: 「訂房 蘭城晶英 0815-0817 2大2小」
  const bookingMatch = trimmed.match(/^(?:訂房|預約)\s+([^\s]+)(?:\s+(\d{4}-\d{2}-\d{2}|\d{4}))?(?:\s+(\d+)大(\d+)小)?/);
  if (bookingMatch) {
    return {
      type: 'BOOK_HOTEL',
      hotelName: bookingMatch[1],
      dates: bookingMatch[2] || '',
      adults: bookingMatch[3] ? parseInt(bookingMatch[3], 10) : 2,
      children: bookingMatch[4] ? parseInt(bookingMatch[4], 10) : 0
    };
  }

  // 6. Family Attraction Search: 「親子景點 台北」 or 「景點 宜蘭」
  const attrMatch = trimmed.match(/^(?:親子景點|景點)\s+(.+)/);
  if (attrMatch) {
    return {
      type: 'SEARCH_ATTRACTIONS',
      city: attrMatch[1]
    };
  }

  // 7. Family Show Search: 「親子表演 台北」 or 「表演 宜蘭」
  const showMatch = trimmed.match(/^(?:親子表演|表演|劇場)\s+(.+)/);
  if (showMatch) {
    return {
      type: 'SEARCH_SHOWS',
      city: showMatch[1]
    };
  }

  // 8. Exhibition Search: 「展覽 台中」
  const expoMatch = trimmed.match(/^展覽\s+(.+)/);
  if (expoMatch) {
    return {
      type: 'SEARCH_EXHIBITIONS',
      city: expoMatch[1]
    };
  }

  // 9. My Itinerary: 「我的行程」
  if (/^我的行程$/.test(trimmed)) {
    return { type: 'MY_ITINERARY' };
  }

  // 10. Fallback: Fuzzy search hotel
  return {
    type: 'FUZZY_SEARCH',
    query: trimmed
  };
}
