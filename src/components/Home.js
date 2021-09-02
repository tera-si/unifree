import React, { useState, useEffect } from "react"
import { Card, CardGroup } from "react-bootstrap"
import itemService from "../services/itemService"
import CardWrapper from "./CardWrapper"
import ItemPreview from "./ItemPreview"
import SearchItem from "./SearchItem"

const Home = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getAllItems = async () => {
      const data = await itemService.getAll()
      data.sort((item1, item2) => -(new Date(item1.datePosted) - new Date(item2.datePosted)))
      setItems(data)
    }

    getAllItems()
  }, [])

  return (
    <CardWrapper>
      <CardWrapper cardHeader="Search item">
        <SearchItem />
      </CardWrapper>
      <CardWrapper>
        <Card.Title>Latest</Card.Title>
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
