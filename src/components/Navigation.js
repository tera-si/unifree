import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Navbar, Nav, Button } from "react-bootstrap"
import socket from "../socket"
import { actionClearAuth } from "../reducers/authReducer"
import itemService from "../services/itemService"
import tradeHistoryService from "../services/tradeHistoryService"
import { actionClearChatUsers } from "../reducers/allChatUsersReducer"
import { actionClearChatMessages } from "../reducers/allChatMessageReducer"
import { handleFetchAllMessages, handlePrivateMessage } from "../socketHandlers"
import { actionNoNewMessage } from "../reducers/hasNewMessageReducer"
import "../styles/Navigation.css"

const Navigation = () => {
  const auth = useSelector(state => state.auth)
  const hasNewMessage = useSelector(state => state.hasNewMessage)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem("unifree-current-user")
    itemService.setToken(null)
    tradeHistoryService.setToken(null)

    socket.disconnect()
    // Removes leftover listeners to prevent duplicate events in the next login
    socket.off("fetchAllMessages", handleFetchAllMessages)
    socket.off("privateMessage", handlePrivateMessage)

    dispatch(actionClearAuth())
    dispatch(actionClearChatMessages())
    dispatch(actionClearChatUsers())
    dispatch(actionNoNewMessage())
  }

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
              <Nav.Link as="span" className="navLinkBox">
                <Link to="/message" className="navLinkText">
                  Message
                {hasNewMessage.hasNew
                  ? <span className="navBarNewMessageIndicator">!</span>
                  : null
                }
                </Link>
              </Nav.Link>
              <Nav.Link as="span" className="navLinkBox">
                <Link to={`/view_profile/${auth.id}`} className="navLinkText">My Profile</Link>
              </Nav.Link>
              <Button
                type="null"
                variant="light"
                className="navLinkBox-logout"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          </>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
