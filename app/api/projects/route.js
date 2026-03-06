import { prisma } from "@/lib/prisma";

// GET /api/pr
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const projects = await prisma.project.findMany({
    where: search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { tech: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return Response.json(projects);
}

// POST /api/projects
export async function POST(request) {
  const body = await request.json();

  if (!body.title || !body.tech) {
    return Response.json(
      { error: "Title and tech are required" },
      { status: 400 }
    );
  }

  try {
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        tech: body.tech,
        githubUrl: body.githubUrl,
        liveUrl: body.liveUrl
      },
    });
    return Response.json(project, { status: 201 });
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

