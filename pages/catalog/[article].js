import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../../src/app/styles/Catalog.module.css';

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
  fullName: '',
  contact: '',
  quantity: 1
  });

  const { article } = router.query;

  useEffect(() => {
    if (!router.isReady || !article) return;

    const fetchProductData = async () => {
      try {
        console.log('Fetching product for article:', article);

        const response = await fetch(`/api/catalog/item?article=${article}`);
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Полученные данные:', data);

        if (data.error) {
          throw new Error(data.error);
        }

        setProduct(data);
      } catch (err) {
        console.error('Ошибка при получении товара:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [router.isReady, article]);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Ошибка: {error}</p>
        <button onClick={() => router.push('/catalog')} className={styles.backButton}>
          Вернуться в каталог
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className={styles.noResults}>Товар не найден</div>;
  }

  return (
    <div className={styles.productPageContainer}>
      <button onClick={() => router.back()} className={styles.backButton}>
        ← Вернуться в каталог
      </button>

      <div className={styles.productDetails}>
        <div className={styles.productImageContainer}>
          <img 
            src={
              product.path_to_image 
                ? `/images/catalog/${product.path_to_image}` 
                : '/images/catalog/bochka-devon-b.jpg'
            }
            alt={product.product_name || 'Изображение недоступно'}
            className={styles.productImage}
          />
        </div>

        <div className={styles.productInfo}>
          <h1>{product.product_name}</h1>
          <p><strong>Артикул:</strong> {product.article}</p>
          <p><strong>Упаковка:</strong> {product.packing}</p>
          {product.classabc && <p><strong>Класс ABC:</strong> {product.classabc}</p>}
          {product.correspondence && <p><strong>Соответствие:</strong> {product.correspondence}</p>}
          {product.prepayment && <p><strong>Предоплата:</strong> {product.prepayment}</p>}
          {product.deferment && <p><strong>Отсрочка:</strong> {product.deferment}</p>}
          
          
          <button 
    className={styles.orderButton} 
    onClick={() => setShowOrderForm(!showOrderForm)}
    style={{ marginTop: '10px' }}
  >
    Сделать заказ
  </button>

  {showOrderForm && (
    <div className={styles.orderForm} style={{ marginTop: '20px' }}>
      <label>
        ФИО:
        <input 
          type="text" 
          value={formData.fullName} 
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
      </label>

      <label>
        Способ связи:
        <input 
          type="text" 
          value={formData.contact} 
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />
      </label>

      <label>
        Количество:
        <input 
          type="number" 
          min="1"
          value={formData.quantity} 
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
      </label>

      <button 
  onClick={() => {
    // Здесь можно будет отправить данные на сервер или вывести в консоль
    alert(`Заказ отправлен:\nФИО: ${formData.fullName}\nКонтакт: ${formData.contact}\nКоличество: ${formData.quantity}`);
    
    // Очистка формы
    setFormData({
      fullName: '',
      contact: '',
      quantity: 1
    });
    
    // Скрытие формы
    setShowOrderForm(false);
  }}
  className={styles.confirmOrderButton}
  style={{ marginTop: '10px' }}
>
  Отправить заказ
</button>

    </div>
  )}

        </div>
      </div>
    </div>
  );
}
