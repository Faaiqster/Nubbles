import { NewsItem } from '../types';

// const API_KEY = import.meta.env.VITE_GNEWS_API_KEY; // No longer needed
// const BASE_URL = 'https://gnews.io/api/v4'; // No longer needed

// transformNewsData is no longer needed as the backend handles transformation and summarization
/*
const transformNewsData = async (article: any): Promise<NewsItem> => {
  // const summary = await summarizeText(article.content || article.description || article.title); // Summarization now on backend
  
  return {
    id: article.url, // Assuming backend provides 'url' as id
    title: article.title,
    summary: article.summary, // Expecting 'summary' directly from backend
    category: article.source.name, // Assuming backend provides this
    source: article.source.name, // Assuming backend provides this
    publishedAt: article.publishedAt, // Assuming backend provides this
    url: article.url, // Assuming backend provides this
    isBreaking: Date.now() - new Date(article.publishedAt).getTime() < 3600000, // This can be calculated on frontend if needed, or backend can provide it
    trending: null, // Assuming backend provides this or it's handled differently
  };
};
*/

export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    // The backend endpoint now provides news with summaries
    const response = await fetch('/api/fetch-news'); 
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch news from backend');
    }

    const articles: any[] = await response.json(); // Use any[] initially for flexibility
    // Assuming the backend returns data largely conforming to NewsItem[]
    // Minimal transformation might be needed here if backend structure differs slightly
    return articles.map(article => ({
      id: article.id || article.url, // Ensure id is present, fallback to url
      title: article.title,
      summary: article.summary, // This should be provided by the backend
      category: article.source?.name || 'General', // Use optional chaining and provide a default
      source: article.source?.name || 'Unknown Source', // Use optional chaining
      publishedAt: article.publishedAt,
      url: article.url,
      image: article.image || '', // Add image if present in backend data, otherwise default
      content: article.content || '', // Add content if present in backend data, otherwise default
      isBreaking: typeof article.isBreaking === 'boolean' 
                    ? article.isBreaking 
                    : (article.publishedAt ? (Date.now() - new Date(article.publishedAt).getTime() < 3 * 60 * 60 * 1000) : false),
      trending: article.trending || null, // Ensure trending exists
    }));
  } catch (error) {
    console.error('Error fetching news from backend:', error);
    throw error;
  }
};

// TODO: Implement backend and uncomment
/*
export const searchNews = async (keyword: string): Promise<NewsItem[]> => {
  try {
    // if (!API_KEY) {
    //   throw new Error('GNews API key is not configured');
    // }

    // const response = await fetch(
    //   `${BASE_URL}/search?q=${encodeURIComponent(keyword)}&lang=en&max=10&apikey=${API_KEY}`
    // );

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.errors?.[0] || 'Failed to search news');
    // }

    // const data = await response.json();
    // return await Promise.all(data.articles.map(transformNewsData)); // transformNewsData would need to be updated or backend used
    throw new Error('searchNews is not implemented with the new backend yet.');
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};
*/

// TODO: Implement backend and uncomment
/*
export const filterNewsByCategory = async (category: string): Promise<NewsItem[]> => {
  try {
    // if (!API_KEY) {
    //   throw new Error('GNews API key is not configured');
    // }

    // const response = await fetch(
    //   `${BASE_URL}/top-headlines?category=${encodeURIComponent(category)}&lang=en&max=10&apikey=${API_KEY}`
    // );

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.errors?.[0] || 'Failed to filter news');
    // }

    // const data = await response.json();
    // return await Promise.all(data.articles.map(transformNewsData)); // transformNewsData would need to be updated or backend used
    throw new Error('filterNewsByCategory is not implemented with the new backend yet.');
  } catch (error) {
    console.error('Error filtering news:', error);
    throw error;
  }
};
*/