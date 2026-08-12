import { 
  queryPackagesFromSQLite, 
  queryAttractionsFromSQLite, 
  queryShowsFromSQLite 
} from '../db/sqliteEngine.js';

export function getTourPackages(req, res) {
  try {
    const { q = '' } = req.query;
    const data = queryPackagesFromSQLite(q);
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export function getFamilyAttractions(req, res) {
  try {
    const { q = '' } = req.query;
    const data = queryAttractionsFromSQLite(q);
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export function getFamilyShows(req, res) {
  try {
    const { q = '' } = req.query;
    const data = queryShowsFromSQLite(q);
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
