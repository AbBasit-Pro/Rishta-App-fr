'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-gray-700 to-gray-900 text-white p-6 shadow-lg h-screen">
        <h1 className="text-2xl font-bold mb-8">⚡ Rista AI</h1>
        <Link
          href="/"
          className="hover:bg-blue-600 px-4 py-2 rounded transition"
        >
          📝 Submit Match
        </Link>
        <Link
          href="/match/history"
          className="hover:bg-blue-600 px-4 py-2 rounded transition"
        >
          📜 View History
        </Link>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gray-700 text-white flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold">⚡ Match AI</h1>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className="focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white text-black shadow-lg px-4 py-2 space-y-2">
          <Link
            href="/match"
            className="block hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => setMobileOpen(false)}
          >
            📝 Submit Match
          </Link>
          <Link
            href="/match/history"
            className="block hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => setMobileOpen(false)}
          >
            📜 View History
          </Link>
        </div>
      )}
    </>
  );
}
