import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'
import Post from '@/models/Post'
import Comment from '@/models/Comment'

// GET /api/posts/[id]/comments - Get all comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    // Verify post exists
    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // Get top-level comments (no parent)
    const comments = await Comment.find({ 
      post: params.id, 
      parentComment: null,
      isDeleted: false
    })
      .populate('author', 'name email role clubName')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'name email role clubName'
        }
      })
      .sort({ createdAt: -1 })

    return NextResponse.json({ 
      success: true, 
      comments 
    })
  } catch (error: any) {
    console.error('Failed to fetch comments:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/posts/[id]/comments - Add a comment to a post
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { content, parentCommentId } = body

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    // Verify post exists
    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // If parentCommentId is provided, verify it exists
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId)
      if (!parentComment) {
        return NextResponse.json(
          { success: false, error: 'Parent comment not found' },
          { status: 404 }
        )
      }
    }

    // Create the comment
    const comment = await Comment.create({
      content,
      author: user._id,
      post: params.id,
      parentComment: parentCommentId || null
    })

    // If this is a reply, add it to parent's replies array
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id }
      })
    }

    // Increment post's comment count
    await Post.findByIdAndUpdate(params.id, {
      $inc: { commentCount: 1 }
    })

    // Populate author before returning
    await comment.populate('author', 'name email role clubName')

    return NextResponse.json({ 
      success: true, 
      comment 
    }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to add comment:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
