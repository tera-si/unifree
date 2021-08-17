import React, { createRef } from "react"
import { Button, Carousel, Form, Image, Row, Col } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import "../styles/PostItem.css"

const PostItemImage = ({ uploadedImages, setUploadedImages }) => {
  const uploadField = createRef()

  const handleUploadImage = (event) => {
    event.preventDefault()
    const currentFiles = uploadField.current.files
    setUploadedImages(uploadedImages.concat(Array.from(currentFiles)))
    uploadField.current.value = null
  }

  return (
    <CardWrapper cardHeader="Uplaod images of item">
        {uploadedImages.length >= 1
          ? <Carousel variant="dark">
            {uploadedImages.map(file => {
              const tempURL = URL.createObjectURL(file)
              return (
                <Carousel.Item key={tempURL}>
                  <Image fluid src={tempURL} alt="item"/>
                </Carousel.Item>
              )
            })}
          </Carousel>
          : null
        }
      <Form.Group>
        <Row className="inputRow">
          <Col sm="8">
            <Form.Control type="file" ref={uploadField} multiple className="fileUploadField" />
          </Col>
          <Col sm="4">
            <Button type="null" onClick={handleUploadImage}>
              Add image(s)
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </CardWrapper>
  )
}

export default PostItemImage
