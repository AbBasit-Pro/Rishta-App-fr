'use client';

import { useState } from 'react';

interface MatchResult {
  name: string;
  age: number;
  location: string;
  preferences: string;
  phone: string;
}

export default function Home() {
  const [form, setForm] = useState<MatchResult>({
    name: '',
    age: 0,
    location: '',
    preferences: '',
    phone: '',
  });

  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data: MatchResult = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">AI Rishta Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="preferences"
          value={form.preferences}
          onChange={handleChange}
          placeholder="Preferences"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? 'Matching...' : 'Find Match'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold">Match Found:</h2>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Age:</strong> {result.age}</p>
          <p><strong>Location:</strong> {result.location}</p>
          <p><strong>Preferences:</strong> {result.preferences}</p>
          <p><strong>Phone:</strong> {result.phone}</p>
        </div>
      )}
    </main>
  );
}
