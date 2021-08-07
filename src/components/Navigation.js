import React from "react"
import { useSelector } from "react-redux"
import { Navbar } from "react-bootstrap"

const Navigation = () => {
  const auth = useSelector(state => state.auth)

  return (
    <Navbar collapseOnSelect bg="primary" variant="dark" expand="lg">
      <Navbar.Brand style={{ marginLeft: 15}}>uniFree</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      {!auth
        ? null
        : <p>Logged in</p>
      }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
