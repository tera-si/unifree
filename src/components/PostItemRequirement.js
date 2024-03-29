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
            <ListGroup.Item action variant="warning">
              Do not include any personal or sensitive information
            </ListGroup.Item>
            <ListGroup.Item action>
              Must include at least 1 image
            </ListGroup.Item>
            <ListGroup.Item action>
              Must not exceed 8 images
            </ListGroup.Item>
            <ListGroup.Item action>
              Images must be in&nbsp;
              <span className="fileExtension">.jpg</span>,&nbsp;
              <span className="fileExtension">.jpeg</span>,&nbsp;
              <span className="fileExtension">.png</span>, or&nbsp;
              <span className="fileExtension">.gif</span> format.
            </ListGroup.Item>
            <ListGroup.Item action>
              All basic info must be filled in
            </ListGroup.Item>
            <ListGroup.Item action>
              At least one exchange method must be checked
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
