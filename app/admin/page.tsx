'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API_Caller from '@/src/api_caller';

interface Stats {
  totalUsers: number;
  totalArticles: number;
  totalSubscriptions: number;
  revenue: number;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchStats();
  }, [session, router]);

  const fetchStats = async () => {
    try {
      const res = await API_Caller('GET', null, '/admin/stats');
      setStats(res.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">Failed to load statistics.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Articles</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalArticles}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalSubscriptions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${stats.revenue}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
              Create New Article
            </button>
            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
              Manage Users
            </button>
            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
              View Reports
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="text-gray-600">
            <p>Recent user registrations, article publications, etc.</p>
            {/* Add actual activity feed from API */}
          </div>
        </div>
      </div>
    </div>
  );
}