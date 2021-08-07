import React from "react"
import { Tabs, Tab } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const LoginRegister = () => {
  return (
    <CardWrapper>
    <Tabs defaultActiveKey="login" style={{ marginBottom: 15 }}>
      <Tab eventKey="login" title="Login">
        <LoginForm />
      </Tab>
      <Tab eventKey="register" title="Register">
        <RegisterForm />
      </Tab>
    </Tabs>
    </CardWrapper>
  )
}

export default LoginRegister
