import React from "react"
import { useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  switch (notification.variant) {
    case "success":
      toast.success(notification.text)
      break
    case "danger":
      toast.error(notification.text)
      break
    default:
      toast(notification.text)
      break
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={7000}
    />
  )
}

export default Notification
