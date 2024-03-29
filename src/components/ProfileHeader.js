import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import socket from "../socket"
import { actionSetSelectedUser } from "../reducers/selectedUserReducer"
import { actionClearSelectedItem } from "../reducers/selectedItemReducer"
import { actionConcatNewMessage } from "../reducers/allChatMessageReducer"
import { actionConcatNewUser } from "../reducers/allChatUsersReducer"
import "../styles/ProfileHeader.css"

const ProfileHeader = ({ username, id }) => {
  const isSmallScreen = window.innerWidth <= 700
  const dropdownButtonClassName = isSmallScreen
    ? "dropdownBaseSmall"
    : "dropdownBase"

  const dispatch = useDispatch()
  const [redirectToPassword, setRedirectToPassword] = useState(false)
  const [redirectToMessage, setRedirectToMessage] = useState(false)
  const [redirectToHistory, setRedirectToHistory] = useState(false)
  const auth = useSelector(state => state.auth)
  const sameUser = auth.id === id

  if (redirectToPassword) {
    return <Redirect push to={`/view_profile/${auth.id}/change_password`} />
  }

  if (redirectToMessage) {
    return <Redirect push to="/message" />
  }

  if (redirectToHistory) {
    return <Redirect push to="/trade_history" />
  }

  const handleChangePassword = () => {
    setRedirectToPassword(true)
  }

  const handleMessageOwner = () => {
    dispatch(actionClearSelectedItem())
    dispatch(actionSetSelectedUser(id, username))

    socket.emit("privateMessage", {
      to: id,
      content: "Hello, I would like to talk about your items"
    })

    const newMessage = {
      dateSent: new Date(),
      sentFrom: {
        id: auth.id,
        username: auth.username,
      },
      content: "Hello, I would like to talk about your items",
      sentTo: {
        id: id,
        username: username,
      },
      readByReceiver: false,
      readBySender: true,
    }

    dispatch(actionConcatNewMessage(newMessage))
    dispatch(actionConcatNewUser({
      userId: id,
      username: username
    }))

    setRedirectToMessage(true)
  }

  const handleHistoryButton = () => {
    setRedirectToHistory(true)
  }

  return (
    <Card className="profileBase">
      <Card.Body>
        <Row className="profileRow">
          <Col>
            <Card.Title className="profileTitle">{username}</Card.Title>
          </Col>
          <Col>
          {sameUser
            ? <DropdownButton
            title="Manage account "
            drop="down"
            variant="warning"
            className={dropdownButtonClassName}
            >
              <Dropdown.Item onClick={handleHistoryButton}>Trade history</Dropdown.Item>
              <Dropdown.Item onClick={handleChangePassword}>
                Change password
              </Dropdown.Item>
            </DropdownButton>
            : <Button
              type={null}
              className="sendMessageButton"
              onClick={handleMessageOwner}
            >
              Message user
            </Button>
          }
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ProfileHeader
