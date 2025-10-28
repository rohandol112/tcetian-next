'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Edit, LogOut, User, Mail, Building, GraduationCap } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useToast } from '@/lib/context/ToastContext'
import api from '@/lib/api'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const [rsvpedEvents, setRsvpedEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchRSVPedEvents()
  }, [user])

  const fetchRSVPedEvents = async () => {
    try {
      setLoading(true)
      const response: any = await api.get('/api/events?rsvped=true')
      setRsvpedEvents(response.events || [])
    } catch (error) {
      console.error('Failed to fetch RSVP events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.role === 'student' ? user.name?.charAt(0) : user.clubName?.charAt(0)}
              </div>

              {/* Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.role === 'student' ? user.name : user.clubName}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  {user.role === 'student' && (
                    <>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{user.studentId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>{user.branch}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>{user.year}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-all inline-flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar - Stats */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-3xl p-6 border border-blue-200/50">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-1">
                  {user.role === 'student' ? rsvpedEvents.length : 0}
                </div>
                <div className="text-sm text-blue-700 font-medium">
                  {user.role === 'student' ? 'Events Attending' : 'Events Hosted'}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-3xl p-6 border border-purple-200/50">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-1">0</div>
                <div className="text-sm text-purple-700 font-medium">Forum Posts</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-3xl p-6 border border-emerald-200/50">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-900 mb-1">
                  {user.role === 'student' ? user.year || 'N/A' : 'Club'}
                </div>
                <div className="text-sm text-emerald-700 font-medium">
                  {user.role === 'student' ? 'Year' : 'Account Type'}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - RSVP'd Events */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {user.role === 'student' ? 'My Events' : 'Hosted Events'}
              </h2>

              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading events...</p>
                </div>
              ) : rsvpedEvents.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No events yet</h3>
                  <p className="text-gray-600 mb-6">
                    {user.role === 'student' 
                      ? 'Browse events and RSVP to see them here!' 
                      : 'Create your first event to get started!'}
                  </p>
                  <Link
                    href={user.role === 'student' ? '/events' : '/events/create'}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
                  >
                    {user.role === 'student' ? 'Browse Events' : 'Create Event'}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {rsvpedEvents.map((event) => (
                    <Link
                      key={event._id}
                      href={`/events/${event._id}`}
                      className="block bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                          <p className="text-gray-600">{event.category}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                          RSVP'd
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{event.registrations?.length || 0} attending</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
