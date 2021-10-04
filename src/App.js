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
import { actionSetAuth } from "./reducers/authReducer"
import { actionConcatNewMessage, actionSetAllMessages } from "./reducers/allChatMessageReducer"
import { actionConcatNewUser, actionSetAllUsers } from "./reducers/allChatUsersReducer"

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

  // FIXME: if you logout and then login again, you will receive duplicate messages
  const connectSocket = () => {
    socket.auth = {
      token: auth.token,
      userId: auth.id,
      username: auth.username
    }
    socket.connect()

    socket.on("connect", () => {
      console.log(`socket connection established at ${socket.id}`)
    })

    socket.on("fetchAllMessages", ({ messages }) => {
      const allMessages = []
      const allUsers = []

      const _idIndex = (userId) => {
        for (let i = 0; i < allUsers.length; i++) {
          const user = allUsers[i]

          if (user.userId === userId) {
            return i
          }
        }

        return -1
      }

      for (const array of messages) {
        for (const message of array) {
          allMessages.push({ ...message, dateSent: new Date(message.dateSent) })

          if (message.sentFrom.id !== auth.id) {
            if (_idIndex(message.sentFrom.id) === -1) {
              allUsers.push({
                userId: message.sentFrom.id,
                username: message.sentFrom.username
              })
            }
          }

          if (message.sentTo.id !== auth.id) {
            if (_idIndex(message.sentTo.id) === -1) {
              allUsers.push({
                userId: message.sentTo.id,
                username: message.sentTo.username
              })
            }
          }
        }
      }

      dispatch(actionSetAllMessages(allMessages))
      dispatch(actionSetAllUsers(allUsers))
    })

    // TODO: dispatch notification when new message is received
    socket.on("privateMessage", ({ message }) => {
      alert("new message received!")

      const newMessage = {...message, dateSent: new Date(message.dateSent)}

      if (message.sentFrom.id !== auth.id) {
        dispatch(actionConcatNewUser({
          userId: message.sentFrom.id,
          username: message.sentFrom.username
        }))
      }

      if (message.sentTo.id !== auth.id) {
        dispatch(actionConcatNewUser({
          userId: message.sentTo.id,
          username: message.sentTo.username
        }))
      }

      dispatch(actionConcatNewMessage(newMessage))
    })
  }

  return (
    <div className="container">
      {connectSocket()}
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
