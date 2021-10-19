import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import MessageMobileUserList from "./MessageMobileUserList"
import MessageMobileChatBox from "./MessageMobileChatBox"
import { messageDateSortByLatest } from "../utils/dateSorter"
import "../styles/MessageMobileContainer.css"

const MessageMobileContainer = ({ selectedUser }) => {
  const [activeChat, setActiveChat] = useState(null)
  const allChatMessages = useSelector(state => state.allChatMessages)

  const getMessagesWithId = (userId) => {
    return allChatMessages.filter(message =>
      message.sentTo.id === userId || message.sentFrom.id === userId
    ).sort(messageDateSortByLatest)
  }

  useEffect(() => {
    if (selectedUser.userId) {
      setActiveChat(selectedUser)
    }
  }, [selectedUser])

  if (activeChat) {
    return (
      <div className="messageMobileContainer">
        <MessageMobileChatBox
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          messages={getMessagesWithId(activeChat.userId)}
        />
      </div>
    )
  }

  return (
    <div className="messageMobileContainer">
      <MessageMobileUserList setActiveChat={setActiveChat} />
    </div>
  )
}

export default MessageMobileContainer
