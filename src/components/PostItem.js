import React, { useState } from "react"
import { Card, CardGroup } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import PostItemImage from "./PostItemImage"
import PostItemInfo from "./PostItemInfo"

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
        <PostItemInfo />
      </CardGroup>
    </CardWrapper>
  )
}

export default PostItem
