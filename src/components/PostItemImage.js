import React, { createRef } from "react"
import { useDispatch } from "react-redux"
import { Button, Carousel, Form, Image, Row, Col } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import { actionSetErrorNotice } from "../reducers/notificationReducer"
import "../styles/PostItem.css"

const PostItemImage = ({ uploadedImages, setUploadedImages, loading }) => {
  const uploadField = createRef()
  const dispatch = useDispatch()

  const handleUploadImage = (event) => {
    event.preventDefault()
    const currentFiles = Array.from(uploadField.current.files)

    if (uploadedImages.length >= 8) {
      uploadField.current.value = null
      dispatch(actionSetErrorNotice("Error: maximum image number exceeded"))
      return
    }

    for (let file of currentFiles) {
      const isValidImage = file.name.endsWith(".jpg") || file.name.endsWith(".jpeg")
                           file.name.endsWith(".png") || file.name.endsWith(".gif")

      if (!isValidImage) {
        uploadField.current.value = null
        dispatch(actionSetErrorNotice("Error: invalid file types selected"))
        return
      }
    }

    setUploadedImages(uploadedImages.concat(currentFiles))
    uploadField.current.value = null
  }

  return (
    <CardWrapper cardHeader={`Upload images of item: ${uploadedImages.length} / 8`}>
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
            <Form.Control type="file" ref={uploadField} multiple className="fileUploadField" disabled={loading} />
          </Col>
          <Col sm="4">
            <Button type="null" disabled={loading} onClick={handleUploadImage}>
              Add image(s)
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </CardWrapper>
  )
}

export default PostItemImage
