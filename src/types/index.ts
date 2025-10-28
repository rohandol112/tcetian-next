// Type definitions for the application

export interface User {
  _id: string
  name: string
  email: string
  role: 'student' | 'club'
  profilePicture?: string
  
  // Student-specific fields
  studentId?: string
  year?: 'FE' | 'SE' | 'TE' | 'BE'
  branch?: string
  courseType?: string
  
  // Club-specific fields
  clubName?: string
  description?: string
  
  // Common fields
  rsvpEvents?: string[]
  eventsCreated?: string[]
  savedPosts?: string[]
  
  profileSettings?: {
    showEmail: boolean
    showYear: boolean
    showBranch: boolean
    allowMessages: boolean
  }
  
  socialStats?: {
    totalPosts: number
    totalComments: number
    totalUpvotes: number
    totalDownvotes: number
    reputation: number
  }
  
  createdAt: string
  updatedAt: string
}

export interface Event {
  _id: string
  title: string
  description: string
  organizer: User | string
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshop' | 'Seminar' | 'Competition' | 'Social' | 'Other'
  eventDate: string
  eventTime: string
  duration: number
  venue: string
  capacity: number
  registrationDeadline: string
  tags?: string[]
  requirements?: string[]
  prizes?: Array<{
    position: string
    description: string
  }>
  
  // RSVP system
  rsvpUsers: Array<{
    user: string
    rsvpDate: string
    status: 'confirmed' | 'waitlist' | 'cancelled'
  }>
  maxRSVP?: number
  
  // Status
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  
  // Analytics
  viewCount: number
  shareCount: number
  featured: boolean
  
  // Image
  image?: string
  
  // Computed fields
  currentRSVP?: number
  availableSpots?: number
  isFull?: boolean
  
  createdAt: string
  updatedAt: string
}

export interface Post {
  _id: string
  title: string
  content: string
  author: User | string
  category: 'Academic' | 'Events' | 'Study Group' | 'Placement' | 'Project' | 'Question' | 'Discussion' | 'Other'
  postType: 'text' | 'image' | 'link'
  image?: string
  tags?: string[]
  
  // Voting system
  upvotes: Array<{
    user: string
    votedAt: string
  }>
  downvotes: Array<{
    user: string
    votedAt: string
  }>
  
  // Comments
  comments: string[]
  
  // Stats
  viewCount: number
  
  // Moderation
  isLocked: boolean
  isPinned: boolean
  isHidden: boolean
  
  // Filtering
  targetYear?: string
  targetBranch?: string
  
  // Computed
  voteCount?: number
  commentCount?: number
  
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  content: string
  author: User | string
  post: string
  parentComment?: string
  replies: string[]
  depth: number
  
  // Voting
  upvotes: Array<{
    user: string
    votedAt: string
  }>
  downvotes: Array<{
    user: string
    votedAt: string
  }>
  
  // Meta
  isDeleted: boolean
  isEdited: boolean
  editedAt?: string
  
  // Computed
  voteCount?: number
  
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface AuthResponse {
  success: boolean
  token: string
  user: User
}

export interface ErrorResponse {
  success: false
  error: string
  message: string
}
