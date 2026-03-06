"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // handle redirect manually
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard"); // redirect on success
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-8">Sign in to your account</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg px-4 py-3 font-medium transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="border border-gray-700 hover:border-gray-500 rounded-lg px-4 py-3 font-medium transition flex items-center justify-center gap-3"
          >
            <span>🔵</span> Continue with Google
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">
          No account?{" "}
          <Link href="/auth/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}