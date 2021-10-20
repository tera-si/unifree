import React from "react"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"
import "../styles/MessageMobileUserList.css"

const MessageMobileUserList = ({ setActiveChat }) => {

  const allChatUsers = useSelector(state => state.allChatUsers)
  const hasNewMessage = useSelector(state => state.hasNewMessage)

  const handleClickUser = (user) => {
    const setAsActive = () => {
      setActiveChat(user)
    }

    return setAsActive
  }

  return (
    <ListGroup>
      {allChatUsers.map(user => {
        return (
          <ListGroup.Item
            key={user.userId}
            action
            href={`#${user.userId}`}
            onClick={handleClickUser(user)}
          >
            {user.username}
            {hasNewMessage.fromWho.includes(user.userId)
              ? <span className="chatMobileUserListNewMessageIndicator">!</span>
              : null
            }
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default MessageMobileUserList
