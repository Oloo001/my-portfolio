import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-4xl font-bold mb-4">About Me</h1>
      <p className="text-gray-400 max-w-md text-center">
        I'm learning Next.js to become a full stack developer.
        I know HTML, CSS, JS and now I'm leveling up. 💪
      </p>
      <Link href="/" className="mt-6 text-blue-400 hover:underline">
        ← Back Home
      </Link>
    </main>
  );
}