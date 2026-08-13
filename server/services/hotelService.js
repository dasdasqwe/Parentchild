import db from '../db/sqliteEngine.js';
import { buildDeepLinks } from '../utils/urlBuilder.js';
import axios from 'axios';

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
  // Query Local Database first
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

  // Parse amenities & calculate dynamic platform pricing
  let hotels = rows.map(h => {
    let amenities = [];
    try {
      amenities = JSON.parse(h.amenities || '[]');
    } catch (e) {
      amenities = [];
    }

    const basePrice = h.base_price;

    // Platform pricing mock variation
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

    // Record price history in background
    try {
      db.prepare(`
        INSERT INTO price_history (hotel_key, provider_name, price, check_in_date, check_out_date, query_timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(h.hotel_key, 'Agoda', Math.round(basePrice * 0.95), checkIn || '', checkOut || '', Date.now());
    } catch (err) {
      // Non-blocking
    }

    return {
      ...h,
      amenities,
      platforms,
      lowestPrice: Math.round(basePrice * 0.95),
      deepLinks
    };
  });

  // Apply Sorting Logic
  if (sortBy === 'price_asc') {
    hotels.sort((a, b) => a.lowestPrice - b.lowestPrice);
  } else if (sortBy === 'price_desc') {
    hotels.sort((a, b) => b.lowestPrice - a.lowestPrice);
  } else if (sortBy === 'rating') {
    hotels.sort((a, b) => b.rating - a.rating);
  } else {
    // Composite Sort: Score = Rating * 1000 - (Price * 0.1)
    hotels.sort((a, b) => {
      const scoreA = (a.rating * 1000) - (a.lowestPrice * 0.1);
      const scoreB = (b.rating * 1000) - (b.lowestPrice * 0.1);
      return scoreB - scoreA;
    });
  }

  return hotels;
}
