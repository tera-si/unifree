import React from "react"
import { useSelector } from "react-redux"
import { Switch, Route } from "react-router-dom"
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

        <Route path="/">
          {!auth
            ? <LoginRegister />
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
