import React from "react"
import { Link } from "react-router-dom"
import { Card, Col, Row } from "react-bootstrap"
import "../styles/ViewItemHeader.css"

const ViewItemHeader = ({ name, dateParsed, username, userID }) => {
  return (
    <Card className="headerBase">
      <Card.Body>
        <Row className="headerRow">
          <Col>
            <Card.Subtitle className="headerSubtitle">{dateParsed}</Card.Subtitle>
            <Card.Title className="headerTitle">{name}</Card.Title>
            <Card.Text>
              <Link to={`/view_profile/${userID}`} className="userLink">{username}</Link>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ViewItemHeader
