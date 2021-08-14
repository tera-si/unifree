import React, { createRef, useState } from "react"
import { Form, Button, Spinner } from "react-bootstrap"
import LabelledInputRow from "./LabelledInputRow"
import userService from "../services/userService"
import "../styles/LoginRegister.css"

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)

  const username = createRef()
  const password = createRef()
  const confirmPassword = createRef()

  const clearAllInputs = () => {
    username.current.value = ""
    password.current.value = ""
    confirmPassword.current.value = ""
  }

  // TODO: handle http errors
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) {
      return
    }

    const usernameTrim = username.current.value.trim()
    const passwordTrim = password.current.value.trim()
    const confirmPasswordTrim = confirmPassword.current.value.trim()

    if (passwordTrim !== confirmPasswordTrim) {
      // TODO: set as notification
      alert("Password and confirm password doesn't match")
      return
    }

    clearAllInputs()
    setLoading(true)

    const response = await userService.register({
      username: usernameTrim,
      password: passwordTrim
    })

    // TODO: set as notification
    console.log(response)
    alert("Register successful")

    setLoading(false)
  }

  return (
    <>
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
    </>
  )
}

export default RegisterForm
