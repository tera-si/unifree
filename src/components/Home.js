import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardGroup } from "react-bootstrap"
import itemService from "../services/itemService"
import ItemPreview from "./ItemPreview"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import { itemDateSortByLatest } from "../utils/dateSorter"
import ViewAllItemsWrapper from "./ViewAllItemsWrapper"
import { actionSetErrorNotice } from "../reducers/notificationReducer"
import { invalidSearchParams, searchParamsIsEqual } from "../utils/searchParamsUtils"

const Home = () => {
  const dispatch = useDispatch()
  const searchParams = useSelector(state => state.searchParams)
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(false)
  const [displayString, setDisplayString] = useState("Latest")
  const notSearching = searchParamsIsEqual(searchParams, invalidSearchParams.default) ||
                       searchParamsIsEqual(searchParams, invalidSearchParams.allNull) ||
                       searchParamsIsEqual(searchParams, invalidSearchParams.allUndefined)

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

    const getSearchResult = async () => {
      let data = null

      try {
        data = await itemService.getAll()
      }
      catch (e) {
        dispatch(actionSetErrorNotice("Error: unable to retrieve item data"))
        return
      }

      const results = data.filter(item => {
        if (!item.availability) {
          return false
        }

        if (
          searchParams.name &&
          !(item.name.toLowerCase().includes(searchParams.name.toLowerCase()))
        ) {
          return false
        }

        if (
          searchParams.category &&
          item.category.toLowerCase() !== searchParams.category.toLowerCase()
        ) {
          return false
        }

        if (
          searchParams.condition &&
          item.condition.toLowerCase() !== searchParams.condition.toLowerCase()
        ) {
          return false
        }

        if (searchParams.shipping && !item.shipping) {
          return false
        }

        if (searchParams.meet && !item.meet) {
          return false
        }

        return true
      })

      results.sort(itemDateSortByLatest)
      setItems(results)
    }

    setLoading(true)

    if (notSearching) {
      getAllAvailableItems()
    }
    else {
      getSearchResult()
    }

    setLoading(false)
  }, [dispatch, notSearching, searchParams])

  useEffect(() => {
    if (!notSearching) {
      let str = ""
      const addSpace = () => {
        if (str.length > 0) {
          str += " "
        }
      }

      if (searchParams.condition) {
        addSpace()
        str += searchParams.condition
      }

      if (searchParams.name) {
        addSpace()
        str += searchParams.name
      }

      if (searchParams.category) {
        addSpace()
        str += `in ${searchParams.category}`
      }

      if (searchParams.shipping) {
        str += ", shipping"
      }

      if (searchParams.meet) {
        str += ", meet"
      }

      setDisplayString(str)
    }
  }, [notSearching, searchParams])

  if (loading || !items) {
    return(
      <ViewAllItemsWrapper sectionTitle={displayString}>
        <CenteredSpinnerCol />
      </ViewAllItemsWrapper>
    )
  }

  if (!loading && items.length <= 0) {
    return (
      <ViewAllItemsWrapper sectionTitle={displayString}>
        <Card.Text>
          There are currently no&nbsp;
          {notSearching
            ? null
            : "matching "
          }
          items
        </Card.Text>
      </ViewAllItemsWrapper>
    )
  }

  return (
    <ViewAllItemsWrapper sectionTitle={displayString}>
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
