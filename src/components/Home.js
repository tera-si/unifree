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
  const loading = !items

  useEffect(() => {
    const getAllItems = async () => {
      const data = await itemService.getAll()
      data.sort(dateSortByLatest)
      setItems(data)
    }

    getAllItems()
  }, [])

  return (
    <CardWrapper>
      <SearchItem />
      <CardWrapper>
        <Card.Title className="itemSectionTitle">Latest</Card.Title>
        {loading
          ? <CenteredSpinnerCol />
          : <CardGroup>
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
          {items.length <= 0
            ? <Card.Text>There are currently no items</Card.Text>
            : null
          }
          </CardGroup>
        }
      </CardWrapper>
    </CardWrapper>
  )
}

export default Home
