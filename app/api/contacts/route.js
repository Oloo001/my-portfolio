import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// GET /api/contacts
export async function GET(request) {
  const session = await getServerSession(authOptions);

  // Not logged in → send to sign in
  if (!session) redirect("/auth/signin");

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const contacts = await prisma.contact.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return Response.json(contacts);
}

// POST /api/contacts
export async function POST(request) {
  const session = await getServerSession(authOptions);

  // Not logged in → send to sign in
  if (!session) redirect("/auth/signin");
  
  const body = await request.json();

  if (!body.name || !body.email) {
    return Response.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  try {
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
      },
    });
    return Response.json(contact, { status: 201 });
  } catch (error) {
    // Unique constraint = duplicate email
    if (error.code === "P2002") {
      return Response.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}