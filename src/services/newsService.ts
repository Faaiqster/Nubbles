import { NewsItem } from '../types';
import { summarizeText } from './summaryService';

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

const transformNewsData = async (article: any): Promise<NewsItem> => {
  const summary = await summarizeText(article.content || article.description || article.title);
  
  return {
    id: article.url,
    title: article.title,
    summary,
    category: article.source.name,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
    isBreaking: Date.now() - new Date(article.publishedAt).getTime() < 3600000,
    trending: null,
  };
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    if (!API_KEY) {
      throw new Error('GNews API key is not configured');
    }

    const response = await fetch(
      `${BASE_URL}/top-headlines?category=technology&lang=en&max=10&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0] || 'Failed to fetch news');
    }

    const data = await response.json();
    return await Promise.all(data.articles.map(transformNewsData));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const searchNews = async (keyword: string): Promise<NewsItem[]> => {
  try {
    if (!API_KEY) {
      throw new Error('GNews API key is not configured');
    }

    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(keyword)}&lang=en&max=10&apikey=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0] || 'Failed to search news');
    }

    const data = await response.json();
    return await Promise.all(data.articles.map(transformNewsData));
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

export const filterNewsByCategory = async (category: string): Promise<NewsItem[]> => {
  try {
    if (!API_KEY) {
      throw new Error('GNews API key is not configured');
    }

    const response = await fetch(
      `${BASE_URL}/top-headlines?category=${encodeURIComponent(category)}&lang=en&max=10&apikey=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0] || 'Failed to filter news');
    }

    const data = await response.json();
    return await Promise.all(data.articles.map(transformNewsData));
  } catch (error) {
    console.error('Error filtering news:', error);
    throw error;
  }
};