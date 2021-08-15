import React, { createRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Form, Button, Spinner } from "react-bootstrap"
import RegisterRequirement from "./RegisterRequirement"
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

  const disableInput = loading ? true : false

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

    if (hasEmptyField()) {
      dispatch(actionSetErrorNotice("Error: please fill in the registration form", 8))
      return
    }

    const usernameTrim = username.current.value.trim()
    const passwordTrim = password.current.value.trim()
    const confirmPasswordTrim = confirmPassword.current.value.trim()

    if (passwordTrim !== confirmPasswordTrim) {
      dispatch(actionSetErrorNotice("Error: password and confirm password does not match", 8))
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
      dispatch(actionSetErrorNotice(`Error: ${e.response.data.error}`, 8))
    }

    setLoading(false)
  }

  return (
    <>
      <RegisterRequirement />
      <Form onSubmit={handleSubmit}>
        <LabelledInputRow
          label="Username"
          type="text"
          disabled={disableInput}
          ref={username}
        />
        <LabelledInputRow
          label="Password"
          type="password"
          disabled={disableInput}
          ref={password}
        />
        <LabelledInputRow
          label="Confirm password"
          type="password"
          disabled={disableInput}
          ref={confirmPassword}
        />
        {loading
          ? <Button disabled className="submitButton">
            <Spinner
              as="span"
              animation="border"
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
    </>
  )
}

export default RegisterForm
