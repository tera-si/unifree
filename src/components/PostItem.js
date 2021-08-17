import React, { useState } from "react"
import { Card, CardGroup } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import PostItemImage from "./PostItemImage"

const PostItem = () => {
  const [uploadedImages, setUploadedImages] = useState([])

  return (
    <CardWrapper>
      <Card.Title>Post Item</Card.Title>
      <CardGroup>
        <PostItemImage
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
      </CardGroup>
    </CardWrapper>
  )
}

export default PostItem
