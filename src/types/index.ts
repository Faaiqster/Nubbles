export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishedAt: string;
  url: string;
  isBreaking: boolean;
  trending: number | null;
}