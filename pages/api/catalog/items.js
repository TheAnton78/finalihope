import pool from '../../../lib/db.js';

export default async function handler(req, res) {
  try {
    const { type } = req.query // или req.body, в зависимости от источника
    if (!type) {
      return res.status(400).json({ error: "Type parameter is required" });
    }
    
    console.log("rjfrjfb" + type); 
  
    const result = await pool.query(
      `SELECT * FROM test.catalog 
       WHERE product_type = $1 
       ORDER BY product_name`, 
       [type]
       // передаём как массив параметров
    );
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database error:", error); // Логируем ошибку для отладки
    res.status(500).json({ error: "Failed to fetch products" });
  }
}