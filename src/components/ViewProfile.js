import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardWrapper from "./CardWrapper"
import ProfileHeader from "./ProfileHeader"
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

  return (
    <CardWrapper>
      <ProfileHeader username={profile.username} id={profile.id} />
    </CardWrapper>
  )
}

export default ViewProfile
