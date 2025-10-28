'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle2, Award, Info, Mail, Phone } from 'lucide-react'
import api from '@/lib/api'
import { useAuth } from '@/lib/context/AuthContext'
import { useToast } from '@/lib/context/ToastContext'

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [rsvping, setRsvping] = useState(false)

  useEffect(() => {
    fetchEvent()
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchEvent, 10000)
    return () => clearInterval(interval)
  }, [params.id])

  const fetchEvent = async () => {
    try {
      setLoading(true)
      const response: any = await api.get(`/api/events/${params.id}`)
      setEvent(response.event)
    } catch (error) {
      console.error('Failed to fetch event:', error)
      showToast('Failed to load event', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleRSVP = async () => {
    if (!user) {
      showToast('Please login to RSVP', 'error')
      router.push('/login')
      return
    }

    if (user.role !== 'student') {
      showToast('Only students can RSVP to events', 'error')
      return
    }

    try {
      setRsvping(true)
      const isRegistered = event.registrations.some((r: any) => r._id === user._id)
      
      if (isRegistered) {
        await api.delete(`/api/events/${params.id}/rsvp`)
        showToast('RSVP cancelled successfully', 'success')
      } else {
        await api.post(`/api/events/${params.id}/rsvp`, {})
        showToast('RSVP successful!', 'success')
      }
      
      fetchEvent()
    } catch (error: any) {
      showToast(error.message || 'RSVP failed', 'error')
    } finally {
      setRsvping(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading event...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Event not found</h2>
          <Link href="/events" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mt-4 inline-block">
            Browse Events
          </Link>
        </div>
      </div>
    )
  }

  const isRegistered = user && event.registrations.some((r: any) => r._id === user._id)
  const spotsLeft = event.capacity ? event.capacity - event.registrations.length : null
  const registrationDeadlinePassed = event.registrationDeadline && new Date(event.registrationDeadline) < new Date()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Back Button & Manage Button */}
      <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
        <Link href="/events" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </Link>
        
        {/* Manage Event Button for Club Organizers */}
        {user?.role === 'club' && event.organizer?._id === user._id && (
          <Link
            href={`/events/${params.id}/manage`}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Manage Event
          </Link>
        )}
      </div>

      {/* Event Header */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

          {/* Organizer */}
          <p className="text-gray-600 mb-6">
            Organized by <span className="font-semibold text-gray-900">{event.organizer?.clubName || 'Unknown'}</span>
          </p>

          {/* Quick Stats - Light Gradient Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-2xl p-4 border border-blue-200/50">
              <Calendar className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Date</p>
              <p className="font-semibold text-gray-900">{new Date(event.date).toLocaleDateString()}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-4 border border-purple-200/50">
              <Clock className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Time</p>
              <p className="font-semibold text-gray-900">{event.time || 'TBA'}</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-50 rounded-2xl p-4 border border-cyan-200/50">
              <MapPin className="w-5 h-5 text-cyan-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Venue</p>
              <p className="font-semibold text-gray-900">{event.venue}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-2xl p-4 border border-emerald-200/50">
              <Users className="w-5 h-5 text-emerald-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Attendees</p>
              <p className="font-semibold text-gray-900">
                {event.registrations.length}{event.capacity ? `/${event.capacity}` : ''}
              </p>
            </div>
          </div>

          {/* RSVP Button */}
          {user?.role === 'student' && !registrationDeadlinePassed && (
            <button
              onClick={handleRSVP}
              disabled={rsvping || (spotsLeft !== null && spotsLeft <= 0)}
              className={`w-full md:w-auto px-8 py-3 rounded-full font-medium transition-all ${
                isRegistered
                  ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {rsvping ? 'Processing...' : isRegistered ? 'Cancel RSVP' : 'RSVP Now'}
            </button>
          )}

          {registrationDeadlinePassed && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-full text-sm font-medium">
              Registration deadline has passed
            </div>
          )}

          {spotsLeft !== null && spotsLeft <= 0 && !registrationDeadlinePassed && (
            <div className="bg-orange-50 text-orange-600 px-4 py-3 rounded-full text-sm font-medium">
              Event is full
            </div>
          )}
        </div>
      </section>

      {/* Event Details */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Description */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prizes */}
            {event.prizes && event.prizes.length > 0 && (
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Prizes
                </h3>
                <div className="space-y-2">
                  {event.prizes.map((prize: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-200/50">
                      <span className="text-2xl">{prize.position === 1 ? '🥇' : prize.position === 2 ? '🥈' : '🥉'}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{prize.position === 1 ? 'First' : prize.position === 2 ? 'Second' : 'Third'} Place</p>
                        <p className="text-gray-600">{prize.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            {event.contactInfo && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                  <Info className="w-5 h-5 text-blue-600" />
                  Contact
                </h3>
                <div className="space-y-3">
                  {event.contactInfo.name && (
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">Name:</span> {event.contactInfo.name}
                    </p>
                  )}
                  {event.contactInfo.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${event.contactInfo.email}`} className="hover:text-blue-600 transition-colors">
                        {event.contactInfo.email}
                      </a>
                    </div>
                  )}
                  {event.contactInfo.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${event.contactInfo.phone}`} className="hover:text-blue-600 transition-colors">
                        {event.contactInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Registration Info */}
            <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-3xl p-6 border border-blue-200/50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Registration Info</h3>
              <div className="space-y-3">
                {event.registrationDeadline && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Deadline</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(event.registrationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {event.capacity && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Spots Remaining</p>
                    <p className="font-semibold text-gray-900">{spotsLeft} / {event.capacity}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Current Registrations</p>
                  <p className="font-semibold text-gray-900">{event.registrations.length}</p>
                </div>
              </div>
            </div>

            {/* Registered Badge */}
            {isRegistered && (
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-3xl p-6 border border-emerald-200/50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="font-bold text-gray-900">You&apos;re registered!</p>
                    <p className="text-sm text-gray-600">See you at the event</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
