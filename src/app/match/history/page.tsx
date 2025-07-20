 'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
  location: string;
  preferences: string;
  phone: string;
}

const PAGE_SIZE = 5;

export default function MatchHistory() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://rishta-app-backend.vercel.app/api/match/all');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch match history');
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
        📋 AI Rishta Match History
      </h1>

      {loading && <p className="text-gray-500">Loading matches...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {!loading && users.length === 0 && <p>No match records found.</p>}

      {!loading && users.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg shadow-sm border">
            <table className="min-w-full text-sm text-left bg-white">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 whitespace-nowrap border">#</th>
                  <th className="p-3 whitespace-nowrap border">Name</th>
                  <th className="p-3 whitespace-nowrap border">Age</th>
                  <th className="p-3 whitespace-nowrap border">Location</th>
                  <th className="p-3 whitespace-nowrap border">Preferences</th>
                  <th className="p-3 whitespace-nowrap border">Phone</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((u, idx) => (
                  <tr key={u.id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-3 border">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                    <td className="p-3 border">{u.name}</td>
                    <td className="p-3 border">{u.age}</td>
                    <td className="p-3 border">{u.location}</td>
                    <td className="p-3 border">{u.preferences}</td>
                    <td className="p-3 border">{u.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded text-white transition ${
                currentPage === 1
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              ← Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 rounded text-white transition ${
                currentPage === totalPages
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
