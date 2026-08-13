import db from '../db/sqliteEngine.js';

export function getAttractions(req, res) {
  try {
    const { city, category } = req.query;
    let sql = `SELECT * FROM family_attractions WHERE 1=1`;
    const params = [];
    if (city) {
      sql += ` AND city_name LIKE ?`;
      params.push(`%${city}%`);
    }
    if (category) {
      sql += ` AND category = ?`;
      params.push(category);
    }
    const data = db.prepare(sql).all(...params);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export function getShows(req, res) {
  try {
    const { city } = req.query;
    let sql = `SELECT * FROM family_shows_galleries WHERE 1=1`;
    const params = [];
    if (city) {
      sql += ` AND (city_name LIKE ? OR venue LIKE ?)`;
      params.push(`%${city}%`, `%${city}%`);
    }
    const data = db.prepare(sql).all(...params);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
