"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="bg-gray-950 text-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Something broke 😅</h1>
          <p className="text-gray-400 mb-6">{error.message}</p>
          <button
            onClick={reset}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
