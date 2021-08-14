import React from "react"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"
import "../styles/Notification.css"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification || !notification.text) {
    return null
  }

  return (
    <Alert variant={notification.variant} className="notificationBar">
      {notification.text}
    </Alert>
  )
}

export default Notification
