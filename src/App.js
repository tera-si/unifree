import React from "react"
import { useSelector } from "react-redux"
import { Switch, Route } from "react-router-dom"
import About from "./components/About"
import LoginRegister from "./components/LoginRegister"
import Navigation from "./components/Navigation"

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
            : <p>Welcome</p>
          }
        </Route>
      </Switch>

    </div>
  )
}

export default App
