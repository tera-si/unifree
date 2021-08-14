import React from "react"
import { Accordion, ListGroup } from "react-bootstrap"
import "../styles/RegisterRequirement.css"

const RegisterRequirement = () => {
  return (
    <Accordion defaultActiveKey="0" className="accordionBase">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Account Requirements</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush" className="listBase">
            <ListGroup.Item action>
              Username must be at least 8 characters long
            </ListGroup.Item>
            <ListGroup.Item action>
              Password must be at least 8 characters long
            </ListGroup.Item>
            <ListGroup.Item action>
              Password must not be the same as username
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default RegisterRequirement
