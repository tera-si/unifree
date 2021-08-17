import React, { useState, createRef } from "react"
import { Button, Card, CardGroup, Form } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import PostItemImage from "./PostItemImage"
import PostItemInfo from "./PostItemInfo"

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

  const handlePost = (event) => {
    event.preventDefault()
    // TODO: upload pics and data to server

    console.log("TODO")
    console.log(refs.name.current.value)
    console.log(refs.category.current.value)
    console.log(refs.condition.current.value)
    console.log(refs.shipping.current.checked)
    console.log(refs.meet.current.checked)
    console.log(refs.description.current.value)
  }

  const handleReset = (event) => {
    event.preventDefault()

    refs.name.current.value = ""
    refs.category.current.value = -1
    refs.condition.current.value = -1
    refs.shipping.current.checked = false
    refs.meet.current.checked = false
    refs.description.current.value = ""
    setUploadedImages([])
  }

  return (
    <CardWrapper>
      <Card.Title>Post Item</Card.Title>
      <CardGroup>
        <PostItemImage
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
        <PostItemInfo ref={refs} />
      </CardGroup>
      <CardWrapper cardHeader="Item description">
        <Form.Control as="textarea" ref={refs.description} />
      </CardWrapper>
      <Button type="null" onClick={handlePost}>Upload and post</Button>
      <Button type="null" variant="danger" onClick={handleReset}>Reset</Button>
    </CardWrapper>
  )
}

export default PostItem
