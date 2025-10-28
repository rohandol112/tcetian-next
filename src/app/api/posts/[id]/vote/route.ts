import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'
import Post from '@/models/Post'

// POST /api/posts/[id]/vote - Upvote or downvote a post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB()

    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { voteType } = body // 'upvote' or 'downvote'

    if (!voteType || !['upvote', 'downvote'].includes(voteType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid vote type. Use "upvote" or "downvote"' },
        { status: 400 }
      )
    }

    const post = await Post.findById(id)
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    const userId = user._id ? user._id.toString() : user.id?.toString()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      )
    }

    // Initialize arrays if they don't exist
    if (!post.upvotes) post.upvotes = []
    if (!post.downvotes) post.downvotes = []

    // Remove user from both arrays first (toggle behavior)
    post.upvotes = post.upvotes.filter((id: any) => id.toString() !== userId)
    post.downvotes = post.downvotes.filter((id: any) => id.toString() !== userId)

    // Add to the appropriate array
    if (voteType === 'upvote') {
      post.upvotes.push(userId as any)
    } else {
      post.downvotes.push(userId as any)
    }

    await post.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Vote recorded',
      upvotesCount: post.upvotes.length,
      downvotesCount: post.downvotes.length,
      userVote: voteType
    })
  } catch (error: any) {
    console.error('Failed to vote on post:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to vote on post' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id]/vote - Remove vote from a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const post = await Post.findById(id)
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    const userId = user._id ? user._id.toString() : user.id?.toString()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      )
    }

    // Initialize arrays if they don't exist
    if (!post.upvotes) post.upvotes = []
    if (!post.downvotes) post.downvotes = []

    // Remove user from both arrays
    post.upvotes = post.upvotes.filter((id: any) => id.toString() !== userId)
    post.downvotes = post.downvotes.filter((id: any) => id.toString() !== userId)

    await post.save()

    return NextResponse.json({ 
      success: true,
      message: 'Vote removed', 
      upvotesCount: post.upvotes.length,
      downvotesCount: post.downvotes.length,
      userVote: null
    })
  } catch (error: any) {
    console.error('Failed to remove vote from post:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to remove vote' },
      { status: 500 }
    )
  }
}
