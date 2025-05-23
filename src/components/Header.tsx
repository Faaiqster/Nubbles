import React, { useState, useContext } from 'react';
import { Search, Newspaper } from 'lucide-react';
import { NewsContext } from '../context/NewsContext';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchNews } = useContext(NewsContext);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchNews(searchTerm);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">TechBubble</h1>
        </div>
        
        <form onSubmit={handleSearch} className="relative hidden sm:block max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
        
        <div className="flex items-center space-x-4">
          <button className="text-sm px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            Categories
          </button>
          <button 
            onClick={() => document.querySelector('form')?.requestSubmit()}
            className="block sm:hidden"
          >
            <Search className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;