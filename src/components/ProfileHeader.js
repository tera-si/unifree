import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Button, Card, Col, Row } from "react-bootstrap"
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
          {sameUser
            ? <Col>
              <Button
                type={null}
                variant="danger"
                className="changePasswordButton"
                onClick={handleChangePasswordButton}
              >
                Change password
              </Button>
            </Col>
            : null
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ProfileHeader
