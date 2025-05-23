import React, { useContext } from 'react';
import { RefreshCw } from 'lucide-react';
import NewsContainer from './components/NewsContainer';
import Header from './components/Header';
import { NewsProvider, NewsContext } from './context/NewsContext';

function App() {
  return (
    <NewsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
        <Header />
        <main className="container mx-auto px-4 pb-20 pt-24 sm:pt-28">
          <NewsContainer />
        </main>
        <RefreshButton />
      </div>
    </NewsProvider>
  );
}

function RefreshButton() {
  const { refreshNews, loading } = useContext(NewsContext);

  return (
    <div className="fixed bottom-8 right-8">
      <button 
        className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={refreshNews}
        disabled={loading}
        aria-label="Refresh news"
      >
        <RefreshCw size={22} className={`${loading ? 'animate-spin' : 'animate-none'}`} />
      </button>
    </div>
  );
}

export default App;