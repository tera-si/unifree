import React from "react"
import { useSelector } from "react-redux"
import { Tab, Row, Col, Card } from "react-bootstrap"
import MessageFullUserList from "./MessageFullUserList"
import MessageFullChatBox from "./MessageFullChatBox"
import { messageDateSortByLatest } from "../utils/dateSorter"

const MessageFullContainer = ({ selectedUser }) => {
  const allChatUsers = useSelector(state => state.allChatUsers)
  const allChatMessages = useSelector(state => state.allChatMessages)
  const activeKey = selectedUser ? `#${selectedUser.userId}` : null

  const getMessagesWithId = (userId) => {
    return allChatMessages.filter(
      message => message.sentTo.id === userId ||
      message.sentFrom.id === userId
    ).sort(messageDateSortByLatest)
  }

  if (
    (!allChatUsers && !allChatMessages) ||
    (allChatUsers.length <= 0 && allChatMessages.length <= 0)
  ) {
    return (
      <Card.Text>
        Sent and received messages will appear here.
        <br />
        Trade items to start chatting!
      </Card.Text>
    )
  }

  return (
    <Tab.Container defaultActiveKey={activeKey}>
      <Row>
        <Col sm={4}>
          <MessageFullUserList allChatUsers={allChatUsers} />
        </Col>
        <Col>
          <Tab.Content>
            {allChatUsers.map(user => {
              return (
                <MessageFullChatBox
                  key={user.userId}
                  user={user}
                  messages={getMessagesWithId(user.userId)}
                />
              )
            })}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default MessageFullContainer
