import React, { useState } from 'react';
import { Clock, ExternalLink, TrendingUp } from 'lucide-react';
import { NewsItem } from '../types';
import { formatTimeAgo } from '../utils/dateUtils';
import { getCategoryColor } from '../utils/colorUtils';

interface NewsBubbleProps {
  newsItem: NewsItem;
}

const NewsBubble: React.FC<NewsBubbleProps> = ({ newsItem }) => {
  const [expanded, setExpanded] = useState(false);
  const { category, title, summary, source, publishedAt, url, isBreaking, trending } = newsItem;
  
  const categoryColor = getCategoryColor(category);
  const timeAgo = formatTimeAgo(publishedAt);

  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
        isBreaking ? 'ring-2 ring-red-500 dark:ring-red-400' : ''
      }`}
    >
      <div 
        className="cursor-pointer relative"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span 
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColor}`}
            >
              {category}
            </span>
            <div className="flex items-center space-x-1">
              {isBreaking && (
                <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs px-2 py-0.5 rounded-full animate-pulse">
                  Breaking
                </span>
              )}
              {trending && (
                <div className="flex items-center text-amber-600 dark:text-amber-400">
                  <TrendingUp size={14} className="mr-0.5" />
                  <span className="text-xs">{trending}</span>
                </div>
              )}
            </div>
          </div>
          
          <h3 className="font-bold mb-2 text-slate-900 dark:text-white">
            {title}
          </h3>
          
          <p className={`text-slate-600 dark:text-slate-300 text-sm ${expanded ? '' : 'line-clamp-3'}`}>
            {summary}
          </p>
        </div>
        
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-slate-700/50">
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs">
            <Clock size={14} className="mr-1" />
            <span>{timeAgo} • {source}</span>
          </div>
          
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} className="mr-1" />
            <span className="text-xs">Read More</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsBubble;