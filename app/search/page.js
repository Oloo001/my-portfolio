"use client";
import { useState } from "react";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchUser() {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">GitHub Search</h1>

      {/* Search Input */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchUser()}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={searchUser}
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* States */}
      {loading && <p className="text-gray-400">Searching...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Result */}
      {user && (
        <div className="border border-gray-800 rounded-xl p-6 flex gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{user.name || user.login}</h2>
            <p className="text-gray-400 text-sm mb-2">{user.bio}</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>👥 {user.followers} followers</span>
              <span>📁 {user.public_repos} repos</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
