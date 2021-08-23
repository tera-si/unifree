import React, { useState, createRef } from "react"
import { Button, Card, Col, CardGroup, Form, Row } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import PostItemImage from "./PostItemImage"
import PostItemInfo from "./PostItemInfo"
import PostItemRequirement from "./PostItemRequirement"
import itemService from "../services/itemService"
import "../styles/PostItem.css"

const PostItem = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const refs = {
    name: createRef(),
    category: createRef(),
    condition: createRef(),
    shipping: createRef(),
    meet: createRef(),
    description: createRef()
  }

  const resetAllFields = () => {
    refs.name.current.value = ""
    refs.category.current.value = -1
    refs.condition.current.value = -1
    refs.shipping.current.checked = false
    refs.meet.current.checked = false
    refs.description.current.value = ""
    setUploadedImages([])
  }

  // TODO: success notification message after posting item
  // TODO: failure notification message if posting failed
  const handlePost = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    // Must iterate over the uploaded list of images
    // Cannot directly use formData.append(uploadedImages) here, cuz that would
    // result in [object File] instead of an array of the actual files
    for (let i = 0; i < uploadedImages.length; i++) {
      formData.append("item-images", uploadedImages[i])
    }

    formData.append("item-name", refs.name.current.value)
    formData.append("item-category", refs.category.current.value)
    formData.append("item-condition", refs.condition.current.value)
    formData.append("item-shipping", refs.shipping.current.checked)
    formData.append("item-meet", refs.meet.current.checked)
    formData.append("item-description", refs.description.current.value)

    try {
      await itemService.postNew(formData)
      console.log("Post new item successful")
      resetAllFields()
    }
    catch (e) {
      console.error(e.response.data.error)
    }
  }

  const handleReset = (event) => {
    event.preventDefault()

    if (window.confirm("Reset all info and images?")) {
      resetAllFields()
    }
  }

  return (
    <CardWrapper>
      <Card.Title>Post Item</Card.Title>
      <PostItemRequirement />
      <Form onSubmit={handlePost}>
        <CardGroup>
          <PostItemImage
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
          <PostItemInfo ref={refs} />
        </CardGroup>
        <CardWrapper cardHeader="Item description">
          <Form.Control as="textarea" ref={refs.description} className="descriptionArea" />
        </CardWrapper>
        <Row className="inputRow">
          <Col>
          <Button type="submit" className="postButton">
            Upload and post item
          </Button>
          </Col>
          <Col>
          <Button type="null" variant="danger" onClick={handleReset} className="resetButton">
            Reset all
          </Button>
        </Col>
        </Row>
      </Form>
    </CardWrapper>
  )
}

export default PostItem
