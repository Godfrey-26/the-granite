'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import API_Caller from '@/src/api_caller';

export default function SubscribePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleSubscribe = async (plan: string) => {
    setLoading(true);
    try {
      const res = await API_Caller('POST', null, '/subscriptions/create', {
        plan,
        userId: session.user.id
      });

      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl; // Redirect to Stripe checkout
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic Plan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Basic</h2>
          <p className="text-gray-600 mb-4">Access to standard articles</p>
          <div className="text-3xl font-bold mb-4">$9.99<span className="text-lg">/month</span></div>
          <ul className="mb-6 space-y-2">
            <li>✓ Access to all free articles</li>
            <li>✓ Personalized recommendations</li>
            <li>✓ Email newsletters</li>
          </ul>
          <button
            onClick={() => handleSubscribe('basic')}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe'}
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-indigo-500">
          <h2 className="text-2xl font-bold mb-4">Premium</h2>
          <p className="text-gray-600 mb-4">Full access to all content</p>
          <div className="text-3xl font-bold mb-4">$19.99<span className="text-lg">/month</span></div>
          <ul className="mb-6 space-y-2">
            <li>✓ Everything in Basic</li>
            <li>✓ Access to premium articles</li>
            <li>✓ Ad-free experience</li>
            <li>✓ Exclusive content</li>
          </ul>
          <button
            onClick={() => handleSubscribe('premium')}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  );
}