import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  replies: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    isDeleted: { type: Boolean, default: false },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for vote score
CommentSchema.virtual('voteScore').get(function () {
  return (this.upvotes?.length || 0) - (this.downvotes?.length || 0);
});

// Indexes
CommentSchema.index({ post: 1, createdAt: 1 });
CommentSchema.index({ author: 1 });
CommentSchema.index({ parentComment: 1 });

// Update post comment count when comment is created
CommentSchema.post('save', async function () {
  const Post = mongoose.model('Post');
  await Post.findByIdAndUpdate(this.post, {
    $inc: { commentCount: 1 },
  });
});

// Update post comment count when comment is deleted
CommentSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    const Post = mongoose.model('Post');
    await Post.findByIdAndUpdate(doc.post, {
      $inc: { commentCount: -1 },
    });
  }
});

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
