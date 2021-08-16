import React, { useState, createRef } from "react"
import { Button, Carousel, Form, Row, Col } from "react-bootstrap"
import CardWrapper from "./CardWrapper"

const PostItemImage = () => {
  // Two options:
  // 1. change this state to a redux store to use across components
  // 2. put all of this inside PostItem.js and handle all states there
  const [uploadedFiles, setUploadedFiles] = useState([])
  const uploadField = createRef()

  const handleUploadImage = (event) => {
    event.preventDefault()
    setUploadedFiles(uploadedFiles.concat(Array.from(uploadField.current.files)))
    // TODO: upload to server
  }

  return (
    <CardWrapper cardHeader="Upload Images of Item">
        {uploadedFiles.length >= 1
          ? <Carousel variant="dark">
            {uploadedFiles.map(file => {
              const tempURL = URL.createObjectURL(file)
              return (
                <Carousel.Item key={tempURL}>
                  <img src={tempURL} alt="item"/>
                </Carousel.Item>
              )
            })}
          </Carousel>
          : null
        }
      <Form>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="file" ref={uploadField} multiple />
            </Col>
            <Col>
              <Button type="null" onClick={handleUploadImage}>Upload</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </CardWrapper>
  )
}

export default PostItemImage
