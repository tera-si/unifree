import React from "react"
import { useSelector } from "react-redux"
import LoginRegister from "./components/LoginRegister"
import Navigation from "./components/Navigation"

const App = () => {
  const auth = useSelector(state => state.auth)

  return (
    <div className="container">
      <Navigation />
      {!auth
        ? <LoginRegister />
        : <p>Welcome</p>
      }
    </div>
  )
}

export default App
