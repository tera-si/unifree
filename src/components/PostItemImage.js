import React, { createRef } from "react"
import { Button, Carousel, Form, Row, Col } from "react-bootstrap"
import CardWrapper from "./CardWrapper"

const PostItemImage = ({ uploadedImages, setUploadedImages }) => {
  const uploadField = createRef()

  const handleUploadImage = (event) => {
    event.preventDefault()
    const currentFiles = uploadField.current.files
    setUploadedImages(uploadedImages.concat(Array.from(currentFiles)))
    uploadField.current.value = null
    // TODO: upload to server
  }

  return (
    <CardWrapper cardHeader="Upload Images of Item">
        {uploadedImages.length >= 1
          ? <Carousel variant="dark">
            {uploadedImages.map(file => {
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
