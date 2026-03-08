import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
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

  // Validate input with Zod
  const validatedData = contactSchema.safeParse(body);

  if (!validatedData.success) {
    return Response.json(
      { error: "Validation failed", fields: validatedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // result.data is clean and validated
  const { name, email, phone } = validatedData.data;

  try {
    const contact = await prisma.contact.create({
      data: {
        name: name,
        email: email,
        phone: phone || null,
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