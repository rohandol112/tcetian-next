import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Student Interface
export interface IStudent {
  studentId: string;
  courseType: 'btech' | 'mtech' | 'diploma' | 'bca' | 'mca' | 'mba' | 'bvoc';
  branch: 'AI&DS' | 'AI&ML' | 'CIVIL' | 'COMPS' | 'CS&E' | 'E&CS' | 'E&TC' | 'IoT' | 'IT' | 'MECH' | 'M&ME' | 'BCA' | 'MCA' | 'MBA' | 'BVOC';
  year: 'FE' | 'SE' | 'TE' | 'BE' | '1' | '2' | '3' | '4';
  rsvpedEvents: mongoose.Types.ObjectId[];
  interests: string[];
}

// Club Interface
export interface IClub {
  clubName: string;
  description: string;
  socialLinks?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
  };
  members: number;
  createdEvents: mongoose.Types.ObjectId[];
}

// User Document Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'club' | 'admin';
  profilePicture?: string;
  isVerified: boolean;
  isActive: boolean;
  student?: IStudent;
  club?: IClub;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const StudentSchema = new Schema<IStudent>({
  studentId: { type: String, required: true, unique: true },
  courseType: { 
    type: String, 
    enum: ['btech', 'mtech', 'diploma', 'bca', 'mca', 'mba', 'bvoc'], 
    required: true 
  },
  branch: { 
    type: String, 
    enum: ['AI&DS', 'AI&ML', 'CIVIL', 'COMPS', 'CS&E', 'E&CS', 'E&TC', 'IoT', 'IT', 'MECH', 'M&ME', 'BCA', 'MCA', 'MBA', 'BVOC'],
    required: true 
  },
  year: { 
    type: String, 
    enum: ['FE', 'SE', 'TE', 'BE', '1', '2', '3', '4'],
    required: true 
  },
  rsvpedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  interests: [{ type: String }],
});

const ClubSchema = new Schema<IClub>({
  clubName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  socialLinks: {
    website: String,
    instagram: String,
    linkedin: String,
  },
  members: { type: Number, default: 0 },
  createdEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: { type: String, required: true, minlength: 6 },
    role: { 
      type: String, 
      enum: ['student', 'club', 'admin'], 
      default: 'student',
      required: true,
    },
    profilePicture: { type: String },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    student: { type: StudentSchema },
    club: { type: ClubSchema },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'student.studentId': 1 }, { sparse: true });
UserSchema.index({ 'club.clubName': 1 }, { sparse: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
