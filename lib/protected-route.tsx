'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'member'
  requirePaid?: boolean
}

export function ProtectedRoute({
  children,
  requiredRole,
  requirePaid = false,
}: ProtectedRouteProps) {
  const { user, isLoggedIn, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    // Not logged in
    if (!isLoggedIn) {
      router.push('/login')
      return
    }

    // Check role
    if (requiredRole && user?.role !== requiredRole) {
      router.push('/dashboard')
      return
    }

    // Check payment
    if (requirePaid && !user?.isPaid) {
      router.push('/pricing')
      return
    }
  }, [isLoggedIn, loading, user, requiredRole, requirePaid, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-600"></div>
      </div>
    )
  }

  if (!isLoggedIn) return null

  if (requiredRole && user?.role !== requiredRole) return null

  if (requirePaid && !user?.isPaid) return null

  return <>{children}</>
}
