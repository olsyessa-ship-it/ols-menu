const { put, list, head } = require('@vercel/blob');

const PIN = process.env.OWNER_PIN || '126019';
const BLOB_KEY = 'ols-menu.json';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-pin');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      // جلب البيانات
      const { blobs } = await list({ prefix: BLOB_KEY });
      if (!blobs.length) return res.json({ categories: [], allergens: {}, items: [] });

      const response = await fetch(blobs[0].url);
      const data = await response.json();

      const isAdmin = req.headers['x-pin'] === PIN;
      if (isAdmin) return res.json(data);

      // عام — فلتر المخفي
      return res.json({
        categories: data.categories,
        allergens: data.allergens,
        items: (data.items || []).filter(i => i.available !== false)
      });
    }

    if (req.method === 'PUT') {
      if (req.headers['x-pin'] !== PIN) return res.status(403).json({ error: 'denied' });

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      await put(BLOB_KEY, JSON.stringify(body), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false
      });
      return res.json({ ok: true });
    }

    res.status(405).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
