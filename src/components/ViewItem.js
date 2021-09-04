import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
import itemService from "../services/itemService"
import CardWrapper from "./CardWrapper"
import ViewItemHeader from "./ViewItemHeader"
import ItemCarousel from "./ItemCarousel"
import ViewItemBasicInfo from "./ViewItemBasicInfo"
import CenteredSpinnerCol from "./CenteredSpinnerCol"

const ViewItem = () => {
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
    </CardWrapper>
  )
}

export default ViewItem
