import type { Metadata } from 'next'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'TCETian - College Event Management & Social Platform',
  description: 'A comprehensive platform for TCET students to discover events, participate in discussions, and connect with the college community.',
  keywords: ['TCET', 'college events', 'student platform', 'Mumbai', 'engineering college'],
  authors: [{ name: 'TCETian Team' }],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
