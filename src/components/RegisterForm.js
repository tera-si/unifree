import React, { createRef } from "react"
import { Form, Button } from "react-bootstrap"
import LabelledInputRow from "./LabelledInputRow"

const RegisterForm = () => {
  const username = createRef()
  const password = createRef()
  const confirmPassword = createRef()

  const clearAllInputs = () => {
    username.current.value = ""
    password.current.value = ""
    confirmPassword.current.value = ""
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const usernameTrim = username.current.value.trim()
    const passwordTrim = password.current.value.trim()
    const confirmPasswordTrim = confirmPassword.current.value.trim()

    if (passwordTrim !== confirmPasswordTrim) {
      alert("Password and confirm password doesn't match")
    }

    clearAllInputs()
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
      <Button type="submit" style={{ float: "right", marginTop: 10 }}>
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm
