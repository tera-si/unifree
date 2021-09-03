import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardGroup } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import ProfileHeader from "./ProfileHeader"
import ItemPreview from "./ItemPreview"
import userService from "../services/userService"

const ViewProfile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      const response = await userService.getProfile(id)
      setProfile(response)
    }

    getProfile()
  }, [id])

  if (!profile) {
    return (
      <CardWrapper></CardWrapper>
    )
  }

  const itemSorted = profile.items.sort((item1, item2) => -(new Date(item1.datePosted) - new Date(item2.datePosted)))

  return (
    <CardWrapper>
      <ProfileHeader username={profile.username} id={profile.id} />
      <CardWrapper>
        <Card.Title>Latest items from {profile.username}</Card.Title>
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
