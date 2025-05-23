import React from 'react';

const NewsSkeleton: React.FC = () => {
  // Create an array of 6 items to represent loading skeletons
  const skeletons = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {skeletons.map((index) => (
        <div 
          key={index}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="p-5">
            <div className="flex justify-between mb-3">
              <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </div>
            
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
          
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-700/50 flex justify-between">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;