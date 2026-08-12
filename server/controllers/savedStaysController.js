import {
  getSavedStaysFromSQLite,
  addSavedStayToSQLite,
  removeSavedStayFromSQLite,
  clearSavedStaysFromSQLite,
  queryCitiesFromSQLite
} from '../db/sqliteEngine.js';

export function getSavedStays(req, res) {
  try {
    const data = getSavedStaysFromSQLite();
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export function saveStay(req, res) {
  try {
    const item = req.body;
    const ok = addSavedStayToSQLite(item);
    if (ok) {
      return res.json({ success: true, message: 'Saved to SQLite' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid item' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export function deleteSavedStay(req, res) {
  try {
    const { id } = req.params;
    const ok = removeSavedStayFromSQLite(id);
    return res.json({ success: ok });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export function clearSavedStays(req, res) {
  try {
    const ok = clearSavedStaysFromSQLite();
    return res.json({ success: ok });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export function getCities(req, res) {
  try {
    const { q = '' } = req.query;
    const data = queryCitiesFromSQLite(q);
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
