import React, { createRef } from "react"
import { Form, Button } from "react-bootstrap"
import LabelledInputRow from "./LabelledInputRow"

const LoginForm = () => {
  const username = createRef()
  const password = createRef()

  const clearAllInputs = () => {
    username.current.value = ""
    password.current.value = ""
  }

  const handleSubmit = (event) => {
    event.preventDefault()

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
      <Button type="submit" style={{ float: "right", marginTop: 10 }}>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm