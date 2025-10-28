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

// POST /api/events/[id]/rsvp - RSVP to event (Student only)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = verifyToken(request);
    if (!decoded || decoded.role !== 'student') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    // Get student details to check eligibility
    const user = await User.findById(decoded.userId);
    if (!user || !user.student) {
      return NextResponse.json(
        { success: false, message: 'Student profile not found' },
        { status: 400 }
      );
    }

    // Check eligibility based on branch, year, courseType
    if (event.eligibility) {
      const { branches, years, courseTypes } = event.eligibility;

      if (branches && branches.length > 0 && !branches.includes(user.student.branch)) {
        return NextResponse.json(
          { success: false, message: `This event is only for ${branches.join(', ')} students` },
          { status: 403 }
        );
      }

      if (years && years.length > 0 && !years.includes(user.student.year.toString()) && !years.includes(user.student.year)) {
        return NextResponse.json(
          { success: false, message: `This event is only for ${years.join(', ')} students` },
          { status: 403 }
        );
      }

      if (courseTypes && courseTypes.length > 0 && !courseTypes.includes(user.student.courseType)) {
        return NextResponse.json(
          { success: false, message: `This event is only for ${courseTypes.join(', ')} students` },
          { status: 403 }
        );
      }
    }

    // Check if already registered
    if (event.registrations.includes(decoded.userId)) {
      return NextResponse.json(
        { success: false, message: 'Already registered for this event' },
        { status: 400 }
      );
    }

    // Check capacity
    if (event.capacity && event.registrations.length >= event.capacity) {
      return NextResponse.json(
        { success: false, message: 'Event is full' },
        { status: 400 }
      );
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return NextResponse.json(
        { success: false, message: 'Registration deadline has passed' },
        { status: 400 }
      );
    }

    // Add to registrations
    event.registrations.push(decoded.userId);
    await event.save();

    // Update student's rsvpedEvents
    await User.findByIdAndUpdate(decoded.userId, {
      $push: { 'student.rsvpedEvents': event._id },
    });

    // Get updated registration count
    const updatedEvent = await Event.findById(params.id).select('registrations');
    const registrationCount = updatedEvent?.registrations.length || 0;

    return NextResponse.json({
      success: true,
      message: 'RSVP successful',
      registrationCount,
      eventId: params.id,
    });
  } catch (error) {
    console.error('RSVP error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]/rsvp - Cancel RSVP (Student only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = verifyToken(request);
    if (!decoded || decoded.role !== 'student') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    // Remove from registrations
    event.registrations = event.registrations.filter(
      (id) => id.toString() !== decoded.userId
    );
    await event.save();

    // Update student's rsvpedEvents
    await User.findByIdAndUpdate(decoded.userId, {
      $pull: { 'student.rsvpedEvents': event._id },
    });

    // Get updated registration count
    const updatedEvent = await Event.findById(params.id).select('registrations');
    const registrationCount = updatedEvent?.registrations.length || 0;

    return NextResponse.json({
      success: true,
      message: 'RSVP cancelled successfully',
      registrationCount,
      eventId: params.id,
    });
  } catch (error) {
    console.error('Cancel RSVP error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
