import React, { createRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Form, Button, Spinner } from "react-bootstrap"
import LabelledInputRow from "./LabelledInputRow"
import userService from "../services/userService"
import { actionSetSuccessNotice, actionSetErrorNotice } from "../reducers/notificationReducer"
import "../styles/LoginRegister.css"

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const username = createRef()
  const password = createRef()
  const confirmPassword = createRef()

  const clearAllInputs = () => {
    username.current.value = ""
    password.current.value = ""
    confirmPassword.current.value = ""
  }

  const hasEmptyField = () => {
    return !username.current.value || username.current.value.trim().length <= 0 ||
           !password.current.value || password.current.value.trim().length <= 0 ||
           !confirmPassword.current.value || confirmPassword.current.value.trim().length <= 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) {
      return
    }

    const usernameTrim = username.current.value.trim()
    const passwordTrim = password.current.value.trim()
    const confirmPasswordTrim = confirmPassword.current.value.trim()

    if (hasEmptyField()) {
      dispatch(actionSetErrorNotice("Error: Please fill in the registration form", 5))
      return
    }

    if (passwordTrim !== confirmPasswordTrim) {
      dispatch(actionSetErrorNotice("Error: Password and confirm password does not match", 5))
      return
    }

    clearAllInputs()
    setLoading(true)

    try {
      const response = await userService.register({
        username: usernameTrim,
        password: passwordTrim
      })

      dispatch(actionSetSuccessNotice(`New user "${response.username}" successfully registered`, 5))
    }
    catch (e) {
      dispatch(actionSetErrorNotice(`Error: ${e.response.data.error}`, 5))
    }

    setLoading(false)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <LabelledInputRow
        label="Username"
        type="text"
        ref={username}
      />
      <LabelledInputRow
        label="Password"
        type="password"
        ref={password}
      />
      <LabelledInputRow
        label="Confirm password"
        type="password"
        ref={confirmPassword}
      />
      {loading
        ? <Button disabled className="submitButton">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="hidden">Loading...</span>
        </Button>
        : <Button type="submit" className="submitButton">
          Register
        </Button>
      }
    </Form>
  )
}

export default RegisterForm
