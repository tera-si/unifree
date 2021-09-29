import React from "react"
import { useSelector } from "react-redux"
import CardWrapper from "./CardWrapper"

const Message = () => {
  const selectedItem = useSelector(state => state.selectedItem)
  const selectedUser = useSelector(state => state.selectedUser)
  const allMessages = useSelector(state => state.allChatMessages)

  // debugging
  console.log(`allMessages: ${allMessages}`)
  console.log(`allMessages: ${typeof(allMessages)}`)

  return (
    <CardWrapper>
      Message
      <p>{allMessages}</p>
    </CardWrapper>
  )
}

export default Message
