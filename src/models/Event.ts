import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPrize {
  position: string;
  amount: number;
  description?: string;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  category: 'technical' | 'cultural' | 'sports' | 'workshop' | 'seminar' | 'hackathon' | 'competition' | 'other';
  organizer: mongoose.Types.ObjectId;
  organizerModel: 'User';
  date: Date;
  time: string;
  venue: string;
  capacity?: number;
  registrationDeadline?: Date;
  eligibility?: {
    branches?: string[];
    years?: string[];
    courseTypes?: string[];
  };
  tags: string[];
  prizes?: IPrize[];
  rules?: string[];
  requirements?: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  images?: string[];
  coverImage?: string;
  registrations: mongoose.Types.ObjectId[];
  isActive: boolean;
  isFeatured: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PrizeSchema = new Schema<IPrize>({
  position: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
});

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['technical', 'cultural', 'sports', 'workshop', 'seminar', 'hackathon', 'competition', 'other'],
      required: true,
    },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organizerModel: { type: String, default: 'User' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    capacity: { type: Number },
    registrationDeadline: { type: Date },
    eligibility: {
      branches: [{ type: String }],
      years: [{ type: String }],
      courseTypes: [{ type: String }],
    },
    tags: [{ type: String }],
    prizes: [PrizeSchema],
    rules: [{ type: String }],
    requirements: [{ type: String }],
    contactInfo: {
      email: String,
      phone: String,
    },
    images: [{ type: String }],
    coverImage: { type: String },
    registrations: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for registration count
EventSchema.virtual('registrationCount').get(function () {
  return this.registrations?.length || 0;
});

// Virtual for spots remaining
EventSchema.virtual('spotsRemaining').get(function () {
  if (!this.capacity) return null;
  return this.capacity - (this.registrations?.length || 0);
});

// Indexes
EventSchema.index({ organizer: 1 });
EventSchema.index({ category: 1 });
EventSchema.index({ date: 1 });
EventSchema.index({ tags: 1 });
EventSchema.index({ isActive: 1, isFeatured: -1 });
EventSchema.index({ createdAt: -1 });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
