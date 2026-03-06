"use client";

import { useState, useEffect } from "react";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data on mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setRepos(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // 2. Show a loading state while waiting for the API
  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-400">Loading awesome projects...</p>
      </main>
    );
  }

  // 3. Render the UI
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Projects</h1>
      <p className="text-gray-400 mb-10">
        Live repos from GitHub ⚡
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{repo.title}</h3>
            <p className="text-gray-400 mb-4 text-sm">
              {repo.description || "No description"}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
               {/* Assuming repo.tech might be a string or array */}
               <span className="text-xs bg-gray-900 px-2 py-1 rounded text-blue-300">
                {repo.tech}
               </span>
            </div>
            <a 
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-blue-400 text-sm hover:underline"
            >
              View on GitHub →
            </a>
            {repo.liveUrl && (
              <a
                href={repo.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-green-400 text-sm hover:underline"
              >
                View Live →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}