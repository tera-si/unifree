import React from "react"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"

const MessageMobileUserList = ({ setActiveChat }) => {
  const allChatUsers = useSelector(state => state.allChatUsers)

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
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default MessageMobileUserList
