import { useNotificationStore } from '../store/store'

export default function Toast() {
  const notifications = useNotificationStore((state) => state.notifications)
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification
  )

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
        return 'ℹ'
      default:
        return '●'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-40 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getStyles(
            notification.type
          )} px-6 py-4 rounded-lg shadow-lg flex items-center justify-between gap-4 animate-slideIn`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">{getIcon(notification.type)}</span>
            <span className="font-medium">{notification.message}</span>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="hover:opacity-75 transition text-lg"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}