"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-800 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-400">
          <i>OLOO.dev</i>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-400 hover:text-white transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-400 hover:text-white transition">
            About
          </Link>
          <Link href="/projects" className="text-gray-400 hover:text-white transition">
            Projects
          </Link>
          <Link href="/search" className="text-gray-400 hover:text-white">
            Search
          </Link>
          <Link href="/contacts" className="text-gray-400 hover:text-white">
            Contacts
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-400 hover:text-red-300 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-6">
          <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
          <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
          <Link href="/projects/" className="text-gray-400 hover:text-white">Projects</Link>
          <Link href="/search" className="text-gray-400 hover:text-white">Search</Link>
          <Link href="/contacts" className="text-gray-400 hover:text-white">Contacts</Link>

          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-400 hover:text-red-300 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}