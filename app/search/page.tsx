'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import API_Caller from '@/src/api_caller';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  published: boolean;
  premium: boolean;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery: string) => {
    try {
      const res = await API_Caller('GET', null, `/articles/search?q=${encodeURIComponent(searchQuery)}`, null);
      setArticles(res.articles || []);
    } catch (error) {
      console.error('Search failed:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles found for your search.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/article/${article.id}`} className="text-blue-600 hover:text-blue-800">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{article.category}</span>
                {article.premium && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}