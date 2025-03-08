"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const hasToken = document.cookie.includes("jwt_token")
      setIsAuthenticated(hasToken)
      setIsLoading(false)
    }

    // Check immediately
    checkAuth()

    // Set up an interval to check periodically
    const interval = setInterval(checkAuth, 1000)

    return () => clearInterval(interval)
  }, [])

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = async () => {
    setIsAuthenticated(false)
    router.push("/")
  }

  // Don't render children until we've checked auth status
  if (isLoading) {
    return null // or a loading spinner if you prefer
  }

  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

