export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Projects</h1>
      <p className="text-gray-400 mb-10">Loading repos...</p>

      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-800 rounded-xl p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-800 rounded mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </main>
  );
}