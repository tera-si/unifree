import React from "react"
import { Card } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import SearchItem from "./SearchItem"

const Home = () => {
  return (
    <CardWrapper>
      <CardWrapper cardHeader="Search item">
        <SearchItem />
      </CardWrapper>
      <CardWrapper>
        <Card.Title>Latest</Card.Title>
      </CardWrapper>
    </CardWrapper>
  )
}

export default Home
