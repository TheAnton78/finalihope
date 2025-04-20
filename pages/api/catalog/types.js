// pages/api/catalog/types.mjs
import pool from '../../../lib/db.js';

export default async function handler(req, res) {
    try {
        const result = await pool.query('SELECT DISTINCT product_type FROM test.catalog');
        console.log(result.rows); // Выводим в консоль для отладки
        const types = result.rows.map((row, index) => ({
            id: index + 1, // Добавляем уникальный id
            product_type: row.product_type
          }));
          res.json(types);
        res.status(200).json(types);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка получения типов');
    }
}
