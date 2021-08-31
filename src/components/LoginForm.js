import React, { createRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Form, Button, Spinner } from "react-bootstrap"
import LabelledInputRow from "./LabelledInputRow"
import loginService from "../services/loginService"
import { actionSetSuccessNotice, actionSetErrorNotice } from "../reducers/notificationReducer"
import { actionSetAuth } from "../reducers/authReducer"
import itemService from "../services/itemService"
import "../styles/LoginRegister.css"

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const username = createRef()
  const password = createRef()

  const disableInput = loading ? true : false

  const clearAllInputs = () => {
    username.current.value = ""
    password.current.value = ""
  }

  const hasEmptyField = () => {
    return !username.current.value || username.current.value.trim().length <= 0 ||
           !password.current.value || password.current.value.trim().length <= 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) {
      return
    }

    if (hasEmptyField()) {
      dispatch(actionSetErrorNotice("Error: please fill in the login form"))
      return
    }

    const usernameTrim = username.current.value.trim()
    const passwordTrim = password.current.value.trim()

    clearAllInputs()
    setLoading(true)

    try {
      const newAuth = await loginService.login({
        username: usernameTrim,
        password: passwordTrim
      })

      window.localStorage.setItem(
        "unifree-current-user", JSON.stringify(newAuth)
      )

      itemService.setToken(newAuth.token)

      setLoading(false)

      dispatch(actionSetAuth(newAuth))
      dispatch(actionSetSuccessNotice(`Logged in as "${newAuth.username}"`))
    }
    catch (e) {
      setLoading(false)
      dispatch(actionSetErrorNotice(`Error: ${e.response.data.error}`))
    }
  }

  return (
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
          Login
        </Button>
      }
    </Form>
  )
}

export default LoginForm
