import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Switch, Route } from "react-router-dom"
import About from "./components/About"
import LoginRegister from "./components/LoginRegister"
import Navigation from "./components/Navigation"
import Notification from "./components/Notification"
import PostItem from "./components/PostItem"
import Home from "./components/Home"
import ViewProfile from "./components/ViewProfile"
import ViewItem from "./components/ViewItem"
import itemService from "./services/itemService"
import { actionSetAuth } from "./reducers/authReducer"

// TODO: chat and chat-notification with socket.io

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

  if (!auth) {
    return (
      <div className="container">
        <Navigation />
        <LoginRegister />
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

        <Route path="/view_profile/:id">
          <ViewProfile />
        </Route>

        <Route path="/change_password">
          <p>change password</p>
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
