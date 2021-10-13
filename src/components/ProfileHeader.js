import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import socket from "../socket"
import { actionSetSelectedUser } from "../reducers/selectedUserReducer"
import { actionClearSelectedItem } from "../reducers/selectedItemReducer"
import "../styles/ProfileHeader.css"
import { actionConcatNewMessage } from "../reducers/allChatMessageReducer"
import { actionConcatNewUser } from "../reducers/allChatUsersReducer"

const ProfileHeader = ({ username, id }) => {
  const dispatch = useDispatch()
  const [redirectToPassword, setRedirectToPassword] = useState(false)
  const [redirectToMessage, setRedirectToMessage] = useState(false)
  const auth = useSelector(state => state.auth)
  const sameUser = auth.id === id

  if (redirectToPassword) {
    return <Redirect to={`/view_profile/${auth.id}/change_password`} />
  }

  if (redirectToMessage) {
    return <Redirect to="/message" />
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
            className="dropdownBase"
            >
              <Dropdown.Item>Trade history</Dropdown.Item>
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
