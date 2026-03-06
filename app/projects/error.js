"use client"; // Error files must be client components

export default function Error({ error, reset }) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </main>
  );
}