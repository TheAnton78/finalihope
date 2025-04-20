"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../styles/Catalog.module.css';

export default function Catalog() {
  // Явно заданные категории с изображениями
  const categories = [
    { 
      id: 'truck-oil',
      title: 'Масла для коммерческого транспорта', 
      image: '/truck-oil.jpg' 
    },
    { 
      id: 'car-oil',
      title: 'Масла для легкового транспорта', 
      image: '/car-oil.jpg' 
    },
    { 
      id: 'gas-engine-oil',
      title: 'Масла для газовых двигателей', 
      image: '/gas-engine-oil.jpg' 
    },
    { 
      id: 'moto-oil',
      title: 'Мотомасла', 
      image: '/moto-oil.jpg' 
    },
    { 
      id: 'gost-oil',
      title: 'Масла ГОСТ', 
      image: '/gost-oil.jpg' 
    },
    { 
      id: 'industrial-oil',
      title: 'Индустриальные масла', 
      image: '/industrial-oil.jpg' 
    },
    { 
      id: 'transmission-oil',
      title: 'Трансмиссионные масла', 
      image: '/transmission-oil.jpg' 
    },
    { 
      id: 'technical-oil',
      title: 'Технические масла', 
      image: '/technical-oil.jpg' 
    }
  ];

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [error, setError] = useState(null);
  const itemsPerPage = 12;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    // Формируем URL вида /catalog/[article]
    router.push(`/catalog/${encodeURIComponent(product.article)}`);
  };

  const normalizeProduct = (product) => ({
    ...product,
    product_name: product.product_name || 'Без названия',
    article: product.article || 'N/A',
    packing: product.packing || 'Не указана',
    classabc: product.classabc || '',
    path_to_image: product.path_to_image || 'placeholder.jpg'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;
      
      try {
        setIsLoading(true);
        setError(null);
       
        const response = await fetch(`/api/catalog/items?type=${encodeURIComponent(selectedCategory)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Ожидался JSON, получили: ${contentType}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Ожидался массив товаров');
        }
        
        setProducts(data.map(normalizeProduct));
        setCurrentPage(1);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(`Ошибка загрузки товаров: ${err.message}`);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.product_name.toLowerCase().includes(searchLower) ||
      product.article.toLowerCase().includes(searchLower)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'name-asc': return a.product_name.localeCompare(b.product_name);
      case 'name-desc': return b.product_name.localeCompare(a.product_name);
      case 'article-asc': return a.article.localeCompare(b.article);
      case 'article-desc': return b.article.localeCompare(a.article);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleImageError = (e) => {
    e.target.src = '/images/catalog/placeholder.jpg';
    e.target.onerror = null;
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setProducts([]);
    setSearchTerm('');
    setCurrentPage(1);
  };
  

  return (
    <div className={styles.container}>
    <div style={{ marginBottom: '20px' }}>
      <button 
        onClick={() => router.push('/')} 
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#ff0000', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        ⬅ На главную
      </button>
    </div>{error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeError}>
            ×
          </button>
        </div>
      )}
      
      
      
      {selectedCategory ? (
        <>
          <div className={styles.searchSortContainer}>
            <button 
              onClick={handleBackToCategories}
              className={styles.backButton}
            >
              ← Назад к категориям
            </button>
            
            <input
              type="text"
              placeholder="Поиск по названию или артикулу"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              disabled={isLoading}
            />
            
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={styles.sortSelect}
              disabled={isLoading || products.length === 0}
            >
              <option value="name-asc">По названию (А-Я)</option>
              <option value="name-desc">По названию (Я-А)</option>
              <option value="article-asc">По артикулу (А-Я)</option>
              <option value="article-desc">По артикулу (Я-А)</option>
            </select>
          </div>

          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              Загрузка...
            </div>
          ) : (
            <>
              <h1 className={styles.categoryTitle}>
                {categories.find(c => c.id === selectedCategory)?.title}
              </h1>
              
              <div className={styles.products}>
        {currentItems.length > 0 ? (
          currentItems.map(product => (
            <div 
              key={product.article} 
              className={styles.productCard}
              onClick={() => handleProductClick(product)}
            >
              <div className={styles.productImageContainer}>
                <img 
                  src={`/images/catalog/${product.path_to_image}`} 
                  alt={product.product_name}
                  className={styles.productImage}
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              <h3 className={styles.productTitle}>{product.product_name}</h3>
              <p className={styles.productArticle}>{product.article}</p>
            </div>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    {searchTerm ? 'Ничего не найдено по вашему запросу' : 'Нет товаров в этой категории'}
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button 
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Назад
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = index + 1;
                    } else if (currentPage <= 3) {
                      pageNum = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + index;
                    } else {
                      pageNum = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={currentPage === pageNum ? styles.activePage : ''}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Вперед
                  </button>
                  <button 
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <section style={{ 
          backgroundColor: "white", 
          padding: "50px 0", 
          marginTop: "0px" 
        }}>
          <h2 style={{ 
            textAlign: "center", 
            fontSize: "36px", 
            color: "black", 
            marginBottom: "36px" 
          }}>
            Каталог продукции
          </h2>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "30px", 
            maxWidth: "1200px", 
            margin: "0 auto",
            padding: "0 20px"
          }}>
            {categories.map((category, index) => (
              <div 
                key={index} 
                style={{ 
                  textAlign: "center", 
                  position: "relative", 
                  maxWidth: "350px", 
                  margin: "0 auto",
                  cursor: "pointer"
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <p style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "black"
                }}>
                  {category.title}
                </p>

                <div style={{
                  position: "relative",
                  display: "inline-block",
                  border: "3px solid red",
                  borderRadius: "5px",
                  overflow: "hidden",
                  width: "350px",
                  height: "220px"
                }}>
                  <Image 
                    src={category.image} 
                    alt={category.title} 
                    width={350} 
                    height={220} 
                    style={{ objectFit: "cover" }}
                  />
                  
                  <div style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "rgba(255, 0, 0, 0.8)",
                    color: "white",
                    textAlign: "center",
                    padding: "5px 0",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}>
                    {category.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

