import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import About from "./components/About"
import LoginRegister from "./components/LoginRegister"
import Navigation from "./components/Navigation"
import Notification from "./components/Notification"
import PostItem from "./components/PostItem"
import { actionSetAuth } from "./reducers/authReducer"

const App = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentUser = window.localStorage.getItem("unifree-current-user")
    if (currentUser) {
      const newAuth = JSON.parse(currentUser)
      // Set token to other services
      dispatch(actionSetAuth(newAuth))
    }
  }, [dispatch])

  return (
    <div className="container">
      <Navigation />

      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/login">
          {!auth
            ? <LoginRegister />
            : <Redirect to="/" />
          }
        </Route>

        <Route path="/post_item">
          {!auth
            ? <Redirect to="/login" />
            : <>
              <PostItem />
            </>
          }
        </Route>

        <Route path="/my_profile">
          {!auth
            ? <Redirect to="/login" />
            : <>
              <p>{auth.username}</p>
            </>
          }
        </Route>

        <Route path="/">
          {!auth
            ? <Redirect to="/login" />
            : <>
              {/* The notification here is probably temporary, and might be
              incorporated into the main page */}
              <Notification />
              <p>Welcome</p>
            </>
          }
        </Route>
      </Switch>

    </div>
  )
}

export default App
