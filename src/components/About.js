import React from "react"
import { Card, Carousel, Image } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import homepageDemo from "../static/demo-images/homepage.png"
import itemDetails from "../static/demo-images/item-details.png"
import postItem from "../static/demo-images/post-item.png"
import messagePage from "../static/demo-images/message.png"
import viewProfile from "../static/demo-images/view-profile.png"

// TODO: About page with mobile images and layout (scroll instead of carousel)
const About = () => {
  return (
    <CardWrapper>
      <Card.Title>About uniFree</Card.Title>
      <Card.Text>A sleek and easy to use second hand items exchange platform</Card.Text>
      <hr />

      <Carousel variant="dark">
        <Carousel.Item>
          <Image
            fluid
            src={homepageDemo}
          />
          <Carousel.Caption>
            <h2>Homepage</h2>
            <p>Browse and search items</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image
            fluid
            src={itemDetails}
          />
          <Carousel.Caption>
            <h2>Item Page</h2>
            <p>View details, pictures, and message owner</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image
            fluid
            src={postItem}
          />
          <Carousel.Caption>
            <h2>Post New Item</h2>
            <p>Upload pictures and share details</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image
            fluid
            src={messagePage}
          />
          <Carousel.Caption>
            <h2>Messaging</h2>
            <p>Chat, inquire, and confirm your exchange</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Image
            fluid
            src={viewProfile}
          />
          <Carousel.Caption>
            <h2>View User Profile</h2>
            <p>Browse and manage items and account</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </CardWrapper>
  )
}

export default About
