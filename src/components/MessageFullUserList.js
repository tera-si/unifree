import React from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import socket from "../socket"
import { actionSetMessageRead } from "../reducers/hasNewMessageReducer"
import "../styles/MessageFullUserList.css"

const MessageFullUserList = ({ allChatUsers }) => {
  const dispatch = useDispatch()
  const hasNewMessage = useSelector(state => state.hasNewMessage)

  //! in the hasNewMessage reducer, or in the socket newMessage listener, check
  //! if the location is `/message#${id}`, and if it is, automatically mark the
  //! new message as read
  const handleClickUserList = () => {
    // A slight timeout otherwise the hash location will be empty
    setTimeout(() => {
      const userId = window.location.hash.substring(1)
      socket.emit("markAsRead", userId)
      dispatch(actionSetMessageRead(userId))
    }, 100)
  }

  return (
    <ListGroup>
      {allChatUsers.map(user =>
        <ListGroup.Item
          key={user.userId}
          action
          href={`#${user.userId}`}
          onClick={handleClickUserList}
        >
          {user.username}
          {hasNewMessage.fromWho.includes(user.userId)
            ? <span className="chatUserListNewMessageIndicator">!</span>
            : null
          }
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default MessageFullUserList
