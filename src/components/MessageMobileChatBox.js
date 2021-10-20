import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import socket from "../socket"
import CardWrapper from "./CardWrapper"
import MessageBox from "./MessageBox"
import { actionSetErrorNotice } from "../reducers/notificationReducer"
import { actionConcatNewMessage } from "../reducers/allChatMessageReducer"
import { actionConcatNewUser } from "../reducers/allChatUsersReducer"
import { actionSetMessageRead } from "../reducers/hasNewMessageReducer"
import "../styles/MessageMobileChatBox.css"

const MessageMobileChatBox = ({ activeChat, setActiveChat, messages }) => {
  const dispatch = useDispatch()

  const [messageField, setMessageField] = useState("")
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    socket.emit("markAsRead", activeChat.userId)
    dispatch(actionSetMessageRead(activeChat.userId))
  }, [activeChat, dispatch])

  const handleBackButton = () => {
    setActiveChat(null)
  }

  const handleMessageFieldChange = (event) => {
    setMessageField(event.target.value)
  }

  const handleSendMessage = (event) => {
    event.preventDefault()

    if (socket.disconnected) {
      dispatch(actionSetErrorNotice("Error: unable to connect to messaging services"))
      return
    }

    socket.emit("privateMessage", {
      to: activeChat.userId,
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
        id: activeChat.userId,
        username: activeChat.username
      },
      readyByReceiver: false,
      readBySender: true,
    }

    dispatch(actionConcatNewMessage(newMessage))
    dispatch(actionConcatNewUser({
      userId: activeChat.userId,
      username: activeChat.username
    }))

    setMessageField("")
  }

  return (
    <>
      <CardWrapper>
        <Button
          type="null"
          variant="light"
          size="sm"
          className="messageMobileBackButton"
          onClick={handleBackButton}
        >
          &lt;
          <span className="hidden">back button</span>
        </Button>
        {activeChat.username}
      </CardWrapper>
      <CardWrapper class="mobileChatBox">
        {messages.map(message =>
          <MessageBox
            key={`${message.dateSent}-${message.content}`}
            message={message}
            isReceived={message.sentFrom.id === activeChat.userId}
          />
        )}
      </CardWrapper>
      <InputGroup className="mobileSendMessageRow">
        <FormControl
          placeholder="Enter your message"
          value={messageField}
          onChange={handleMessageFieldChange}
        />
        <Button type="null" onClick={handleSendMessage}>Send</Button>
      </InputGroup>
    </>
  )
}

export default MessageMobileChatBox
