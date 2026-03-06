import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return Response.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  // Hash password — never store plain text
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return Response.json(
    { id: user.id, name: user.name, email: user.email },
    { status: 201 }
  );
}