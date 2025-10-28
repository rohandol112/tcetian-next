import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Event from '@/models/Event';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Helper to verify JWT token
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

// GET /api/events - List all events with filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    const query: any = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      Event.find(query)
        .populate('organizer', 'name email profilePicture role clubName')
        .sort({ isFeatured: -1, date: 1 })
        .skip(skip)
        .limit(limit),
      Event.countDocuments(query),
    ]);

    // Convert to JSON to include virtuals
    const eventsWithVirtuals = events.map(event => event.toJSON());

    return NextResponse.json({
      success: true,
      events: eventsWithVirtuals,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event (Club only)
export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded || decoded.role !== 'club') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      capacity,
      registrationDeadline,
      tags,
      prizes,
      rules,
      requirements,
      contactInfo,
      images,
      coverImage,
    } = body;

    // Validation
    if (!title || !description || !category || !date || !time || !venue) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      category,
      organizer: decoded.userId,
      date: new Date(date),
      time,
      venue,
      capacity,
      registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : undefined,
      tags: tags || [],
      prizes: prizes || [],
      rules: rules || [],
      requirements: requirements || [],
      contactInfo,
      images: images || [],
      coverImage,
      registrations: [],
    });

    // Update club's createdEvents
    await User.findByIdAndUpdate(decoded.userId, {
      $push: { 'club.createdEvents': event._id },
    });

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      event,
    }, { status: 201 });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
