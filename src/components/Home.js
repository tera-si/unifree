import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Card, CardGroup } from "react-bootstrap"
import itemService from "../services/itemService"
import ItemPreview from "./ItemPreview"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import { itemDateSortByLatest } from "../utils/dateSorter"
import ViewAllItemsWrapper from "./ViewAllItemsWrapper"
import { actionSetErrorNotice } from "../reducers/notificationReducer"

const Home = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllAvailableItems = async () => {
      let data = null

      try {
        data = await itemService.getAll()
      }
      catch (e) {
        dispatch(actionSetErrorNotice("Error: unable to retrieve item data"))
        return
      }

      const availableItems = data.filter(item => item.availability !== false)
      availableItems.sort(itemDateSortByLatest)
      setItems(availableItems)
    }

    getAllAvailableItems()
    setLoading(false)
  }, [dispatch])

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
