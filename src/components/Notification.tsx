import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import styles from './Notification.module.css'

export const useNotification = () => {
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setIsFadingOut(false)

    setTimeout(() => {
      setIsFadingOut(true)
      setTimeout(() => {
        setNotification(null)
      }, 300) // Corresponds to fadeOut animation duration
    }, 2700) // Show notification for 2.7s before starting fadeout
  }

  const Notification = () => {
    if (!notification) return null

    const isSuccess = notification.type === 'success'

    return (
      <div
        className={`${styles.notification} ${isSuccess ? styles.success : styles.error} ${isFadingOut ? styles.fadeOut : ''}`}
      >
        <div className={styles.icon}>
          {isSuccess ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
        </div>
        <span className={styles.message}>{notification.message}</span>
      </div>
    )
  }

  return { showNotification, Notification }
}