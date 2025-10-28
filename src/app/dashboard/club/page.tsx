'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Users, TrendingUp, Edit, Trash2, Plus, Eye } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useToast } from '@/lib/context/ToastContext'
import api from '@/lib/api'

export default function ClubDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const [myEvents, setMyEvents] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    upcomingEvents: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    if (user.role !== 'club') {
      router.push('/dashboard')
      return
    }
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch club's events
      const eventsResponse: any = await api.get('/api/events?limit=50')
      const clubEvents = eventsResponse.events?.filter((event: any) => 
        event.organizer?._id === user?._id || event.organizer === user?._id
      ) || []
      setMyEvents(clubEvents)
      
      // Calculate stats
      const now = new Date()
      const upcoming = clubEvents.filter((event: any) => new Date(event.date) >= now)
      const totalAttendees = clubEvents.reduce((acc: number, event: any) => 
        acc + (event.registeredCount || 0), 0
      )
      
      setStats({
        totalEvents: clubEvents.length,
        totalAttendees,
        upcomingEvents: upcoming.length
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    try {
      await api.delete(`/api/events/${eventId}`)
      showToast('Event deleted successfully', 'success')
      fetchDashboardData()
    } catch (error: any) {
      showToast(error.message || 'Failed to delete event', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {user?.clubName || 'Club'} Dashboard 🎯
            </h1>
            <p className="text-gray-600">Manage your events and track engagement</p>
          </div>
          <Link
            href="/events/create"
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Events */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
            </div>
          </div>

          {/* Total Attendees */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Attendees</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalAttendees}</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-6 border border-cyan-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Events</h2>

          {myEvents.length > 0 ? (
            <div className="space-y-4">
              {myEvents.map((event: any) => {
                const isPast = new Date(event.date) < new Date()
                const capacityPercentage = event.capacity 
                  ? ((event.registeredCount || 0) / event.capacity) * 100 
                  : 0

                return (
                  <div
                    key={event._id}
                    className="p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                          {isPast ? (
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                              Past
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                        
                        {/* Event Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {event.registeredCount || 0}
                              {event.capacity && `/${event.capacity}`} attendees
                            </span>
                          </div>
                          {event.category && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {event.category}
                            </span>
                          )}
                        </div>

                        {/* Capacity Bar */}
                        {event.capacity && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  capacityPercentage >= 90 ? 'bg-red-600' :
                                  capacityPercentage >= 70 ? 'bg-yellow-600' :
                                  'bg-green-600'
                                }`}
                                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {capacityPercentage.toFixed(0)}% capacity
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        <Link
                          href={`/events/${event._id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all"
                          title="View Event"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/events/${event._id}/edit`}
                          className="p-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                          title="Edit Event"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
                          title="Delete Event"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-600 mb-6">Create your first event to get started</p>
              <Link
                href="/events/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Event
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
