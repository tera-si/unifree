import React from "react"
import { useSelector } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import About from "./components/About"
import LoginRegister from "./components/LoginRegister"
import Navigation from "./components/Navigation"
import Notification from "./components/Notification"

const App = () => {
  const auth = useSelector(state => state.auth)

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
              <p>Post Item</p>
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
