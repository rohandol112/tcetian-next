'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { useState } from 'react'

export function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Events', href: '/events' },
    { name: 'Forums', href: '/forums' },
    ...(user ? [{ name: 'Profile', href: '/profile' }] : []),
    ...(user?.role === 'club' ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4 bg-white/95 backdrop-blur-md border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto">
        {/* Juspay-style rounded white navbar */}
        <div className="bg-white rounded-full shadow-md border border-gray-300 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              TCETian
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-gray-600 mr-1">
                    {user.role === 'club' ? user.clubName : user.name}
                  </span>
                  <button 
                    onClick={logout} 
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register" 
                    className="px-5 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-3xl shadow-sm border border-gray-200/60 p-4 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-2" />
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600">
                    {user.role === 'club' ? user.clubName : user.name}
                  </div>
                  <button 
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }} 
                    className="px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all border border-gray-200 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all w-full text-center"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="px-4 py-2.5 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm w-full text-center"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
