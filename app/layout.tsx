import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"


const pages = [
  { label: "Home", href: "/home" },
  { label: "Anime List", href: "/anime" },
  { label: "Manga List", href: "/manga" },
  { label: "Movies List", href: "/movies" },
  { label: "TV List", href: "/tv" },
  { label: "Game List", href: "/games" },
  { label: "Music List", href: "/music" },
]


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

  if (!session) {
    return (
      <html lang="en">
        <body className="bg-[#0f172a] text-white">
          <main className="p-4">{children}</main>
        </body>
      </html>
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })



  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white">
        <Navbar pages={pages} user={{ id: user?.id, userName: user?.userName, profilePic: user?.avatarUrl }} notifications={14} />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
