import React from "react"
import { Tabs, Tab } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import "../styles/LoginRegister.css"

const LoginRegister = () => {
  return (
    <CardWrapper>
      <Tabs defaultActiveKey="login" className="tabsHeader">
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
