import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Card, CardGroup } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import ProfileHeader from "./ProfileHeader"
import ItemPreview from "./ItemPreview"
import userService from "../services/userService"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import { itemDateSortByLatest } from "../utils/dateSorter"
import { actionClearSelectedItem } from "../reducers/selectedItemReducer"
import { actionClearSelectedUser } from "../reducers/selectedUserReducer"
import "../styles/ViewProfile.css"

const ViewProfile = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    dispatch(actionClearSelectedItem())
    dispatch(actionClearSelectedUser())

    const getProfile = async () => {
      const response = await userService.getProfile(id)
      setProfile(response)
    }

    getProfile()
  }, [id, dispatch])

  if (!profile) {
    return (
      <CardWrapper>
        <CenteredSpinnerCol />
      </CardWrapper>
    )
  }

  const itemFiltered = profile.items.filter(item => item.availability !== false)
  const itemSorted = itemFiltered.sort(itemDateSortByLatest)

  if (itemSorted.length <= 0) {
    return (
      <CardWrapper>
        <ProfileHeader username={profile.username} id={profile.id} />
        <CardWrapper>
          <Card.Title className="itemSectionTitle">
            Latest Items from {profile.username}
          </Card.Title>
          <Card.Text>There are currently no items</Card.Text>
        </CardWrapper>
      </CardWrapper>
    )
  }

  return (
    <CardWrapper>
      <ProfileHeader username={profile.username} id={profile.id} />
      <CardWrapper>
        <Card.Title className="itemSectionTitle">Latest items from {profile.username}</Card.Title>
        <CardGroup>
          {itemSorted.map(item =>
            <div key={item.id}>
              <ItemPreview
                id={item.id}
                firstImage={item.imagePaths[0]}
                name={item.name}
                category={item.category}
                condition={item.condition}
                datePosted={item.datePosted}
                username={profile.username}
                userID={profile.id}
              />
            </div>
          )}
        </CardGroup>
      </CardWrapper>
    </CardWrapper>
  )
}

export default ViewProfile
