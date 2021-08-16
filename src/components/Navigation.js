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
        {!auth
          ? null
          : <>
            <Nav.Link as="span" className="navLinkBox">
              <Link to="/post_item" className="navLinkText">Post Item</Link>
            </Nav.Link>
          </>
        }
        </Nav>
        {!auth
          ? null
          : <>
            <Nav>
              <Nav.Link as="span" className="navLinkBoxProfile">
                <Link to="/my_profile" className="navLinkText">My Profile</Link>
              </Nav.Link>
            </Nav>
          </>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
