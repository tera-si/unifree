import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import "../styles/Navigation.css"

const Navigation = () => {
  const auth = useSelector(state => state.auth)

  return (
    <Navbar collapseOnSelect bg="primary" variant="dark" expand="lg">
      <Navbar.Brand style={{ marginLeft: 15}}>uniFree</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as="span" className="navLinkBox">
            <Link to="/" className="navLinkText">Home</Link>
          </Nav.Link>
          <Nav.Link as="span" className="navLinkBox">
            <Link to="/about" className="navLinkText">About</Link>
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
