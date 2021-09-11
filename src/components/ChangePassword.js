import React, { createRef } from "react"
import { Button, Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
import CardWrapper from "./CardWrapper"
import LabelledInputRow from "./LabelledInputRow"
import ChangePasswordRequirement from "./ChangePasswordRequirement"
import "../styles/ChangePassword.css"

const ChangePassword = () => {
  const { id } = useParams()
  const refs = {
    oldPassword: createRef(),
    newPassword: createRef(),
    confirmPassword: createRef()
  }

  return (
    <CardWrapper>
      <Card.Title className="title">Change password</Card.Title>
      <ChangePasswordRequirement />
      <LabelledInputRow
        label="Original password"
        type="password"
        ref={refs.oldPassword}
      />
      <LabelledInputRow
        label="New password"
        type="password"
        ref={refs.newPassword}
      />
      <LabelledInputRow
        label="Confirm new password"
        type="password"
        ref={refs.confirmPassword}
      />
      <Button
        type="null"
        className="changePasswordButton"
      >
        Change password
      </Button>
    </CardWrapper>
  )
}

export default ChangePassword
