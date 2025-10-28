import { z } from 'zod'

// User validation schemas
export const studentRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  studentId: z.string().min(1, 'Student ID is required'),
  year: z.enum(['FE', 'SE', 'TE', 'BE'], {
    errorMap: () => ({ message: 'Please select a valid year' }),
  }),
  branch: z.enum([
    'COMPS', 'IT', 'AI&DS', 'AI&ML', 'CIVIL', 'CS&E', 'E&CS', 
    'E&TC', 'IoT', 'MECH', 'M&ME', 'BCA', 'MCA', 'MBA', 'BVOC'
  ], {
    errorMap: () => ({ message: 'Please select a valid branch' }),
  }),
  courseType: z.enum(['Engineering', 'Management', 'Computer Applications', 'Vocational'], {
    errorMap: () => ({ message: 'Please select a course type' }),
  }),
})

export const clubRegistrationSchema = z.object({
  clubName: z.string().min(3, 'Club name must be at least 3 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['student', 'club']),
})

// Event validation schemas
export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  category: z.enum([
    'Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 
    'Competition', 'Social', 'Other'
  ]),
  eventDate: z.string().datetime('Invalid date format'),
  eventTime: z.string().min(1, 'Event time is required'),
  duration: z.number().min(1).max(480, 'Duration must be between 1-480 minutes'),
  venue: z.string().min(2, 'Venue is required').max(200),
  capacity: z.number().min(1).max(10000),
  registrationDeadline: z.string().datetime('Invalid date format'),
  tags: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  prizes: z.array(z.object({
    position: z.string(),
    description: z.string(),
  })).optional(),
  maxRSVP: z.number().min(1).optional(),
})

export const updateEventSchema = createEventSchema.partial()

// Post validation schemas
export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(300),
  content: z.string().min(10, 'Content must be at least 10 characters').max(10000),
  category: z.enum([
    'Academic', 'Events', 'Study Group', 'Placement', 'Project', 
    'Question', 'Discussion', 'Other'
  ]),
  postType: z.enum(['text', 'image', 'link']),
  image: z.string().url().optional(),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags allowed').optional(),
  targetYear: z.string().optional(),
  targetBranch: z.string().optional(),
})

export const updatePostSchema = createPostSchema.partial()

// Comment validation schemas
export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(2000),
  postId: z.string(),
  parentCommentId: z.string().optional(),
})

export const updateCommentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(2000),
})

// Profile update schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  profilePicture: z.string().url().optional(),
  profileSettings: z.object({
    showEmail: z.boolean().optional(),
    showYear: z.boolean().optional(),
    showBranch: z.boolean().optional(),
    allowMessages: z.boolean().optional(),
  }).optional(),
})

// Types derived from schemas
export type StudentRegistrationInput = z.infer<typeof studentRegistrationSchema>
export type ClubRegistrationInput = z.infer<typeof clubRegistrationSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CreateEventInput = z.infer<typeof createEventSchema>
export type UpdateEventInput = z.infer<typeof updateEventSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
