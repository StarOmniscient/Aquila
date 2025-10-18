// app/api/anime/route.ts
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const take = 10; // items per page
  const skip = (page - 1) * take;

  const anime = await prisma.animeList.findMany({
    where: { userId: session.user.id },
    skip,
    take,
    orderBy: { createdAt: "desc" }, // optional: consistent order
  });

  return Response.json({ anime });
}