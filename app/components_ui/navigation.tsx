'use client';

import Link from 'next/link';
import { Menu, Search, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navigation() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'news', label: 'News' },
    { key: 'sport', label: 'Sport' },
    { key: 'business', label: 'Business' },
    { key: 'entertainment', label: 'Entertainment' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Store search in localStorage for dynamic nav
      const searches = JSON.parse(localStorage.getItem('userSearches') || '[]');
      searches.push({ query: searchQuery, timestamp: new Date().toISOString() });
      localStorage.setItem('userSearches', JSON.stringify(searches.slice(-10))); // Keep last 10
      // Redirect to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              The Granite
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${item.key}`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">{session.user.name || session.user.email}</span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    {session.user.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${item.key}`}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}import Link from 'next/link'
import { Menu, Search } from 'lucide-react'

export default function Navigation(){
	const navItems = {home:"Home", news:"News", sport:"Sport", business:"Business", entertainment:"Entertainment"}
	return(
          <div className=" sticky top-0 z-50 bg-white px-3 py-8 divide-y divide-gray-500" >
          	  <nav className="px-3 grid grid-cols-1 divide-y divide-gray-500">
          	    {/*Logo*/}
          	  	<div className="top-section grid-group-main">

                    <div className="essentials grid grid-cols-2 gap-4"> 
                         {/*Navigation icon*/}
                         <div className="navicon"><Menu /></div>

                         {/*Search button*/}
                         <div className="search px-3"><Search /></div>
          	  		  </div>
                  {/*Branding*/}
                  
          	  		  <Link href={Object.keys(navItems)[0]} className="px-8 text-4xl text-center font-bold">The Granite</Link>
          	  		
                  {/*Register and signin button*/}
                  <div className="top-section-buttons grid-cols-2 ">
                      <Link href="" className="p-3 px-8 bg-black text-white">Register</Link>
                      <Link href="" className="p-3 px-8">Sign In</Link>
                  </div>
          	  	</div>

          	  	{/*Navigation items*/}
          	  	<div className="navigation pt-3 divide-y divide-yellow-500">
          	  		<ul className="flex flex-row justify-center">
                        {Object.entries(navItems).map(([key, value])=>(
                              <li key={key}><Link className="px-8" href={key}>{value}</Link></li>
                        ))}
          	  		</ul>
          	  	</div>
          	  </nav>
          </div>
		)
}