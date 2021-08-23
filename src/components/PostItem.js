import React, { useState, createRef } from "react"
import { Button, Card, Col, CardGroup, Form, Row } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import PostItemImage from "./PostItemImage"
import PostItemInfo from "./PostItemInfo"
import PostItemRequirement from "./PostItemRequirement"
import "../styles/PostItem.css"

//! temporary, for testing only
import axios from "axios"

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

  // TODO: separate axios service into separate file, and use async await
  // TODO: clear all input fields and uploadedImages after posting item to
  // server
  // TODO: success notification message after posting item
  // TODO: failure notification message if posting failed
  const handlePost = (event) => {
    event.preventDefault()

    const formData = new FormData()

    // Must iterate over the uploaded list of images
    // Cannot directly use formData.append(uploadedImages) here, cuz that would
    // result in [object File] instead of the actual files
    for (let i = 0; i < uploadedImages.length; i++) {
      formData.append("item-images", uploadedImages[i])
    }

    formData.append("item-name", refs.name.current.value)
    formData.append("item-category", refs.category.current.value)
    formData.append("item-condition", refs.condition.current.value)
    formData.append("item-shipping", refs.shipping.current.checked)
    formData.append("item-meet", refs.meet.current.checked)
    formData.append("item-description", refs.description.current.value)

    axios.post("http://localhost:5000/api/items", formData)
      .then(response => {
        console.log(response.data)
      })
      .catch(e => {
        console.error(e.message)
      })
  }

  const handleReset = (event) => {
    event.preventDefault()

    if (window.confirm("Reset all info and images?")) {
      refs.name.current.value = ""
      refs.category.current.value = -1
      refs.condition.current.value = -1
      refs.shipping.current.checked = false
      refs.meet.current.checked = false
      refs.description.current.value = ""
      setUploadedImages([])
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
