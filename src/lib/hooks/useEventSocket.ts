import { useEffect } from 'react'
import { useSocket } from '@/lib/context/SocketContext'

interface EventSocketCallbacks {
  onRSVPUpdate?: (data: { eventId: string; userId: string; action: 'add' | 'remove' }) => void
  onEventCreated?: (data: { event: any }) => void
  onEventUpdated?: (data: { eventId: string; event: any }) => void
  onEventDeleted?: (data: { eventId: string }) => void
}

export function useEventSocket(eventId: string | null, callbacks: EventSocketCallbacks) {
  const { socket, connected } = useSocket()

  useEffect(() => {
    if (!socket || !connected) return

    // Join event room if eventId is provided
    if (eventId) {
      socket.emit('join_event', { eventId })
      console.log(`📡 Joined event room: ${eventId}`)
    }

    // Listen for RSVP updates
    if (callbacks.onRSVPUpdate) {
      socket.on('event:rsvp_update', callbacks.onRSVPUpdate)
    }

    // Listen for new events
    if (callbacks.onEventCreated) {
      socket.on('event:created', callbacks.onEventCreated)
    }

    // Listen for event updates
    if (callbacks.onEventUpdated) {
      socket.on('event:updated', callbacks.onEventUpdated)
    }

    // Listen for event deletions
    if (callbacks.onEventDeleted) {
      socket.on('event:deleted', callbacks.onEventDeleted)
    }

    // Cleanup
    return () => {
      if (eventId) {
        socket.emit('leave_event', { eventId })
      }
      socket.off('event:rsvp_update')
      socket.off('event:created')
      socket.off('event:updated')
      socket.off('event:deleted')
    }
  }, [socket, connected, eventId, callbacks])

  return { socket, connected }
}
