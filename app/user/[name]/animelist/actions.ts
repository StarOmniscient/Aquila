// app/user/[username]/animelist/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function fetchAnimePage({
  userId,
  page,
  take,
}: {
  userId: string;
  page: number;
  take: number;
}) {
  // Optional: verify that this userId is allowed to be viewed
  // (e.g., user exists, profile is public, etc.)

  const skip = (page - 1) * take;

  const anime = await prisma.animeList.findMany({
    where: { userId },
    skip,
    take,
    orderBy: { createdAt: "desc" },
    // select only needed fields
    select: {
      id: true,
      
    },
    
  });

  return anime;
}