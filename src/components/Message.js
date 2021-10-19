import React from "react"
import { useSelector } from "react-redux"
import { Alert, Card } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import MessageFullContainer from "./MessageFullContainer"

const Message = () => {
  const selectedUser = useSelector(state => state.selectedUser)
  const isSmallScreen = window.innerWidth <= 700

  // TODO: mobile view
  if (isSmallScreen) {
    return (
      <div>
        <Alert variant="warning">
          Do not disclose any personal or sensitive information
        </Alert>
        Mobile View!
      </div>
    )
  }

  return (
    <CardWrapper>
      <Card.Title>Message</Card.Title>
      <Alert variant="warning">
        Do not disclose any personal or sensitive information
      </Alert>
      <MessageFullContainer
        selectedUser={selectedUser}
      />
    </CardWrapper>
  )
}

export default Message
