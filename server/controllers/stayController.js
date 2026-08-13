import { searchHotelsService } from '../services/hotelService.js';

export async function searchStays(req, res) {
  try {
    const { city, keyword, minPrice, maxPrice, sortBy, checkIn, checkOut, adults, children, childAges } = req.query;
    const agesArr = childAges ? String(childAges).split(',').map(n => parseInt(n, 10)) : [];

    const hotels = await searchHotelsService({
      city,
      keyword,
      minPrice,
      maxPrice,
      sortBy,
      checkIn,
      checkOut,
      adults: adults ? parseInt(adults, 10) : 2,
      children: children ? parseInt(children, 10) : 0,
      childAges: agesArr
    });

    res.json({ success: true, count: hotels.length, data: hotels });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
