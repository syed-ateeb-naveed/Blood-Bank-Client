"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/app/actions"
import { UserCircle, Syringe, List } from "lucide-react"
import { useAuth } from "@/app/contexts/auth-context"

export function Navbar() {
  const router = useRouter()
  const { isAuthenticated, isLoading, logout } = useAuth()

  const handleLogout = async () => {
    await logoutUser()
    logout()
  }

  // Don't render anything while checking auth status
  if (isLoading) {
    return (
      <nav className="nav-blur fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-red-400 transition-colors">
            Blood Bank
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <nav className="nav-blur fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white hover:text-red-400 transition-colors">
          Blood Bank
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild className="text-white hover:text-red-400">
                <Link href="/donations/new" className="flex items-center">
                  <Syringe className="w-5 h-5 mr-2" />
                  Make Donation
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:text-red-400">
                <Link href="/my-donations" className="flex items-center">
                  <List className="w-5 h-5 mr-2" />
                  My Donations
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:text-red-400">
                <Link href="/profile" className="flex items-center">
                  <UserCircle className="w-5 h-5 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-white hover:text-red-400">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-white hover:text-red-400">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:text-red-400">
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

