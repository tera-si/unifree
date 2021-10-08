import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Switch, Route } from "react-router-dom"
import socket from "./socket"
import About from "./components/About"
import LoginRegister from "./components/LoginRegister"
import Navigation from "./components/Navigation"
import Notification from "./components/Notification"
import PostItem from "./components/PostItem"
import Home from "./components/Home"
import ViewProfile from "./components/ViewProfile"
import ViewItem from "./components/ViewItem"
import ChangePassword from "./components/ChangePassword"
import Message from "./components/Message"
import itemService from "./services/itemService"
import { handleFetchAllMessages, handlePrivateMessage } from "./socketHandlers"
import { actionSetAuth } from "./reducers/authReducer"

// TODO: transaction history (backend + frontend + mongoDB)
// TODO: delete item
// TODO: wrap try-catch block around all backend communication
// TODO: remove localstorage when website is closed
// TODO: add `push` to all redirects
//? Comment in user profile ?//
//? clear all selected item/user redux state ?//

const App = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentUser = window.localStorage.getItem("unifree-current-user")
    if (currentUser) {
      const newAuth = JSON.parse(currentUser)
      itemService.setToken(newAuth.token)
      dispatch(actionSetAuth(newAuth))
    }
  }, [dispatch])

  useEffect(() => {
    const connectSocket = () => {
      socket.auth = {
        token: auth.token,
        userId: auth.id,
        username: auth.username
      }
      socket.connect()

      socket.on("connect", () => {
        // Removes leftover listeners, otherwise every new connection (e.g. re-login)
        // will concat duplicate listeners, resulting in duplicate events
        socket.off("fetchAllMessages", handleFetchAllMessages)
        socket.off("privateMessage", handlePrivateMessage)

        console.log(`socket connection established at ${socket.id}`)

        socket.on("fetchAllMessages", handleFetchAllMessages)
        socket.on("privateMessage", handlePrivateMessage)
      })

    }

    if (auth) {
      connectSocket()
    }
  }, [auth])

  if (!auth) {
    return (
      <div className="container">
        <Navigation />

        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/">
            <LoginRegister />
          </Route>
        </Switch>

        <Notification />
      </div>
    )
  }

  return (
    <div className="container">
      <Navigation />

      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/post_item">
          <PostItem />
        </Route>

        <Route path="/view_item/:id">
          <ViewItem />
        </Route>

        <Route path="/view_profile/:id/change_password">
          <ChangePassword />
        </Route>

        <Route path="/view_profile/:id">
          <ViewProfile />
        </Route>

        <Route path="/message">
          <Message />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Notification />
    </div>
  )
}

export default App
