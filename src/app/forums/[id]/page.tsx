'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Send, Trash2, Reply } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useToast } from '@/lib/context/ToastContext'
import api from '@/lib/api'

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [params.id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response: any = await api.get(`/api/posts/${params.id}`)
      setPost(response.post)
    } catch (error) {
      console.error('Failed to fetch post:', error)
      showToast('Failed to load post', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response: any = await api.get(`/api/posts/${params.id}/comments`)
      setComments(response.comments || [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
  }

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!user) {
      showToast('Please login to vote', 'error')
      router.push('/login')
      return
    }

    try {
      // Check if clicking same vote again (toggle off)
      const currentUpvoted = post.upvotes?.some((id: any) => 
        id === user._id || id.toString() === user._id
      )
      const currentDownvoted = post.downvotes?.some((id: any) => 
        id === user._id || id.toString() === user._id
      )
      const currentVote = currentUpvoted ? 'upvote' : currentDownvoted ? 'downvote' : null
      
      if (currentVote === voteType) {
        // Remove vote
        await api.delete(`/api/posts/${params.id}/vote`)
        showToast('Vote removed', 'success')
      } else {
        // Add or change vote
        await api.post(`/api/posts/${params.id}/vote`, { voteType })
        showToast('Vote recorded', 'success')
      }
      
      await fetchPost()
    } catch (error: any) {
      console.error('Vote error:', error)
      showToast(error.message || 'Failed to vote', 'error')
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      showToast('Please login to comment', 'error')
      router.push('/login')
      return
    }

    if (!comment.trim()) return

    try {
      setSubmitting(true)
      await api.post(`/api/posts/${params.id}/comments`, { content: comment })
      setComment('')
      fetchComments()
      showToast('Comment added!', 'success')
    } catch (error: any) {
      showToast(error.message || 'Failed to add comment', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      await api.delete(`/api/comments/${commentId}`)
      fetchComments()
      showToast('Comment deleted', 'success')
    } catch (error: any) {
      showToast(error.message || 'Failed to delete comment', 'error')
    }
  }

  const handleReply = async (parentCommentId: string) => {
    if (!user) {
      showToast('Please login to reply', 'error')
      router.push('/login')
      return
    }

    if (!replyContent.trim()) return

    try {
      setSubmitting(true)
      await api.post(`/api/posts/${params.id}/comments`, { 
        content: replyContent,
        parentCommentId 
      })
      setReplyContent('')
      setReplyingTo(null)
      fetchComments()
      showToast('Reply posted!', 'success')
    } catch (error: any) {
      showToast(error.message || 'Failed to post reply', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Post not found</h2>
          <Link href="/forums" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mt-4 inline-block">
            Browse Forums
          </Link>
        </div>
      </div>
    )
  }

  const userVote = user && post.upvotes && post.downvotes && (
    post.upvotes.some((id: any) => id === user._id || id.toString() === user._id) ? 'upvote' : 
    post.downvotes.some((id: any) => id === user._id || id.toString() === user._id) ? 'downvote' : 
    null
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Link href="/forums" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Forums
        </Link>
      </div>

      {/* Post Content */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {post.author?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {post.author?.name || 'Anonymous'}
                {post.author?.role === 'club' && (
                  <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                    Club
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Vote Section */}
          <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
              <button
                onClick={() => handleVote('upvote')}
                className={`p-2 rounded-full transition-all ${
                  userVote === 'upvote'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <span className="font-bold text-gray-900 min-w-[2rem] text-center">
                {(post.upvotes?.length || 0) - (post.downvotes?.length || 0)}
              </span>
              <button
                onClick={() => handleVote('downvote')}
                className={`p-2 rounded-full transition-all ${
                  userVote === 'downvote'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">{post.commentCount || 0} comments</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleComment} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={submitting || !comment.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-2xl p-6 border border-blue-200/50 mb-6 text-center">
              <p className="text-gray-700 mb-4">Login to join the discussion</p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
              >
                Login
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments && comments.length > 0 ? (
              comments.map((comment: any) => (
                <div key={comment._id} className="bg-white rounded-2xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {comment.author?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{comment.author?.name || 'Anonymous'}</p>
                            {comment.author?.role === 'club' && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                Club
                              </span>
                            )}
                            <span className="text-gray-400">•</span>
                            <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                          </div>
                          <p className="text-gray-700 leading-relaxed mt-2">{comment.content}</p>
                          
                          {/* Comment Actions */}
                          <div className="flex items-center gap-4 mt-3">
                            {user && (
                              <button
                                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                              >
                                <Reply className="w-4 h-4" />
                                Reply
                              </button>
                            )}
                            {comment.replies && comment.replies.length > 0 && (
                              <span className="text-sm text-gray-500">
                                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {user && comment.author?._id === user._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                          title="Delete comment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment._id && (
                      <div className="mt-4 ml-13 border-l-2 border-blue-200 pl-4">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyContent('')
                            }}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleReply(comment._id)}
                            disabled={submitting || !replyContent.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                          >
                            {submitting ? 'Posting...' : 'Post Reply'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Nested Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 ml-13 space-y-4 border-l-2 border-gray-200 pl-4">
                        {comment.replies.map((reply: any) => (
                          <div key={reply._id} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {reply.author?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-900 text-sm">{reply.author?.name || 'Anonymous'}</p>
                                {reply.author?.role === 'club' && (
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                    Club
                                  </span>
                                )}
                                <span className="text-gray-400 text-xs">•</span>
                                <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                              </div>
                              <p className="text-gray-700 leading-relaxed text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
