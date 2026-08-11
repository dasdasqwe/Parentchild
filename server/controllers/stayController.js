import { searchGlobalHotels } from '../services/hotelService.js';

export async function getStays(req, res) {
  try {
    const {
      destination = '',
      cityId = '',
      type = 'all',
      maxPrice = 10000,
      sort = 'price_asc',
      page = 1,
      pageSize = 12,
      checkIn,
      checkOut,
      adults = 2,
      children = 1
    } = req.query;

    const targetDest = destination || cityId || '';

    const result = await searchGlobalHotels({
      destination: targetDest,
      type,
      maxPrice: Number(maxPrice),
      sort,
      page: Number(page),
      pageSize: Number(pageSize),
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children)
    });

    return res.json(result);
  } catch (err) {
    console.error('Stay Search Error:', err);
    return res.status(500).json({
      success: false,
      message: '抓取飯店數據失敗',
      error: err.message
    });
  }
}
