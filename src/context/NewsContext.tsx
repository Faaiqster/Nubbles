import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { NewsItem } from '../types';
import { fetchNews, searchNews as searchNewsService } from '../services/newsService';

interface NewsContextType {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refreshNews: () => Promise<void>;
  searchNews: (keyword: string) => Promise<void>;
}

export const NewsContext = createContext<NewsContextType>({
  news: [],
  loading: false,
  error: null,
  refreshNews: async () => {},
  searchNews: async () => {},
});

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const newsData = await fetchNews();
      setNews(newsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const searchNews = async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const searchResults = await searchNewsService(keyword);
      setNews(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error, refreshNews, searchNews }}>
      {children}
    </NewsContext.Provider>
  );
};