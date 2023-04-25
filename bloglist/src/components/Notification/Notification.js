import React from 'react'
import styles from './Notification.module.css'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const message = notification.message
  const type = notification.type
  if (type === 'success') {
    return (
      <p className={styles.success}>
        {message}
      </p>
    )
  } else {
    return (
      <p className={styles.fail}>
        {message}
      </p>
    )
  }
}

export default Notification
