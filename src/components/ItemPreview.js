import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { Card } from "react-bootstrap"
import "../styles/ItemPreview.css"

const ItemPreview = (
  { id, firstImage, name, category, condition, datePosted, username, userID }
) => {
  const [redirect, setRedirect] = useState(false)

  const imgSrc = `/uploads/items/images/${firstImage}`
  const parsedDate = new Date(datePosted).toLocaleDateString()

  const handleImgClick = () => {
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect push to={`/view_item/${id}`} />
  }

  return (
    <Card className="cardBase">
      <Card.Header>{parsedDate}</Card.Header>
      <Card.Img variant="top" src={imgSrc} className="cardImage" onClick={handleImgClick} />
      <Card.Body>
        <Card.Title>
          <Link to={`/view_item/${id}`} className="cardTitle">{name}</Link>
        </Card.Title>
        <Card.Subtitle className="cardText">{category}</Card.Subtitle>
        <Card.Text className="cardText">{condition}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/view_profile/${userID}`} className="cardFooter">{username}</Link>
      </Card.Footer>
    </Card>
  )
}

export default ItemPreview
