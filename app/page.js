import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-5xl font-bold mb-4">Hi, I'm Oloo 👋</h1>
      <p className="text-xl text-gray-400">Full Stack Developer in training</p>
      
      <Link href="/about"
        className="mt-8 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        About Me →
      </Link>
    </main>
  );
}