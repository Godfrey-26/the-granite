'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import API_Caller from '@/src/api_caller';

interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  published: boolean;
  premium: boolean;
  author: { name: string };
  createdAt: string;
}

export default function ArticlePage() {
  const params = useParams();
  const { data: session } = useSession();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (article) {
      const access = !article.premium || 
        (session?.user?.subscription?.status === 'active') || 
        (session?.user?.role === 'admin');
      setHasAccess(access);
    }
  }, [article, session]);

  const fetchArticle = async (id: string) => {
    try {
      const res = await API_Caller('GET', null, `/articles/${id}`);
      setArticle(res.article);
    } catch (error) {
      console.error('Failed to fetch article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!article) {
    return <div className="text-center py-8">Article not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span>By {article.author?.name || 'Unknown'}</span>
            <span className="mx-2">•</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{article.category}</span>
            {article.premium && (
              <>
                <span className="mx-2">•</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  Premium
                </span>
              </>
            )}
          </div>
        </header>

        {hasAccess ? (
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">{article.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        ) : (
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
            <p className="text-gray-600 mb-6">
              This article requires a premium subscription to read.
            </p>
            {session ? (
              <Link
                href="/subscribe"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Upgrade to Premium
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Sign In to Subscribe
              </Link>
            )}
          </div>
        )}
      </article>
    </div>
  );
}