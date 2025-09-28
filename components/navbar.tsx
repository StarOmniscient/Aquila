"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Page = {
  label: string
  href: string
}

type User = {
  id: string | undefined
  displayName?: string | undefined
  userName: string | undefined
  profilePic?: string | undefined | null
}

type NavbarProps = {
  pages: Page[]
  user: User
  notifications?: number
}

export default function Navbar({ pages, user, notifications = 0 }: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav className="w-full bg-sidebar text-sidebar-foreground px-6 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left (empty or logo) */}
        <div className="w-24" />

        {/* Center - Links with glass pill */}
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-2 text-sm bg-sidebar/40 backdrop-blur-md px-4 py-1 rounded-full border border-border">
            {pages.map((page) => {
              const isActive = pathname === page.href
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-white/20 text-primary font-medium"
                      : "hover:bg-white/10"
                  }`}
                >
                  {page.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right - Notifications + Avatar */}
        <div className="flex items-center space-x-4 w-24 justify-end">
          {user?.id && (
            <>
              <Link href="/notifications" key={"notifications"}>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 bg-destructive text-[10px] px-1 rounded-full text-destructive-foreground">
                      {notifications}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Avatar with dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-sidebar-ring">
                    {user.profilePic ? (
                      <AvatarImage
                        src={user.profilePic}
                        alt={user.displayName ?? user.userName}
                      />
                    ) : (
                      <AvatarFallback>
                        {user.displayName
                          ? user.displayName[0]?.toUpperCase()
                          : user.userName?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel>
                    {user.displayName ?? user.userName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Button onClick={() => signOut()}>Logout</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
