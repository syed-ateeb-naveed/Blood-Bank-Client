import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { AuthProvider } from "./contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blood Bank Management System",
  description: "Manage blood donations and donors efficiently",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 min-h-screen text-white`}
      >
        <AuthProvider>
         
          <main className="mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

