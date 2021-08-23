import React from "react"
import { Accordion, ListGroup } from "react-bootstrap"
import "../styles/PostItemRequirement.css"

const PostItemRequirement = () => {
  return (
    <Accordion defaultActiveKey="0" className="accordionBase">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Post Item Requirements
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush" className="listBase">
            <ListGroup.Item action>
              Must include at least 1 image
            </ListGroup.Item>
            <ListGroup.Item action>
              Must not exceed 8 images
            </ListGroup.Item>
            <ListGroup.Item action>
              All basic info must be filled in
            </ListGroup.Item>
            <ListGroup.Item action>
              Item description must be filled in
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default PostItemRequirement
