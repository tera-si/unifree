import React from "react"
import { Card, CardGroup } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import PostItemImage from "./PostItemImage"

const PostItem = () => {
  return (
    <CardWrapper>
      <Card.Title>Post Item</Card.Title>
      <CardGroup>
        <PostItemImage />
      </CardGroup>
    </CardWrapper>
  )
}

export default PostItem
