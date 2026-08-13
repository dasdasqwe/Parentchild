import db from '../db/sqliteEngine.js';

export function createItinerary(req, res) {
  try {
    const { title, items } = req.body;
    const shareCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const now = Date.now();
    const itemsJson = JSON.stringify(items || []);

    const stmt = db.prepare(`
      INSERT INTO itineraries (share_code, title, items_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(shareCode, title || '我的親子渡假行程', itemsJson, now, now);

    res.json({ success: true, shareCode, id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export function getItinerary(req, res) {
  try {
    const { shareCode } = req.params;
    const item = db.prepare(`SELECT * FROM itineraries WHERE share_code = ?`).get(shareCode);
    if (!item) {
      return res.status(404).json({ success: false, message: '找不到此行程' });
    }
    res.json({
      success: true,
      data: {
        ...item,
        items: JSON.parse(item.items_json || '[]')
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
