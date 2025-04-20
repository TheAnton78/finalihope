const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cnk',
  password: process.env.DB_PASSWORD || '12345678',
  port: process.env.DB_PORT || 5432,
  
  charset: 'utf8'
});

// Добавляем функцию для удобства запросов
pool.queryAsync = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};

module.exports = pool;

