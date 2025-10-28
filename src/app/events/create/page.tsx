'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, Trophy, ArrowLeft, Plus, X } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useToast } from '@/lib/context/ToastContext'
import api from '@/lib/api'

export default function CreateEventPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { showToast } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technical' as 'technical' | 'cultural' | 'sports' | 'workshop' | 'seminar' | 'hackathon' | 'competition' | 'other',
    date: '',
    time: '',
    venue: '',
    capacity: '',
    registrationDeadline: '',
    eligibleBranches: [] as string[],
    eligibleYears: [] as string[],
    eligibleCourseTypes: [] as string[],
    tags: [] as string[],
    prizes: [] as Array<{ position: string; amount: string; description: string }>,
    rules: [] as string[],
    requirements: [] as string[],
    contactEmail: '',
    contactPhone: '',
  })

  const [currentTag, setCurrentTag] = useState('')
  const [currentRule, setCurrentRule] = useState('')
  const [currentRequirement, setCurrentRequirement] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect if not a club
  if (user && user.role !== 'club') {
    router.push('/events')
    return null
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.venue) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    setLoading(true)

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: new Date(formData.date).toISOString(),
        time: formData.time,
        venue: formData.venue,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        registrationDeadline: formData.registrationDeadline ? new Date(formData.registrationDeadline).toISOString() : undefined,
        eligibility: {
          branches: formData.eligibleBranches.length > 0 ? formData.eligibleBranches : undefined,
          years: formData.eligibleYears.length > 0 ? formData.eligibleYears : undefined,
          courseTypes: formData.eligibleCourseTypes.length > 0 ? formData.eligibleCourseTypes : undefined,
        },
        tags: formData.tags,
        prizes: formData.prizes.filter(p => p.position && p.amount).map(p => ({
          position: p.position,
          amount: parseFloat(p.amount),
          description: p.description
        })),
        rules: formData.rules.filter(r => r.trim()),
        requirements: formData.requirements.filter(r => r.trim()),
        contactInfo: {
          email: formData.contactEmail || undefined,
          phone: formData.contactPhone || undefined,
        }
      }

      const response: any = await api.post('/api/events', payload)
      showToast('Event created successfully!', 'success')
      router.push(`/events/${response.event._id}`)
    } catch (error: any) {
      console.error('Failed to create event:', error)
      showToast(error.message || 'Failed to create event', 'error')
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }))
      setCurrentTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const addPrize = () => {
    setFormData(prev => ({
      ...prev,
      prizes: [...prev.prizes, { position: '', amount: '', description: '' }]
    }))
  }

  const removePrize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index)
    }))
  }

  const updatePrize = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }))
  }

  const addRule = () => {
    if (currentRule.trim()) {
      setFormData(prev => ({ ...prev, rules: [...prev.rules, currentRule.trim()] }))
      setCurrentRule('')
    }
  }

  const removeRule = (index: number) => {
    setFormData(prev => ({ ...prev, rules: prev.rules.filter((_, i) => i !== index) }))
  }

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData(prev => ({ ...prev, requirements: [...prev.requirements, currentRequirement.trim()] }))
      setCurrentRequirement('')
    }
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({ ...prev, requirements: prev.requirements.filter((_, i) => i !== index) }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Event</h1>
          <p className="text-gray-600">Fill in the details to create an exciting event for TCET students</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">Basic Information</h2>
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., TechFest 2025 Hackathon"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe your event in detail..."
                rows={5}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['technical', 'cultural', 'sports', 'workshop', 'seminar', 'hackathon', 'competition', 'other'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat as any }))}
                    className={`px-4 py-3 rounded-xl border-2 transition-all font-medium capitalize ${
                      formData.category === cat
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date, Time & Venue */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">When & Where</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Event Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Venue *
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Auditorium, Room 301, Online (Zoom)"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Capacity (Optional)
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Maximum participants"
                  min="1"
                />
              </div>

              {/* Registration Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Deadline (Optional)</label>
                <input
                  type="date"
                  value={formData.registrationDeadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Eligibility Criteria (Optional)</h3>
              <p className="text-sm text-gray-600">Leave empty if event is open to all students</p>
              
              {/* Branches */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligible Branches</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['AI&DS', 'AI&ML', 'CIVIL', 'COMPS', 'CS&E', 'E&CS', 'E&TC', 'IoT', 'IT', 'MECH', 'M&ME', 'BCA', 'MCA', 'MBA', 'BVOC'].map(branch => (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          eligibleBranches: prev.eligibleBranches.includes(branch)
                            ? prev.eligibleBranches.filter(b => b !== branch)
                            : [...prev.eligibleBranches, branch]
                        }))
                      }}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        formData.eligibleBranches.includes(branch)
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Years */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligible Years</label>
                <div className="grid grid-cols-4 gap-2">
                  {['FE', 'SE', 'TE', 'BE'].map(year => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          eligibleYears: prev.eligibleYears.includes(year)
                            ? prev.eligibleYears.filter(y => y !== year)
                            : [...prev.eligibleYears, year]
                        }))
                      }}
                      className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                        formData.eligibleYears.includes(year)
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligible Course Types</label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {['btech', 'mtech', 'diploma', 'bca', 'mca', 'mba', 'bvoc'].map(courseType => (
                    <button
                      key={courseType}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          eligibleCourseTypes: prev.eligibleCourseTypes.includes(courseType)
                            ? prev.eligibleCourseTypes.filter(c => c !== courseType)
                            : [...prev.eligibleCourseTypes, courseType]
                        }))
                      }}
                      className={`px-4 py-2 rounded-lg border font-medium transition-all capitalize ${
                        formData.eligibleCourseTypes.includes(courseType)
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {courseType.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">Tags</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add tags (e.g., AI, ML, Web Development)"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium inline-flex items-center gap-2">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-800">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Prizes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3 flex-1">
                <Trophy className="w-6 h-6 inline mr-2" />
                Prizes (Optional)
              </h2>
              <button
                type="button"
                onClick={addPrize}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4 inline mr-1" />
                Add Prize
              </button>
            </div>
            {formData.prizes.map((prize, index) => (
              <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                <input
                  type="text"
                  value={prize.position}
                  onChange={(e) => updatePrize(index, 'position', e.target.value)}
                  placeholder="Position (1st, 2nd)"
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={prize.amount}
                  onChange={(e) => updatePrize(index, 'amount', e.target.value)}
                  placeholder="Amount (₹)"
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={prize.description}
                  onChange={(e) => updatePrize(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removePrize(index)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.club@tcetmumbai.in"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Event...' : 'Create Event'}
              {!loading && <Calendar className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
