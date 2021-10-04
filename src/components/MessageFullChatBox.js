import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Tab, InputGroup, FormControl, Button } from "react-bootstrap"
import socket from "../socket"
import CardWrapper from "./CardWrapper"
import MessageBox from "./MessageBox"
import "../styles/MessageFullChatBox.css"
import { actionConcatNewMessage } from "../reducers/allChatMessageReducer"
import { actionConcatNewUser } from "../reducers/allChatUsersReducer"

const MessageFullChatBox = ({ user, messages }) => {
  const dispatch = useDispatch()

  const [messageField, setMessageField] = useState("")
  const auth = useSelector(state => state.auth)

  const handleMessageFieldChange = (event) => {
    setMessageField(event.target.value)
  }

  const handleSendMessage = (event) => {
    event.preventDefault()

    socket.emit("privateMessage", {
      to: user.userId,
      content: `${messageField}`
    })

    const newMessage = {
      dateSent: new Date(),
      sentFrom: {
        id: auth.id,
        username: auth.username
      },
      content: `${messageField}`,
      sentTo: {
        id: user.userId,
        username: user.username
      },
      newMessage: false,
    }

    dispatch(actionConcatNewMessage(newMessage))
    dispatch(actionConcatNewUser({
      userId: user.userId,
      username: user.username
    }))

    setMessageField("")
  }

  return (
    <Tab.Pane eventKey={`#${user.userId}`}>
      <CardWrapper>
        {user.username}
      </CardWrapper>
      <CardWrapper class="fullChatBox">
        {messages.map(message =>
          <MessageBox
            key={`${message.dateSent}-${message.content}`}
            message={message}
            isReceived={message.sentFrom.id === user.userId}
          />
        )}
      </CardWrapper>
      <InputGroup className="sendMessageRow">
        <FormControl
          placeholder="Enter your message"
          value={messageField}
          onChange={handleMessageFieldChange}
        />
        <Button type="null" onClick={handleSendMessage}>Send</Button>
      </InputGroup>
    </Tab.Pane>
  )
}

export default MessageFullChatBox
