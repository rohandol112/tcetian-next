import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'
import Post from '@/models/Post'

// GET /api/posts/[id] - Get a single post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const post = await Post.findById(params.id)
      .populate('author', 'name email role clubName')
      .lean()

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    // Ensure arrays exist
    if (!post.upvotes) post.upvotes = []
    if (!post.downvotes) post.downvotes = []

    return NextResponse.json({ success: true, post })
  } catch (error: any) {
    console.error('Failed to fetch post:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[id] - Update a post (author only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    const userId = user._id ? user._id.toString() : (user as any).id?.toString()

    // Check if user is the author
    if (post.author.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: You can only edit your own posts' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content, category, tags } = body

    // Update fields
    if (title) post.title = title
    if (content) post.content = content
    if (category) post.category = category
    if (tags) post.tags = tags

    await post.save()
    await post.populate('author', 'name email role clubName')

    return NextResponse.json({ success: true, post })
  } catch (error: any) {
    console.error('Failed to update post:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - Delete a post (author only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    const userId = user._id ? user._id.toString() : (user as any).id?.toString()

    // Check if user is the author
    if (post.author.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: You can only delete your own posts' },
        { status: 403 }
      )
    }

    await post.deleteOne()

    return NextResponse.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    })
  } catch (error: any) {
    console.error('Failed to delete post:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete post' },
      { status: 500 }
    )
  }
}
