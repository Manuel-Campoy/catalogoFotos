import { useCallback } from 'react'
import { useNotificationStore } from '../store/store'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export const useNotification = () => {
  const { addNotification } = useNotificationStore()

  const notify = useCallback(
    (message: string, type: NotificationType = 'info', duration = 3000) => {
      const id = Date.now()
      addNotification({ id, message, type, duration })
      
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id)
        }, duration)
      }

      return id
    },
    [addNotification]
  )

  const removeNotification = useCallback((id: number) => {
    useNotificationStore.setState((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  }, [])

  return {
    success: (message: string, duration?: number) =>
      notify(message, 'success', duration),
    error: (message: string, duration?: number) =>
      notify(message, 'error', duration),
    warning: (message: string, duration?: number) =>
      notify(message, 'warning', duration),
    info: (message: string, duration?: number) =>
      notify(message, 'info', duration),
    remove: removeNotification,
  }
}