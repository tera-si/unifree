import React from "react"
import { useSelector } from "react-redux"
import { Card } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import MessageFullContainer from "./MessageFullContainer"

const Message = () => {
  const selectedUser = useSelector(state => state.selectedUser)
  const isSmallScreen = window.innerWidth <= 700

  // TODO: mobile view
  if (isSmallScreen) {
    return (
      <div>
        Mobile View!
      </div>
    )
  }

  return (
    <CardWrapper>
      <Card.Title>Message</Card.Title>
      <MessageFullContainer
        selectedUser={selectedUser}
      />
    </CardWrapper>
  )
}

export default Message
