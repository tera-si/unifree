import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import "../styles/ProfileHeader.css"

const ProfileHeader = ({ username, id }) => {
  const [redirect, setRedirect] = useState(false)
  const auth = useSelector(state => state.auth)
  const sameUser = auth.id === id

  const handleChangePasswordButton = () => {
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to="/change_password" />
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
              <Dropdown.Item onClick={handleChangePasswordButton}>
                Change password
              </Dropdown.Item>
            </DropdownButton>
            : <Button
              type={null}
              className="sendMessageButton"
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
