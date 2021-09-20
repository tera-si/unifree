import React, { useState, createRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Button, Card, Form, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import CardWrapper from "./CardWrapper"
import LabelledInputRow from "./LabelledInputRow"
import ChangePasswordRequirement from "./ChangePasswordRequirement"
import userService from "../services/userService"
import itemService from "../services/itemService"
import { actionSetSuccessNotice, actionSetErrorNotice } from "../reducers/notificationReducer"
import { actionClearAuth } from "../reducers/authReducer"
import "../styles/ChangePassword.css"

const ChangePassword = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  if (redirect) {
    return <Redirect to="/" />
  }

  if (id !== auth.id) {
    dispatch(actionSetErrorNotice("Error: unauthorized action"))
    setRedirect(true)
  }

  const refs = {
    oldPassword: createRef(),
    newPassword: createRef(),
    confirmPassword: createRef()
  }

  const clearAllInputs = () => {
    refs.oldPassword.current.value = ""
    refs.newPassword.current.value = ""
    refs.confirmPassword.current.value = ""
  }

  const logout = () => {
    window.localStorage.removeItem("unifree-current-user")
    itemService.setToken(null)
    dispatch(actionClearAuth())
  }

  const hasEmptyField = () => {
    return !refs.oldPassword.current.value
      || refs.oldPassword.current.value.trim().length <= 0
      || !refs.newPassword.current.value
      || refs.newPassword.current.value.trim().length <= 0
      || !refs.confirmPassword.current.value
      || refs.confirmPassword.current.value.trim().length <= 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) {
      return
    }

    if (hasEmptyField()) {
      dispatch(actionSetErrorNotice("Error: please fill in the password form"))
      return
    }

    if (refs.newPassword.current.value.trim().length < 8) {
      dispatch(actionSetErrorNotice("Error: new password must be at least 8 characters long"))
      return
    }

    const oldPasswordTrim = refs.oldPassword.current.value.trim()
    const newPasswordTrim = refs.newPassword.current.value.trim()
    const confirmPasswordTrim = refs.confirmPassword.current.value.trim()

    if (newPasswordTrim !== confirmPasswordTrim) {
      dispatch(actionSetErrorNotice("Error: new password and confirm new password does not match"))
      return
    }

    if (newPasswordTrim === oldPasswordTrim) {
      dispatch(actionSetErrorNotice("Error: new password cannot be the same as old password"))
      return
    }

    if (newPasswordTrim === auth.username) {
      dispatch(actionSetErrorNotice("Error: new password cannot be the same as username"))
      return
    }

    clearAllInputs()
    // TODO: disable input fields and set spinner
    setLoading(true)

    try {
      await userService.updateProfile(id, {
        oldPassword: oldPasswordTrim,
        password: newPasswordTrim,
      }, auth.token)

      dispatch(actionSetSuccessNotice("Password successfully changed"))
      setRedirect(true)
      logout()
    }
    catch (e) {
      dispatch(actionSetErrorNotice(`Error: ${e.response.data.error}`))
    }

    setLoading(false)
  }

  return (
    <CardWrapper>
      <Card.Title className="title">Change password</Card.Title>
      <ChangePasswordRequirement />
      <Form onSubmit={handleSubmit}>
        <LabelledInputRow
          label="Original password"
          type="password"
          disabled={loading}
          ref={refs.oldPassword}
        />
        <LabelledInputRow
          label="New password"
          type="password"
          disabled={loading}
          ref={refs.newPassword}
        />
        <LabelledInputRow
          label="Confirm new password"
          type="password"
          disabled={loading}
          ref={refs.confirmPassword}
        />
        {loading
          ? <Button disabled className="changePasswordButton">
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            />
            <span className="hidden">Loading...</span>
          </Button>
          : <Button
            type="submit"
            className="changePasswordButton"
          >
            Change password
          </Button>
        }
      </Form>
    </CardWrapper>
  )
}

export default ChangePassword
