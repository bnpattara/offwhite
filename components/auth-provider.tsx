"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { UserRole } from "@/lib/types"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Simulate checking for an existing session
  useEffect(() => {
    // In a real app, this would check for a valid token in cookies/localStorage
    // and make an API call to get the user data if a token exists

    const checkAuth = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // For demo purposes, we'll consider the user logged in if they're not on auth pages
        const isAuthPage = pathname?.startsWith("/auth") || pathname === "/"

        if (!isAuthPage) {
          // Mock user data
          setUser({
            id: "user_1",
            name: "Alex Johnson",
            email: "alex@example.com",
            role: "mentee",
            avatar: "/placeholder.svg?height=128&width=128",
          })
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname])

  // Redirect unauthenticated users away from protected routes
  useEffect(() => {
    if (isLoading) return

    const isAuthPage = pathname?.startsWith("/auth") || pathname === "/"

    if (!user && !isAuthPage) {
      router.push("/auth/login")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      setUser({
        id: "user_1",
        name: "Alex Johnson",
        email,
        role: "mentee",
        avatar: "/placeholder.svg?height=128&width=128",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      setUser({
        id: "user_1",
        name,
        email,
        role,
        avatar: "/placeholder.svg?height=128&width=128",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
