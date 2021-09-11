import React, { useState, useEffect } from "react"
import { Card, CardGroup } from "react-bootstrap"
import itemService from "../services/itemService"
import ItemPreview from "./ItemPreview"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import { dateSortByLatest } from "../utils/dateSorter"
import ViewAllItemsWrapper from "./ViewAllItemsWrapper"

const Home = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllAvailableItems = async () => {
      const data = await itemService.getAll()
      const availableItems = data.filter(item => item.availability !== false)
      availableItems.sort(dateSortByLatest)
      setItems(availableItems)
    }

    getAllAvailableItems()
    setLoading(false)
  }, [])

  if (loading || !items) {
    return(
      <ViewAllItemsWrapper sectionTitle="Latest">
        <CenteredSpinnerCol />
      </ViewAllItemsWrapper>
    )
  }

  if (!loading && items.length <= 0) {
    return (
      <ViewAllItemsWrapper sectionTitle="Latest">
        <Card.Text>There are currently no items</Card.Text>
      </ViewAllItemsWrapper>
    )
  }

  return (
    <ViewAllItemsWrapper sectionTitle="Latest">
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
    </ViewAllItemsWrapper>
  )
}

export default Home
