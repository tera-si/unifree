import React from "react"
import { ListGroup } from "react-bootstrap"

const MessageFullUserList = ({ allChatUsers }) => {
  return (
    <ListGroup>
      {allChatUsers.map(user =>
        <ListGroup.Item key={user.userId} action href={`#${user.userId}`}>
          {user.username}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default MessageFullUserList
