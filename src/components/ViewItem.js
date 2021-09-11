import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Button, Card, Dropdown, DropdownButton, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import itemService from "../services/itemService"
import CardWrapper from "./CardWrapper"
import ViewItemHeader from "./ViewItemHeader"
import ItemCarousel from "./ItemCarousel"
import ViewItemBasicInfo from "./ViewItemBasicInfo"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import "../styles/ViewItem.css"

const ViewItem = () => {
  const auth = useSelector(state => state.auth)
  const [item, setItem] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getItem = async () => {
      const response = await itemService.getItem(id)
      setItem(response)
    }

    getItem()
  }, [id])

  if (!item) {
    return (
      <CardWrapper>
        <CenteredSpinnerCol />
      </CardWrapper>
    )
  }

  const dateParsed = new Date(item.datePosted).toLocaleDateString()
  const descriptionParsed = item.description.split("\n")
  const sameUser = auth.id === item.postedBy.id

  const handleMarkTraded = async () => {
    if (window.confirm("Mark this item as traded?")) {
      const updatedItem = {
        ...item,
        availability: false,
      }

      //? is there anything I need to do with the response ?//
      await itemService.putUpdate(id, updatedItem)
    }
  }

  return (
    <CardWrapper>
      <ViewItemHeader
        name={item.name}
        dateParsed={dateParsed}
        username={item.postedBy.username}
        userID={item.postedBy.id}
      />
      <ItemCarousel imagePaths={item.imagePaths} />
      <ViewItemBasicInfo
        category={item.category}
        condition={item.condition}
        shipping={item.shipping}
        meet={item.meet}
      />
      <CardWrapper cardHeader="Description">
        <Card.Text>
          {descriptionParsed.map(sentence =>
            <span key={sentence}>{sentence}<br /></span>
          )}
        </Card.Text>
      </CardWrapper>
      <Row>
        <Col className="buttonCol">
          {sameUser
            ? <DropdownButton
              title="Manage item "
              drop="end"
              variant="warning"
              className="manageButton"
            >
              <Dropdown.Item onClick={handleMarkTraded}>Mark as traded</Dropdown.Item>
              <Dropdown.Item>Delete item</Dropdown.Item>
            </DropdownButton>
            : <Button
              type={null}
              className="messageButton"
            >
              Message owner
            </Button>
          }
        </Col>
      </Row>
    </CardWrapper>
  )
}

export default ViewItem
