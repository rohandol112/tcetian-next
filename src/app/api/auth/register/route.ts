import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password, role, ...additionalData } = body;

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create user data object
    const userData: any = {
      name,
      email,
      password,
      role,
    };

    // Add role-specific data
    if (role === 'student') {
      const { studentId, courseType, branch, year } = additionalData;
      
      if (!studentId || !courseType || !branch || !year) {
        return NextResponse.json(
          { success: false, message: 'Missing student information' },
          { status: 400 }
        );
      }

      // Check if student ID already exists
      const existingStudent = await User.findOne({ 'student.studentId': studentId });
      if (existingStudent) {
        return NextResponse.json(
          { success: false, message: 'Student ID already registered' },
          { status: 409 }
        );
      }

      userData.student = {
        studentId,
        courseType,
        branch,
        year: parseInt(year),
        rsvpedEvents: [],
        interests: additionalData.interests || [],
      };
    } else if (role === 'club') {
      const { clubName, description } = additionalData;
      
      if (!clubName || !description) {
        return NextResponse.json(
          { success: false, message: 'Missing club information' },
          { status: 400 }
        );
      }

      // Check if club name already exists
      const existingClub = await User.findOne({ 'club.clubName': clubName });
      if (existingClub) {
        return NextResponse.json(
          { success: false, message: 'Club name already registered' },
          { status: 409 }
        );
      }

      userData.club = {
        clubName,
        description,
        socialLinks: additionalData.socialLinks || {},
        members: 0,
        createdEvents: [],
      };
    }

    // Create user
    const user = await User.create(userData);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      token,
      user: userObject,
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
