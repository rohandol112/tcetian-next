import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Event from '@/models/Event';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
}

// GET /api/events/[id]/registrations - Get all registered students (Club only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const event = await Event.findById(id).populate('organizer', 'club.clubName');
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if user is the organizer
    if (event.organizer._id.toString() !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only event organizer can view registrations' },
        { status: 403 }
      );
    }

    // Get all registered students with their details
    const registrations = await User.find({
      _id: { $in: event.registrations }
    }).select('name email student.branch student.year student.courseType student.studentId').lean();

    // Format the data
    const formattedRegistrations = registrations.map((user: any) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      studentId: user.student?.studentId || 'N/A',
      branch: user.student?.branch || 'N/A',
      year: user.student?.year || 'N/A',
      courseType: user.student?.courseType || 'N/A',
    }));

    return NextResponse.json({
      success: true,
      registrations: formattedRegistrations,
      totalCount: formattedRegistrations.length,
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
