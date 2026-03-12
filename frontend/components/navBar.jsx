'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import logo from '@/public/android-chrome-192x192.png';

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && typeof window.resetFlickwiseHome === 'function') {
      window.resetFlickwiseHome();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 m-0">
      <div className="flex items-center gap-3">
         <a href="/" onClick={handleHomeClick} className="flex items-center gap-2">
          <Image src={logo} alt="Logo" className="w-8 h-8" width={32} height={32} />
          <span className="text-2xl font-bold font-sans tracking-wide">Flickwise</span>
        </a>
      </div>

  
      <button
        className="md:hidden flex flex-col gap-1 focus:outline-none cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="w-6 h-0.5 bg-white rounded"></span>
        <span className="w-6 h-0.5 bg-white rounded"></span>
        <span className="w-6 h-0.5 bg-white rounded"></span>
      </button>

     
      <div className="hidden md:flex items-center gap-6 relative" ref={dropdownRef}>
        <Link href="/" className="hover:text-blue-300 hover:scale-105">Home</Link>
        <Link href="/contact" className="hover:text-blue-300 hover:scale-105">Contact</Link>
        <Link href="/watchlist" className="hover:text-blue-300 hover:scale-105">Watchlist</Link>

        <div
          className="hover:text-blue-300 cursor-pointer hover:scale-105"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Genres ▼
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white text-black rounded-md flex flex-col w-40 z-50">
            <Link
              href="/action"
              className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
            >
              Action
            </Link>
            <Link
              href="/comedy"
              className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
            >
              Comedy
            </Link>
            <Link
              href="/thriller"
              className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
            >
              Thriller
            </Link>
            <Link
              href="/horror"
              className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
            >
              Horror
            </Link>
            <Link
              href="/crime"
              className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
            >
              Crime
            </Link>
            <Link
              href="/family"
              className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
            >
              Family
            </Link>
            <Link
              href="/animated"
              className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
            >
              Animated
            </Link>
          </div>
        )}
      </div>

    
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black text-white flex flex-col gap-2 py-4 px-6 z-50">
          <Link href="/" className="hover:text-blue-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/contact" className="hover:text-blue-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link href="/watchlist" className="hover:text-blue-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Watchlist</Link>
          
        
          <div ref={dropdownRef}>
            <div
              className="hover:text-blue-300 cursor-pointer py-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Genres ▼
            </div>
            {isDropdownOpen && (
              <div className="bg-white text-black rounded-md flex flex-col w-full z-50">
                <Link
                  href="/action"
                  className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Action
                </Link>
                <Link
                  href="/comedy"
                  className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Comedy
                </Link>
                <Link
                  href="/thriller"
                  className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Thriller
                </Link>
                <Link
                  href="/horror"
                  className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Horror
                </Link>
                <Link
                  href="/crime"
                  className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Crime
                </Link>
                <Link
                  href="/family"
                  className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Family
                </Link>
                <Link
                  href="/animated"
                  className="hover:bg-slate-300 px-4 py-2 transition-transform duration-200 hover:scale-105 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Animated
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
