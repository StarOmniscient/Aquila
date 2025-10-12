import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Aquila",
  description: "Your all in one tracker",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  

  const pages = [
  { label: "Home", href: "/home" },
  { label: "Anime List", href: `/user/${session.user.name}/animelist` },
  { label: "Book List", href: `/user/${session.user.name}/booklist` },
  { label: "Movies List", href: `/user/${session.user.name}/movielist` },
  { label: "TV List", href: `/user/${session.user.name}/tvlist` },
  { label: "Game List", href: `/user/${session.user.name}/gamelist` },
  { label: "Music List", href: `/user/${session.user.name}/musiclist` },
  { label: "Add to Site", href: "/add"}
]

  const baseLayout = (content: React.ReactNode) => (
    <html lang="en">
      <body className="bg-[#0f172a] text-white flex flex-col min-h-screen">
        {content}
      </body>
    </html>
  )

  if (!session)
    return baseLayout(<main className="flex-1 p-4">{children}</main>)

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  return baseLayout(
    <>
      <Navbar
        pages={pages}
        user={{
          id: user?.id,
          userName: user?.userName,
          profilePic: user?.avatarUrl,
        }}
        notifications={14}
      />
      <main className="flex-1 p-4">{children}</main>
    </>
  )
}
