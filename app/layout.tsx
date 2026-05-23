import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'AI Creator Studio Pro - Professional Content Generation',
  description: 'Generate stunning AI content with character consistency, motion capture, and professional tools',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0a12',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-neutral-950 text-neutral-50 overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-neutral-950 to-neutral-950"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-purple-600/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-pink-600/10 to-transparent blur-3xl"></div>
        </div>
        {children}
      </body>
    </html>
  )
}
