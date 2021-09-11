import React from "react"
import { Card } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import SearchItem from "./SearchItem"
import "../styles/ViewAllItemsWrapper.css"

const ViewAllItemsWrapper = (props) => {
  return (
    <CardWrapper>
      <SearchItem />
      <CardWrapper>
        <Card.Title className="itemSectionTitle">{props.sectionTitle}</Card.Title>
        {props.children}
      </CardWrapper>
    </CardWrapper>
  )
}

export default ViewAllItemsWrapper
