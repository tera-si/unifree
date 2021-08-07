import React from "react"
import { useSelector } from "react-redux"
import { Navbar, Nav } from "react-bootstrap"

const Navigation = () => {
  const auth = useSelector(state => state.auth)

  const navLinkStyle = {
    marginLeft: 15
  }

  return (
    <Navbar collapseOnSelect bg="primary" variant="dark" expand="lg">
      <Navbar.Brand style={{ marginLeft: 15}}>uniFree</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as="span" style={navLinkStyle}>
            Home
          </Nav.Link>
          <Nav.Link as="span" style={navLinkStyle}>
            About
          </Nav.Link>
        </Nav>
        {!auth
          ? null
          : <p>Logged in</p>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
