import db from '../db/sqliteEngine.js';
import { buildDeepLinks } from '../utils/urlBuilder.js';
import axios from 'axios';

const SERPAPI_KEY = process.env.SERPAPI_KEY;

export async function searchHotelsService({
  city,
  keyword,
  minPrice,
  maxPrice,
  sortBy = 'composite', // composite | price_asc | price_desc | rating
  checkIn,
  checkOut,
  adults = 2,
  children = 0,
  childAges = []
}) {
  let serpHotels = [];

  // If SerpAPI Key is provided and city/keyword search is requested, fetch real-time Google Hotels API
  if (SERPAPI_KEY && (city || keyword)) {
    try {
      const searchQuery = `${city || ''} ${keyword || ''} 親子飯店`.trim();
      const serpUrl = `https://serpapi.com/search.json?engine=google_hotels&q=${encodeURIComponent(searchQuery)}&check_in_date=${checkIn || ''}&check_out_date=${checkOut || ''}&adults=${adults}&currency=TWD&gl=tw&hl=zh-tw&api_key=${SERPAPI_KEY}`;
      
      const serpRes = await axios.get(serpUrl, { timeout: 4000 });
      if (serpRes.data && serpRes.data.properties) {
        serpHotels = serpRes.data.properties.map((p, idx) => {
          const basePrice = p.rate_per_night?.extracted_before_taxes || p.rate_per_night?.extracted_lowest || 3800;
          const hotelName = p.name || '精選親子飯店';
          const cityName = city || '台灣';

          return {
            id: `serp_${idx}_${Date.now()}`,
            hotel_key: `serp_${idx}`,
            name_zh: hotelName,
            name_en: p.name || 'Hotel',
            city_name: cityName,
            address: p.description || `${cityName}精選地區`,
            description: p.overall_rating ? `Google 評價 ${p.overall_rating} 分。${p.description || '深受親子家庭喜愛的熱門住宿選擇。'}` : '舒適的親子友善住宿。',
            rating: p.overall_rating || 4.7,
            reviews_count: p.reviews || 850,
            hotel_class: p.hotel_class ? parseInt(p.hotel_class, 10) : 4,
            base_price: basePrice,
            image_url: p.images?.[0]?.original_image || p.featured_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
            amenities: p.amenities || ['親子友善', '免費WiFi', '熱門推薦'],
            keywords: `${cityName} ${hotelName}`,
            platforms: [
              { name: 'Agoda', price: Math.round(basePrice * 0.95), isLowest: true },
              { name: 'Booking.com', price: Math.round(basePrice * 1.02), isLowest: false },
              { name: 'Trip.com', price: Math.round(basePrice * 0.98), isLowest: false },
              { name: 'Hotels.com', price: Math.round(basePrice * 1.05), isLowest: false }
            ],
            lowestPrice: Math.round(basePrice * 0.95),
            deepLinks: buildDeepLinks({
              hotelName,
              cityName,
              checkIn,
              checkOut,
              adults,
              children,
              childAges
            })
          };
        });
      }
    } catch (err) {
      console.log('[SerpAPI] Fallback to SQLite Database:', err.message);
    }
  }

  // Query Local Database as Primary / Fallback Engine
  let sql = `SELECT * FROM hotels WHERE 1=1`;
  const params = [];

  if (city) {
    sql += ` AND (city_name LIKE ? OR address LIKE ?)`;
    params.push(`%${city}%`, `%${city}%`);
  }

  if (keyword) {
    sql += ` AND (name_zh LIKE ? OR name_en LIKE ? OR keywords LIKE ?)`;
    params.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }

  if (minPrice) {
    sql += ` AND base_price >= ?`;
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    sql += ` AND base_price <= ?`;
    params.push(Number(maxPrice));
  }

  let rows = db.prepare(sql).all(...params);

  // Combine SerpAPI real-time live results + Local DB results (deduplicated)
  let dbHotels = rows.map(h => {
    let amenities = [];
    try {
      amenities = JSON.parse(h.amenities || '[]');
    } catch (e) {
      amenities = [];
    }

    const basePrice = h.base_price;
    const platforms = [
      { name: 'Agoda', price: Math.round(basePrice * 0.95), isLowest: true },
      { name: 'Booking.com', price: Math.round(basePrice * 1.02), isLowest: false },
      { name: 'Trip.com', price: Math.round(basePrice * 0.98), isLowest: false },
      { name: 'Hotels.com', price: Math.round(basePrice * 1.05), isLowest: false }
    ];

    const deepLinks = buildDeepLinks({
      hotelName: h.name_zh,
      cityName: h.city_name,
      checkIn,
      checkOut,
      adults,
      children,
      childAges
    });

    return {
      ...h,
      amenities,
      platforms,
      lowestPrice: Math.round(basePrice * 0.95),
      deepLinks
    };
  });

  let combined = [...serpHotels, ...dbHotels];

  // Deduplicate by name
  const seen = new Set();
  let hotels = combined.filter(item => {
    if (seen.has(item.name_zh)) return false;
    seen.add(item.name_zh);
    return true;
  });

  // If search returned empty (e.g. searching a rare town without API response), auto fallback to all DB hotels
  if (hotels.length === 0) {
    hotels = dbHotels;
  }

  // Apply Sorting Logic
  if (sortBy === 'price_asc') {
    hotels.sort((a, b) => a.lowestPrice - b.lowestPrice);
  } else if (sortBy === 'price_desc') {
    hotels.sort((a, b) => b.lowestPrice - a.lowestPrice);
  } else if (sortBy === 'rating') {
    hotels.sort((a, b) => b.rating - a.rating);
  } else {
    hotels.sort((a, b) => {
      const scoreA = (a.rating * 1000) - (a.lowestPrice * 0.1);
      const scoreB = (b.rating * 1000) - (b.lowestPrice * 0.1);
      return scoreB - scoreA;
    });
  }

  return hotels;
}
