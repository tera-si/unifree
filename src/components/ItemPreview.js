import React from "react"
import { Card } from "react-bootstrap"

const ItemPreview = (
  { firstImage, name, category, condition, datePosted, username }
) => {
  const imgSrc = `/uploads/items/images/${firstImage}`
  const parsedDate = new Date(datePosted).toLocaleDateString()

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>{parsedDate}</Card.Header>
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{category}</Card.Subtitle>
        <Card.Text>
          {condition}
        </Card.Text>
      </Card.Body>
      <Card.Footer> {username} </Card.Footer>
    </Card>
  )
}

export default ItemPreview
