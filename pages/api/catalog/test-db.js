const db = require('CNK/cnk/lib/db'); // Путь к вашему db.js

async function testConnection() {
  try {
    const result = await db.query('SELECT NOW() as current_time');
    console.log('✅ Подключение успешно. Текущее время в БД:', result.rows[0].current_time);
    
    const products = await db.query('SELECT * FROM catalog LIMIT 3');
    console.log('📦 Пример товаров:', products.rows);
    
  } catch (error) {
    console.error('❌ Ошибка подключения:', error);
  }
}

testConnection();