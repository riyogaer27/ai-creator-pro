'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login gagal. Cek email dan password!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-playfair text-gradient font-bold mb-2">
              AI Creator Studio
            </h1>
            <p className="text-neutral-400 text-sm">
              Login untuk akses platform
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-neutral-400 mb-2 block">
                Email / Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin atau email@example.com"
                className="input-base w-full"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                💡 Untuk test: ketik 'admin'
              </p>
            </div>

            <div>
              <label className="text-sm text-neutral-400 mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-base w-full"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                💡 Untuk test: 'admin123'
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 mt-6"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-xs text-neutral-500 text-center">
              🔐 Member baru bisa register setelah verifikasi email
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
