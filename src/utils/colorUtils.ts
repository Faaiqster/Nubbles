type CategoryColors = {
  [key: string]: string;
};

// Predefined colors for different news categories
const categoryColorMap: CategoryColors = {
  'Space': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  'Quantum Computing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'AI': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Energy': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Medicine': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'Transportation': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  'Climate': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  'Neuroscience': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'Technology': 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
};

// Default color for categories not in the map
const defaultCategoryColor = 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';

export const getCategoryColor = (category: string): string => {
  return categoryColorMap[category] || defaultCategoryColor;
};

// Function to generate a consistent color based on string hash
export const generateConsistentColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
};