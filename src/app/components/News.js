"use client"; // Директива для Next.js

import { useEffect, useState } from "react";
import Image from "next/image";

const API_KEY = "f70cdc7393b9478b90a715a5a7c336de"; // Замени на свой API-ключ NewsAPI
const IMAGE_API_KEY = "g55WzqgdzFl4l7lAuYgvO5PpPKgxXafT8G_fomWZ1YA"; // Замени на свой API-ключ Unsplash

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        console.log("🔍 Отправка запроса на NewsAPI...");

        const response = await fetch(
          `https://newsapi.org/v2/everything?q=нефть OR газ OR топливо OR энергетика&language=ru&sortBy=publishedAt&apiKey=${API_KEY}`
        );
        const data = await response.json();
        console.log("📩 Ответ от NewsAPI:", data);

        if (data.status === "ok" && data.articles.length > 0) {
          const formattedNews = await Promise.all(
            data.articles.slice(0, 4).map(async (article) => {
              const imageResponse = await fetch(
                'https://api.unsplash.com/photos/random?query=oil+industry', {
                 headers: {
                  Authorization: 'Client-ID g55WzqgdzFl4l7lAuYgvO5PpPKgxXafT8G_fomWZ1YA',
                },}
              );
              const imageData = await imageResponse.json();
              return {
                title: article.title,
                description: article.description,
                date: new Date(article.publishedAt).toLocaleDateString(),
                url: article.url,
                imageUrl: imageData.urls?.small || article.urlToImage || "/default-news.jpg",
              };
            })
          );
          setNews(formattedNews);
        } else {
          setError("Новости не найдены.");
        }
      } catch (err) {
        console.error("❌ Ошибка загрузки новостей:", err);
        setError("Ошибка загрузки новостей.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <section style={{ backgroundColor: "white", padding: "50px 20px", marginTop: "50px" }}>
      <h2 style={{ textAlign: "center", fontSize: "36px", color: "black", marginBottom: "30px" }}>
        Новости
      </h2>

      {loading ? (
        <p style={{ textAlign: "center", color: "#666" }}>Загрузка новостей...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px"
        }}>
          {news.map((item, index) => (
            <div key={index} style={{
              backgroundColor: "#f8f8f8",
              padding: "15px",
              borderRadius: "5px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
            }}>
              <Image src={item.imageUrl} alt={item.title} width={350} height={200} objectFit="cover" />
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>{item.date}</p>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "black" }}>
                  {item.title}
                </a>
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>{item.description?.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
