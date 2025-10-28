import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file');
}

// Initialize global mongoose object
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with connection pooling
 * Uses cached connection in development to prevent connection overload
 */
export async function connectDB() {
  if (global.mongoose.conn) {
    console.log('📦 Using cached MongoDB connection');
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('🔌 Connecting to MongoDB...');
    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
    console.log('✅ MongoDB connected successfully');
    return global.mongoose.conn;
  } catch (error) {
    global.mongoose.promise = null;
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB() {
  if (global.mongoose.conn) {
    await mongoose.disconnect();
    global.mongoose.conn = null;
    global.mongoose.promise = null;
    console.log('🔌 MongoDB disconnected');
  }
}

export default mongoose;
