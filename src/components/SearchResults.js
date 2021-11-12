import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "react-bootstrap"
import ViewAllItemsWrapper from "./ViewAllItemsWrapper"
import ItemPreview from "./ItemPreview"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import itemService from "../services/itemService"
import { actionSetErrorNotice } from "../reducers/notificationReducer"
import { itemDateSortByLatest } from "../utils/dateSorter"

// FIXME: if you search when you're already at /search, the whole search bar
// component will disappear, this is because none of its elements changed, and
// thus react think it is not being used
const SearchResults = () => {
  const dispatch = useDispatch()
  const searchParams = useSelector(state => state.searchParams)
  const [itemResults, setItemResults] = useState(null)
  const [paramsToDisplay, setParamsToDisplay] = useState(null)

  useEffect(() => {
    let displayString = ""

    const addSpace = () => {
      if (displayString.length > 0) {
        displayString += " "
      }
    }

    if (searchParams.condition) {
      addSpace()
      displayString += searchParams.condition
    }

    if (searchParams.name) {
      addSpace()
      displayString += searchParams.name
    }

    if (searchParams.category) {
      addSpace()
      displayString += `in ${searchParams.category}`
    }

    if (searchParams.shipping) {
      displayString += ", shipping"
    }

    if (searchParams.meet) {
      displayString += ", meet"
    }

    setParamsToDisplay(displayString)
  }, [searchParams, paramsToDisplay])

  useEffect(() => {
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
      setItemResults(results)
    }

    getSearchResult()
  }, [searchParams, dispatch])

  if (!itemResults) {
    return (
      <ViewAllItemsWrapper sectionTitle="Search Results">
        <Card.Subtitle className="displaySearchParams">{paramsToDisplay}</Card.Subtitle>
        <CenteredSpinnerCol />
      </ViewAllItemsWrapper>
    )
  }

  if (itemResults.length <= 0) {
    return (
      <ViewAllItemsWrapper sectionTitle="Search Results">
        <Card.Subtitle className="displaySearchParams">{paramsToDisplay}</Card.Subtitle>
        There are currently no matching items
      </ViewAllItemsWrapper>
    )
  }

  return (
    <ViewAllItemsWrapper sectionTitle="Search Results">
      <Card.Subtitle className="displaySearchParams">{paramsToDisplay}</Card.Subtitle>
      {itemResults.map(item =>
        <ItemPreview
          id={item.id}
          firstImage={item.imagePaths[0]}
          name={item.name}
          category={item.category}
          datePosted={item.datePosted}
          username={item.postedBy.username}
          userID={item.postedBy.id}
        />
      )}
    </ViewAllItemsWrapper>
  )
}

export default SearchResults
