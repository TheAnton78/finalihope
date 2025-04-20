// pages/api/test-db.js
const db = require('cnk/lib/db');

export default async function handler(req, res) {
  try {
    const result = await db.query('SELECT * FROM catalog LIMIT 5');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ 
      error: 'DB connection failed',
      details: error.message 
    });
  }
}