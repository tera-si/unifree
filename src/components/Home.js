import React, { useState, useEffect } from "react"
import { Card, CardGroup } from "react-bootstrap"
import itemService from "../services/itemService"
import CardWrapper from "./CardWrapper"
import ItemPreview from "./ItemPreview"
import SearchItem from "./SearchItem"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import { dateSortByLatest } from "../utils/dateSorter"
import "../styles/Home.css"

const Home = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAllAvailableItems = async () => {
      const data = await itemService.getAll()
      const availableItems = data.filter(item => item.availability !== false)
      availableItems.sort(dateSortByLatest)
      setItems(availableItems)
    }

    setLoading(true)
    getAllAvailableItems()
    setLoading(false)
  }, [])

  if (loading) {
    return(
      <CardWrapper>
        <SearchItem />
        <CardWrapper>
          <Card.Title className="itemSectionTitle">Latest</Card.Title>
          <CenteredSpinnerCol />
        </CardWrapper>
      </CardWrapper>
    )
  }

  if (!loading && items.length <= 0) {
    return (
      <CardWrapper>
        <SearchItem />
        <CardWrapper>
          <Card.Title className="itemSectionTitle">Latest</Card.Title>
          <Card.Text>There are currently no items</Card.Text>
        </CardWrapper>
      </CardWrapper>
    )
  }

  return (
    <CardWrapper>
      <SearchItem />
      <CardWrapper>
        <Card.Title className="itemSectionTitle">Latest</Card.Title>
        <CardGroup>
          {items.map(item =>
            <div key={item.id}>
              <ItemPreview
                id={item.id}
                firstImage={item.imagePaths[0]}
                name={item.name}
                category={item.category}
                condition={item.condition}
                datePosted={item.datePosted}
                username={item.postedBy.username}
                userID={item.postedBy.id}
              />
            </div>
          )}
        </CardGroup>
      </CardWrapper>
    </CardWrapper>
  )
}

export default Home
