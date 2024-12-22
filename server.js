// src/News.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]); // State to store news articles
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to store any error

  // Fetch news from backend when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news'); // Backend API URL
        setNews(response.data); // Set the fetched news data
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        setError('Error fetching news. Please try again later.'); // Handle errors
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty array means this effect runs only once, when the component mounts

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Display the news articles
  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
 