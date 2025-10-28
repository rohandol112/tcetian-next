import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const sort = searchParams.get('sort') || 'recent'
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query: any = { isHidden: false }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ]
    }

    let sortQuery: any = {}
    if (sort === 'trending') {
      sortQuery = { createdAt: -1 }
    } else {
      sortQuery = { createdAt: -1 }
    }

    const posts = await Post.find(query)
      .populate('author', 'name email role clubName')
      .sort(sortQuery)
      .limit(50)

    // Calculate vote scores and sort by trending if needed
    const postsWithScores = posts.map((post: any) => {
      const postObj = post.toObject();
      return {
        ...postObj,
        voteScore: (postObj.upvotes?.length || 0) - (postObj.downvotes?.length || 0)
      };
    });

    // Sort by vote score for trending
    if (sort === 'trending') {
      postsWithScores.sort((a, b) => {
        if (b.voteScore !== a.voteScore) {
          return b.voteScore - a.voteScore
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    }

    return NextResponse.json({ success: true, posts: postsWithScores })
  } catch (error: any) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
    const { title, content, category, tags } = body

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const post = await Post.create({
      title,
      content,
      author: user._id,
      category: category || 'Discussion',
      postType: 'text',
      tags: tags || [],
    })

    await post.populate('author', 'name email role clubName')

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create post:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
