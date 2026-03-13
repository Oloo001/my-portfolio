import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dashboard - Oloo.dev",
  description: "User dashboard with stats and recent contacts",
  viewport: "width=device-width, initial-scale=1",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Not logged in → send to sign in
  if (!session) redirect("/auth/signin");

  // Fetch this user's data
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-10">
        {session.user.image && (
          <img
            src={session.user.image}
            className="w-14 h-14 rounded-full"
            alt="avatar"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {session.user.name} 👋
          </h1>
          <p className="text-gray-400">{session.user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Contacts", value: contacts.length },
          { label: "Projects", value: 3 },
          { label: "Role", value: session.user.role || "user" },
        ].map((stat) => (
          <div key={stat.label} className="border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-400">{stat.value}</p>
            <p className="text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Contacts */}
      <h2 className="text-xl font-semibold mb-4">Recent Contacts</h2>
      <div className="flex flex-col gap-3">
        {contacts.map((c) => (
          <div key={c.id} className="border border-gray-800 rounded-xl px-6 py-4">
            <p className="font-medium">{c.name}</p>
            <p className="text-gray-400 text-sm">{c.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}