import React from "react"
import { Carousel, Image } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import "../styles/ItemCarousel.css"

const ItemCarousel = ({ imagePaths }) => {
  const BASE_URL = `/uploads/items/images`
  //! Temporary workaround, change this when deploying to heroku !//
  const BASE_URL_NO_PROXY = `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5000/uploads/items/images`

  //! Cannot use BASE_URL here, because the create-react-app proxy won't work
  //! It won't work because it is considered a new HTTP request. But since
  //! create-react-app runs on JS, not on pure HTTP, the moment the HTTP request
  //! was made, JS hasn't finished loading the react app yet, so the HTTP
  //! request just resolves to "You need to enable Javascript to run this app".
  //! Once JS is loaded, it will redirect to route "/", and once then, it will
  //! know how to resolve the request, but it will be too late.
  const handleImageClick = (image) => {
    const openInWindow = () => {
      window.open(`${BASE_URL_NO_PROXY}/${image}`, "_blank")
    }

    return openInWindow
  }

  return (
    <CardWrapper cardHeader="Images (click to enlarge)">
      <Carousel variant="dark">
        {imagePaths.map(image =>
          <Carousel.Item key={image}>
            <Image
              fluid
              rounded
              src={`${BASE_URL}/${image}`}
              alt="item"
              onClick={handleImageClick(image)}
              className="itemImage"
            />
          </Carousel.Item>
        )}
      </Carousel>
    </CardWrapper>
  )
}

export default ItemCarousel
