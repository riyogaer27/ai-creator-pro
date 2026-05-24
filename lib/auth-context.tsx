'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  role: 'admin' | 'member'
  subscription?: 'free' | 'starter' | 'premium' | 'enterprise'
  isPaid: boolean
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isAdmin: boolean
  isPaidMember: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        const userData = await fetchUserData(data.session.user.id)
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchUserData(userId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error

    return {
      id: data.id,
      email: data.email,
      role: data.role,
      subscription: data.subscription,
      isPaid: data.is_paid,
    }
  }

  async function login(email: string, password: string) {
    setLoading(true)
    try {
      // Admin login
      if (email === 'admin' && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        setUser({
          id: 'admin-001',
          email: 'admin@ai-creator.pro',
          role: 'admin',
          isPaid: true,
        })
        localStorage.setItem('auth_token', 'admin-token')
        return
      }

      // Supabase member login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const userData = await fetchUserData(data.user!.id)
      setUser(userData)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        isPaidMember: user?.isPaid || false,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
