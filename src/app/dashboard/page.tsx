'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, MessageSquare, TrendingUp, Users, Plus, Clock, MapPin } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [myPosts, setMyPosts] = useState<any[]>([])
  const [stats, setStats] = useState({
    eventsAttending: 0,
    postsCreated: 0,
    totalEngagement: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    
    // Redirect clubs to club dashboard
    if (user.role === 'club') {
      router.push('/dashboard/club')
      return
    }
    
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      
      // Fetch user's RSVP'd events
      const eventsResponse: any = await api.get('/api/events?rsvped=true&limit=5')
      setUpcomingEvents(eventsResponse.events || [])
      
      // Fetch user's posts
      const postsResponse: any = await api.get('/api/posts?limit=5')
      const userPosts = postsResponse.posts?.filter((post: any) => 
        post.author?._id === user._id
      ) || []
      setMyPosts(userPosts)
      
      // Calculate stats
      setStats({
        eventsAttending: eventsResponse.events?.length || 0,
        postsCreated: userPosts.length,
        totalEngagement: userPosts.reduce((acc: number, post: any) => 
          acc + (post.upvotes?.length || 0) + (post.commentCount || 0), 0
        )
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
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

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            {user?.branch && user?.year 
              ? `${user.branch} • Year ${user.year}` 
              : 'Student Dashboard'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Events Attending */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Events Attending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.eventsAttending}</p>
              </div>
            </div>
          </div>

          {/* Posts Created */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Forum Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.postsCreated}</p>
              </div>
            </div>
          </div>

          {/* Total Engagement */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-6 border border-cyan-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Engagement</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEngagement}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
              <Link
                href="/events"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All
              </Link>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event: any) => (
                  <Link
                    key={event._id}
                    href={`/events/${event._id}`}
                    className="block p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      {event.venue && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No upcoming events</p>
                <Link
                  href="/events"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
                >
                  Explore Events
                </Link>
              </div>
            )}
          </div>

          {/* My Recent Posts */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Recent Posts</h2>
              <Link
                href="/forums/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all text-sm inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Post
              </Link>
            </div>

            {myPosts.length > 0 ? (
              <div className="space-y-4">
                {myPosts.map((post: any) => (
                  <Link
                    key={post._id}
                    href={`/forums/${post._id}`}
                    className="block p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{(post.upvotes?.length || 0) - (post.downvotes?.length || 0)} votes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.commentCount || 0} comments</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You haven&apos;t posted anything yet</p>
                <Link
                  href="/forums/create"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
                >
                  Create Your First Post
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/events"
              className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-md transition-all group"
            >
              <Calendar className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Browse Events</h3>
              <p className="text-sm text-gray-600">Discover upcoming events and register</p>
            </Link>

            <Link
              href="/forums"
              className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-md transition-all group"
            >
              <MessageSquare className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Community Forums</h3>
              <p className="text-sm text-gray-600">Join discussions and connect</p>
            </Link>

            <Link
              href="/profile"
              className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl hover:shadow-md transition-all group"
            >
              <Users className="w-8 h-8 text-cyan-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">My Profile</h3>
              <p className="text-sm text-gray-600">View and update your profile</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
