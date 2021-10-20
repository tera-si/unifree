import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Tab, InputGroup, FormControl, Button } from "react-bootstrap"
import socket from "../socket"
import CardWrapper from "./CardWrapper"
import MessageBox from "./MessageBox"
import { actionConcatNewMessage } from "../reducers/allChatMessageReducer"
import { actionConcatNewUser } from "../reducers/allChatUsersReducer"
import { actionSetErrorNotice } from "../reducers/notificationReducer"
import "../styles/MessageFullChatBox.css"

const MessageFullChatBox = ({ user, messages }) => {
  const dispatch = useDispatch()

  const [messageField, setMessageField] = useState("")
  const auth = useSelector(state => state.auth)

  const handleMessageFieldChange = (event) => {
    setMessageField(event.target.value)
  }

  const handleSendMessage = (event) => {
    event.preventDefault()

    if (!messageField || messageField.trim().length <= 0) {
      return
    }

    if (socket.disconnected) {
      dispatch(actionSetErrorNotice("Error: unable to connect to messaging services"))
      return
    }

    socket.emit("privateMessage", {
      to: user.userId,
      content: `${messageField.trim()}`
    })

    const newMessage = {
      dateSent: new Date(),
      sentFrom: {
        id: auth.id,
        username: auth.username
      },
      content: `${messageField.trim()}`,
      sentTo: {
        id: user.userId,
        username: user.username
      },
      readByReceiver: false,
      readBySender: true,
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
