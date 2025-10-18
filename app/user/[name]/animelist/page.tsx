// app/user/[username]/animelist/page.tsx
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AnimeInfiniteScroll from "./AnimeInfiniteScrollClient";

type Props = {
  params: { username: string };
};

export default async function AnimeListPage({ params }: Props) {
  const { username } = params;

  // Get session (if any)
  const session = await auth();

  // Resolve the target user ID
  let targetUserId: string | null = null;
  let isOwner = false;

  if (session?.user?.id) {
    // Check if the requested username matches the logged-in user
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { userName: true },
    });

    if (currentUser?.userName === username) {
      targetUserId = session.user.id;
      isOwner = true;
    }
  }

  // If not owner (or not logged in), look up by username
  if (!targetUserId) {
    const publicUser = await prisma.user.findUnique({
      where: { userName: username },
      select: { id: true },
    });
    targetUserId = publicUser?.id || null;
  }

  if (!targetUserId) {
    return <div>User not found</div>;
  }

  return <AnimeInfiniteScroll userId={targetUserId} isOwner={isOwner} />;
}