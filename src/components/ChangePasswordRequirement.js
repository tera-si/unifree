import React from "react"
import { Accordion, ListGroup } from "react-bootstrap"
import "../styles/ChangePasswordRequirement.css"

const ChangePasswordRequirement = () => {
  return (
    <Accordion defaultActiveKey="0" className="accordionBase">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Password Requirement</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush" className="listBase">
            <ListGroup.Item action variant="warning">
              Do not use any of your real credentials in this demo
            </ListGroup.Item>
            <ListGroup.Item action>
              Password is case sensitive
            </ListGroup.Item>
            <ListGroup.Item action>
              Password must be at least 8 characters long
            </ListGroup.Item>
            <ListGroup.Item action>
              Password must not be the same as username
            </ListGroup.Item>
            <ListGroup.Item action>
              New password must not be the same as old password
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default ChangePasswordRequirement
