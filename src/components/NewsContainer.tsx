import React, { useContext } from 'react';
import { NewsContext } from '../context/NewsContext';
import NewsBubble from './NewsBubble';
import NewsGrid from './NewsGrid';
import NewsSkeleton from './NewsSkeleton';
import { AlertCircle } from 'lucide-react';

const NewsContainer: React.FC = () => {
  const { news, loading, error, refreshNews } = useContext(NewsContext);

  if (loading) {
    return <NewsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Unable to load news</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {error || "Something went wrong. Please try again later."}
        </p>
        <button 
          onClick={refreshNews}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <h2 className="text-xl font-semibold mb-2">No news found</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Try refreshing or checking back later.
        </p>
      </div>
    );
  }

  return <NewsGrid news={news} />;
};

export default NewsContainer;