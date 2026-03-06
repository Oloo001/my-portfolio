// Shared in-memory store (same array as above — in real app use a DB)
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// GET /api/contacts/1

export async function GET(request) {
  const session = await getServerSession(authOptions);

  // Not logged in → send to sign in
  if (!session) redirect("/auth/signin");

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // get last segment of URL
  const contact = await prisma.contact.findUnique({
    where: { id: Number(id) },
  });

  if (!contact) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(contact);
}

// PUT /api/contacts/1 — update
export async function PUT(request) {
  const session = await getServerSession(authOptions);

  // Not logged in → send to sign in
  if (!session) redirect("/auth/signin");
  
  const body = await request.json();

    try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // get last segment of URL
    const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });
    return Response.json(contact);
  } catch (error) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}

// DELETE /api/contacts/1
export async function DELETE(request) {

    try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // get last segment of URL
    const contact = await prisma.contact.delete({
      where: { id: Number(id) },
    });
    return Response.json({ deleted: contact });
  } catch (error) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}