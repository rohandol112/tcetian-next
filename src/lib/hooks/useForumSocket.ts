import { useEffect } from 'react'
import { useSocket } from '@/lib/context/SocketContext'

interface ForumSocketCallbacks {
  onNewPost?: (data: { post: any }) => void
  onPostVote?: (data: { postId: string; voteType: 'upvote' | 'downvote'; userId: string }) => void
  onNewComment?: (data: { postId: string; comment: any }) => void
  onCommentDelete?: (data: { postId: string; commentId: string }) => void
}

export function useForumSocket(postId: string | null, callbacks: ForumSocketCallbacks) {
  const { socket, connected } = useSocket()

  useEffect(() => {
    if (!socket || !connected) return

    // Join post room if postId is provided
    if (postId) {
      socket.emit('join_post', { postId })
      console.log(`📡 Joined post room: ${postId}`)
    }

    // Listen for new posts
    if (callbacks.onNewPost) {
      socket.on('forum:new_post', callbacks.onNewPost)
    }

    // Listen for vote updates
    if (callbacks.onPostVote) {
      socket.on('forum:post_vote', callbacks.onPostVote)
    }

    // Listen for new comments
    if (callbacks.onNewComment) {
      socket.on('forum:new_comment', callbacks.onNewComment)
    }

    // Listen for comment deletions
    if (callbacks.onCommentDelete) {
      socket.on('forum:comment_delete', callbacks.onCommentDelete)
    }

    // Cleanup
    return () => {
      if (postId) {
        socket.emit('leave_post', { postId })
      }
      socket.off('forum:new_post')
      socket.off('forum:post_vote')
      socket.off('forum:new_comment')
      socket.off('forum:comment_delete')
    }
  }, [socket, connected, postId, callbacks])

  return { socket, connected }
}
