import pool from '../../../lib/db.js';

export default async function handler(req, res) {
  try {
    const { article } = req.query;
    if (!article) {
      return res.status(400).json({ error: "Article parameter is required" });
    }

    const result = await pool.query(
      `SELECT * FROM test.catalog 
       WHERE article = $1 
       ORDER BY article`, 
      [article]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(result.rows[0]); // ✅ Возвращаем один объект
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
