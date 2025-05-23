import React from 'react';
import NewsBubble from './NewsBubble';
import { NewsItem } from '../types';

interface NewsGridProps {
  news: NewsItem[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  // Sort news with breaking news first, then by date
  const sortedNews = [...news].sort((a, b) => {
    if (a.isBreaking && !b.isBreaking) return -1;
    if (!a.isBreaking && b.isBreaking) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {sortedNews.map((item) => (
        <NewsBubble key={item.id} newsItem={item} />
      ))}
    </div>
  );
};

export default NewsGrid;