import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <div className="text-center max-w-2xl">
        <span className="text-sm text-blue-400 font-medium tracking-widest uppercase mb-4 block">
          Full Stack Developer
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Hi, I'm <span className="text-blue-400">Oloo</span> 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          I build fast, modern web apps with Next.js, React, and PostgreSQL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link  href="/projects"
            className="px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition font-medium text-lg"
          >
            See My Work
          </Link>
          
          <Link  href="/contacts"
            className="px-8 py-4 border border-gray-700 rounded-xl hover:border-gray-500 transition font-medium text-lg"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </main>
  );
}