'use client'

import { useEffect, useRef } from 'react'

/**
 * Vercel-compatible real-time updates using polling
 * Since Vercel doesn't support WebSockets, we use short polling
 */

export function useEventUpdates(eventId: string | null, onUpdate: (data: any) => void) {
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!eventId) return

    // Poll every 5 seconds for updates
    intervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (response.ok) {
          const data = await response.json()
          onUpdate(data.event)
        }
      } catch (error) {
        console.error('Failed to fetch event updates:', error)
      }
    }, 5000) // Poll every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [eventId, onUpdate])
}

export function useForumUpdates(postId: string | null, onUpdate: (data: any) => void) {
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!postId) return

    // Poll every 10 seconds for new comments
    intervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`)
        if (response.ok) {
          const data = await response.json()
          onUpdate(data)
        }
      } catch (error) {
        console.error('Failed to fetch comment updates:', error)
      }
    }, 10000) // Poll every 10 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [postId, onUpdate])
}
