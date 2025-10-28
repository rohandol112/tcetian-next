import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'
import { connectDB } from './db'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'tcetian-super-secret-jwt-key-for-development-2025'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  role: 'student' | 'club'
  iat?: number
  exp?: number
}

// Generate JWT token
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12')
  return bcrypt.hash(password, saltRounds)
}

// Compare password
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Get user from token (client-side)
export function getUserFromToken(): JWTPayload | null {
  if (typeof window === 'undefined') return null
  
  const token = localStorage.getItem('token')
  if (!token) return null
  
  return verifyToken(token)
}

// Check if user is authenticated (client-side)
export function isAuthenticated(): boolean {
  return getUserFromToken() !== null
}

// Clear auth data (client-side)
export function clearAuthData(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// Get authenticated user from request (server-side for API routes)
export async function getAuthUser(request: NextRequest) {
  try {
    // Try to get token from cookies first
    let token = request.cookies.get('token')?.value
    
    // If not in cookies, check Authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }
    
    if (!token) {
      return null
    }
    
    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return null
    }
    
    // Connect to DB and get user
    await connectDB()
    const user = await User.findById(payload.userId).select('-password')
    
    return user
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}
