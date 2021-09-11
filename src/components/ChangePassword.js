import React from "react"
import { useParams } from "react-router-dom"

const ChangePassword = () => {
  const { id } = useParams()

  return (
    <div>
      Changing password of user {id}
    </div>
  )
}

export default ChangePassword
